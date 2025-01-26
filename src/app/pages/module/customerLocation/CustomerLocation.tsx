import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import TasklistTable from './CustomerLocationTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchCustomerLocations,
  CustomerLocation,
  CustomerLocationFilters,
  useCreateCustomerLocation,
  useUpdateCustomerLocation,
} from 'sr/utils/api/customerLocationApi'
import {CustomerLocationDetailsCard} from './CustomerLocationDetails'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import CustomerLocationTable from './CustomerLocationTable'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'

interface CustomerLocationCreatePayload {
  name: string
  customer_id: string
  company_id: string
  address?: Record<string, any>
  contacts?: Record<string, any>[]
  type: string
  // checklist_ids?: string[]
  geofence_ids?: string[]
}
interface CustomerLocationUpdatePayload extends CustomerLocationCreatePayload {
  id: string
}

const CustomerLocationCard: React.FC = () => {
  const {customer_id} = useParams<{customer_id: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CustomerLocation>()
  const [selectedCustomerLocation, setSelectedCustomerLocation] = useState<CustomerLocation>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CustomerLocationFilters>({customer_id})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const companyData = useSelector((state: RootState) => state.company.data)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const {fetchCompanyData} = useActions()
  const createMutation = useCreateCustomerLocation()
  const updateMutation = useUpdateCustomerLocation()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Type',
        name: 'type',
        placeholder: 'Type',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
      },
    ],
    [companyData]
  )
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['customerLocation', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchCustomerLocations({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }
  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const handleCreatecustomerLocation = async (payload: Record<string, any>) => {
    if (!customer_id) return
    const data: CustomerLocationCreatePayload = {
      name: payload.name,
      customer_id: customer_id,
      company_id: payload.company_id,
      type: payload.type,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditcustomerLocation = async (payload: Record<string, any>) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CustomerLocationUpdatePayload = {
      name: payload.name,
      customer_id: selectedData.customer_id,
      company_id: payload.company_id,
      type: payload.type,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: Record<string, any> = useMemo(() => {
    if (!selectedData) return {} as Record<string, any>
    return {
      name: selectedData.name,
      company_id: selectedData.company_id,
      customer_id: selectedData.customer_id,
      type: selectedData.type,
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedCustomerLocation) {
    return (
      <CustomerLocationDetailsCard
        // refetch={refetch}
        setSelectedCustomerLocation={setSelectedCustomerLocation}
        data={selectedCustomerLocation}
        onGoBack={() => setSelectedCustomerLocation(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Customer Location
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label={`${isFilterVisible ? 'Close' : 'Filters'}`}
                Icon={!isFilterVisible ? AiOutlineFilter : AiOutlineClose}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className={`text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center ${
                  isFilterVisible ? 'bg-red-400 hover:bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              ></Button>
            </div>
          </div>
          {isFilterVisible && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={fields}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable columns={['Name', 'Customer', 'Company', 'Type', 'Actions']} />
          ) : (
            <CustomerLocationTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectCustomerLocation={setSelectedCustomerLocation}
              data={data?.data}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          data?.pagination && (
            <Pagination
              currentPage={currentPage}
              pagination={data.pagination}
              onPageChange={onPageChange}
              name='customerLocation'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Customer Location'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreatecustomerLocation}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Customer Location'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditcustomerLocation}
        />
      )}
    </>
  )
}

export default CustomerLocationCard
