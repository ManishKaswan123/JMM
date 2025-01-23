import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {
  Checklist,
  fetchChecklists,
  useCreateChecklist,
  useUpdateChecklist,
} from 'sr/utils/api/checklistApi'
import ChecklistTable from './ChecklistTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useParams} from 'react-router-dom'

interface Filters {
  company_id?: string
  customer_id?: string
  type?: string
  subtype?: string
  status?: string
}
interface ChecklistCreatePayload {
  name: string
  type: string
  subtype: string
  company_id: string
  customer_id: string
  task_ids: Record<string, any>[]
  status: string
}
interface ChecklistUpdatePayload extends ChecklistCreatePayload {
  id: string
}

const ChecklistCard: React.FC = () => {
  const [selectedData, setSelectedData] = useState<Checklist>()
  const {customer_id} = useParams<{customer_id: string}>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<Filters>({customer_id})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyData = useSelector((state: RootState) => state.company.data)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const customerData = useSelector((state: RootState) => state.customer.data)
  const customerStatus = useSelector((state: RootState) => state.customer.status)
  const taskStore = useSelector((state: RootState) => state.task)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCompanyData, fetchCustomersData, fetchTaskData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateChecklist()
  const updateMutation = useUpdateChecklist()

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'multi',
        options: taskStore.data?.map((item) => ({label: item.task_name, value: item.id})) || [],
        label: 'task_ids',
        name: 'Tasks',
        placeholder: 'Select Tasks',
      },
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        required: true,
      },

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
        label: 'customer_id',
        name: customerData,
        topLabel: 'Customer',
        placeholder: 'Select Customer',
        labelKey: 'customer_name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Daily', id: 'Daily'},
          {name: 'Weekly', id: 'Weekly'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'subtype',
        name: [
          {name: 'Office', id: 'Office'},
          {name: 'Hospital', id: 'Hospital'},
        ],
        topLabel: 'Sub Type',
        placeholder: 'Select Sub Type',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Draft', id: 'draft'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    [companyData, customerData, taskStore.data]
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
        label: 'customer_id',
        name: customerData,
        topLabel: 'Customer',
        placeholder: 'Select Customer',
        labelKey: 'customer_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Weekly', id: 'Weekly'},
          {name: 'Daily', id: 'Daily'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
      },
      {
        type: 'dropdown',
        label: 'subtype',
        name: [
          {name: 'Office', id: 'Office'},
          {name: 'Hospital', id: 'Hospital'},
        ],
        topLabel: 'Sub Type',
        placeholder: 'Select Sub Type',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Draft', id: 'draft'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [companyData, customerData]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['checklist', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchChecklists({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  useEffect(() => {
    if (customer_id === undefined) {
      const {customer_id, ...rest} = filters
      setFilters(rest)
    }
  }, [customer_id])

  const fetchDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
    if (customerStatus !== 'succeeded') {
      fetchCustomersData({})
    }
    if (taskStore.status !== 'succeeded') {
      fetchTaskData({})
    }
  }, [
    companyStatus,
    fetchCompanyData,
    customerStatus,
    fetchCustomersData,
    taskStore.status,
    fetchTaskData,
  ])

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

  const handleCreateChecklist = async (payload: ChecklistCreatePayload) => {
    const data: ChecklistCreatePayload = {
      name: payload.name,
      type: payload.type,
      subtype: payload.subtype,
      company_id: payload.company_id,
      customer_id: payload.customer_id,
      task_ids: payload.task_ids,
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditChecklist = async (payload: ChecklistUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: ChecklistUpdatePayload = {
      name: payload.name,
      type: payload.type,
      subtype: payload.subtype,
      company_id: payload.company_id,
      customer_id: payload.customer_id,
      task_ids: payload.task_ids,
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: ChecklistUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData.name,
      type: selectedData.type,
      subtype: selectedData.subtype,
      company_id: selectedData.company_id._id,
      customer_id: selectedData.customer_id._id,
      task_ids: selectedData.task_ids.map((item) => {
        return {value: item._id, label: item.name}
      }),
      status: selectedData.status,
      id: selectedData.id,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Checklist</h2>
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
                handleClearFilter={() => handleApplyFilter({customer_id})}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={[
                'Name',
                'Type',
                'SubType',
                'Company Name',
                'Customer Name',
                'Status',
                'Actions',
              ]}
            />
          ) : (
            <ChecklistTable
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
              name='checklist'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Checklist'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          defaultValues={customer_id ? {customer_id} : undefined}
          onSubmit={handleCreateChecklist}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Checklist'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={defaultValues}
          onSubmit={handleEditChecklist}
        />
      )}
    </>
  )
}

export default ChecklistCard
