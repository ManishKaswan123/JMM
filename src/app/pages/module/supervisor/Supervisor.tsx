import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'

import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SupervisorTable from './SupervisorTable'
import {
  fetchSupervisors,
  SupervisorDetails,
  SupervisorFilters,
  useCreateSupervisor,
  useUpdateSupervisor,
} from 'sr/utils/api/supervisorApi'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
interface SupervisorFormPayload {
  company_id: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  status: string
}
interface SupervisorCreatePayload extends SupervisorFormPayload {}
interface SupervisorUpdatePayload extends SupervisorFormPayload {
  id: string
}

const Supervisor: React.FC = () => {
  const [selectedData, setSelectedData] = useState<SupervisorDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<SupervisorFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyStore = useSelector((state: RootState) => state.company)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCompanyData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateSupervisor()
  const updateMutation = useUpdateSupervisor()

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyStore.data,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
        required: true,
      },

      {
        type: 'text',
        label: 'First Name',
        name: 'first_name',
        placeholder: 'First Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Last Name',
        name: 'last_name',
        placeholder: 'Last Name',
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
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'status',
        name: [
          {
            id: 'active',
            status: 'Active',
          },
          {
            id: 'deleted',
            status: 'Deleted',
          },
          {
            id: 'pending',
            status: 'Pending',
          },
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'status',
        valueKey: 'id',
        id: 'id',
      },
    ],
    [companyStore.data]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyStore.data,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {
            id: 'active',
            status: 'Active',
          },
          {
            id: 'deleted',
            status: 'Deleted',
          },
          {
            id: 'pending',
            status: 'Pending',
          },
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'status',
        valueKey: 'id',
        id: 'id',
      },
    ],
    [companyStore.data]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['supervisor', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchSupervisors({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore, fetchCompanyData])
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

  const handleCreateSupervisor = async (payload: SupervisorFormPayload) => {
    const data: SupervisorCreatePayload = {
      company_id: payload.company_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile_number: payload.mobile_number,
      email: payload.email,
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditSupervisor = async (payload: SupervisorFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: SupervisorUpdatePayload = {
      company_id: payload.company_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile_number: payload.mobile_number,
      email: payload.email,
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: SupervisorFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      company_id: selectedData.company_id._id,
      first_name: selectedData.first_name,
      last_name: selectedData.last_name,
      mobile_number: selectedData.mobile_number,
      email: selectedData.email,
      status: selectedData.status,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Supervisors
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label='Filter'
                Icon={AiOutlineFilter}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
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
            <SkeletonTable columns={['Name', 'Company', 'Mobile', 'Email', 'Status', 'Actions']} />
          ) : (
            <SupervisorTable
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
          data?.pagination && (
            <Pagination
              currentPage={currentPage}
              pagination={data.pagination}
              onPageChange={onPageChange}
              name='Supervisors'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Supervisor'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateSupervisor}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Supervisor'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditSupervisor}
        />
      )}
    </>
  )
}

export default Supervisor
