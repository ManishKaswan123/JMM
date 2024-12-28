import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {deleteChat} from 'sr/utils/api/deleteChat'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {createChat} from 'sr/utils/api/createChat'
import {getPreSignedURL} from 'sr/utils/api/media'
import {updateChat} from 'sr/utils/api/updateChat'
import {FieldsArray} from 'sr/constants/fields'
import {UserInterface} from 'sr/constants/User'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {
  Customer,
  fetchCustomers,
  useCreateCustomer,
  useUpdateCustomer,
} from 'sr/utils/api/customerApi'
import CustomerTable from './CustomerTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'

interface Filters {
  limit?: number
  page?: number
  company_id?: string
  status?: string
}

interface CustomerCreatePayload {
  company_id: string
  name: string
  email: string
  mobile_number: string
  type: string
  contacts: string[]
  status: string
  remarks: string
  location_ids: string[]
  checklist_ids: string[]
}
interface CustomerUpdatePayload extends CustomerCreatePayload {
  id: string
}

const Custom: React.FC = () => {
  const [selectedData, setSelectedData] = useState<Customer>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<Filters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyData = useSelector((state: RootState) => state.company.data)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCompanyData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCustomer()
  const updateMutation = useUpdateCustomer()

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Airport', id: 'Airport'},
          {name: 'Corporate', id: 'Corporate'},
          {
            name: 'Hospital',
            id: 'Hospital',
          },
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Pending OTP', id: 'pending_otp'},
          {name: 'Closed', id: 'closed'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
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
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },
      {
        type: 'text',
        label: 'Mobile Number',
        name: 'mobile_number',
        placeholder: 'Mobile Number',
        required: true,
      },
      {
        type: 'text',
        label: 'Remarks',
        name: 'remarks',
        placeholder: 'Remarks',
        required: true,
      },
    ],
    [companyData]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select company',
        labelKey: 'company_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Airport', id: 'Airport'},
          {name: 'Corporate', id: 'Corporate'},
          {
            name: 'Hospital',
            id: 'Hospital',
          },
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Pending OTP', id: 'pending_otp'},
          {name: 'Active', id: 'active'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [companyData]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['customer', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchCustomers({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  const fetchDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])

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

  const handleCreateCustomer = async (payload: CustomerCreatePayload) => {
    const data: CustomerCreatePayload = {
      company_id: payload.company_id,
      name: payload.name,
      email: payload.email,
      mobile_number: payload.mobile_number,
      type: payload.type,
      contacts: [],
      status: payload.status,
      remarks: payload.remarks,
      location_ids: [],
      checklist_ids: [],
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditCustomer = async (payload: CustomerUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CustomerUpdatePayload = {
      company_id: payload.company_id,
      name: payload.name,
      email: payload.email,
      mobile_number: payload.mobile_number,
      type: payload.type,
      contacts: [],
      status: payload.status,
      remarks: payload.remarks,
      location_ids: [],
      checklist_ids: [],
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: CustomerUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      company_id: selectedData.company_id,
      name: selectedData.name,
      email: selectedData.email,
      mobile_number: selectedData.mobile_number,
      type: selectedData.type,
      contacts: [] as string[],
      status: selectedData.status,
      remarks: selectedData.remarks,
      location_ids: [] as string[],
      checklist_ids: [] as string[],
      id: selectedData.id,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Customer</h2>
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
            <SkeletonTable
              columns={[
                'Name',
                'Company Name',
                'Email',
                'Mobile',
                'Type',
                'Status',
                'Remarks',
                'Actions',
              ]}
            />
          ) : (
            <CustomerTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              data={data?.data}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={
              Math.ceil((data?.pagination?.total || 1) / (data?.pagination?.pageSize || 1)) || 0
            }
            totalResults={data?.pagination?.total}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='customer'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Customer'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateCustomer}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Customer'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCustomer}
        />
      )}
    </>
  )
}
const CustomerCard: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/customer'}></DashboardWrapper>
    </>
  )
}

export default CustomerCard
