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
import TaskListTable from './TaskListTable'
import {fetchTaskList, TaskListDetails, TasklistFilters} from 'sr/utils/api/fetchTaskList'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useCreateTasklist} from 'sr/utils/api/createTasklist'
import {useUpdateTasklist} from 'sr/utils/api/updateTasklist'

interface CreateTasklistPayload {
  name: string
  description: string
  type: string
  checklist_id: string
  company_id: string
  customer_id: string
  images: string[]
  videos: string[]
  status: string
}
interface UpdateTasklistPayload extends Omit<CreateTasklistPayload, 'password'> {
  id: string
}
const TaskList: React.FC = () => {
  const [selectedData, setSelectedData] = useState<TaskListDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<TasklistFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyData = useSelector((state: RootState) => state.company.data)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const customerData = useSelector((state: RootState) => state.customer.data)
  const customerStatus = useSelector((state: RootState) => state.customer.status)
  const checklistData = useSelector((state: RootState) => state.checklist.data)
  const checklistStatus = useSelector((state: RootState) => state.checklist.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCustomersData, fetchChecklistData, fetchCompanyData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateTasklist()
  const updateMutation = useUpdateTasklist()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select company',
        labelKey: 'company_name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'customer_id',
        name: customerData,
        topLabel: 'Customer',
        placeholder: 'Select Customer',
        labelKey: 'customer_name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'checklist_id',
        name: checklistData,
        topLabel: 'Checklist',
        placeholder: 'Select Checklist',
        labelKey: 'checklist_name',
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
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Mandatory', id: 'Mandatory'},
          {name: 'Optional', id: 'Optional'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
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
          {name: 'Deleted', id: 'deleted'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    [customerData, companyData, checklistData]
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
        label: 'checklist_id',
        name: checklistData,
        topLabel: 'Checklist',
        placeholder: 'Select Checklist',
        labelKey: 'checklist_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Mandatory', id: 'Manadatory'},
          {name: 'Optional', id: 'Optional'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Draft', id: 'draft'},
          {name: 'Deleted', id: 'deleted'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [companyData, customerData, checklistData]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['tasklist', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchTaskList({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
    if (customerStatus !== 'succeeded') {
      fetchCustomersData({})
    }
    if (checklistStatus !== 'succeeded') {
      fetchChecklistData({})
    }
  }, [
    companyStatus,
    fetchCompanyData,
    customerStatus,
    fetchCustomersData,
    checklistStatus,
    fetchChecklistData,
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

  const handleCreateTasklist = async (payload: Record<string, any>) => {
    const data: CreateTasklistPayload = {
      name: payload.name,
      description: payload.description,
      type: payload.type,
      checklist_id: payload.checklist_id,
      company_id: payload.company_id,
      customer_id: payload.customer_id,
      images: [],
      videos: [],
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditTasklist = async (payload: Record<string, any>) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: UpdateTasklistPayload = {
      name: payload.name,
      description: payload.description,
      type: payload.type,
      checklist_id: payload.checklist_id,
      company_id: payload.company_id,
      customer_id: payload.customer_id,
      images: selectedData.images,
      videos: selectedData.videos,
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: Record<string, any> | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData.name,
      description: selectedData.description,
      type: selectedData.type,
      checklist_id: selectedData.checklist_id,
      company_id: selectedData.company_id,
      customer_id: selectedData.customer_id,
      images: selectedData.images,
      videos: selectedData.videos,
      status: selectedData.status,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>TaskList</h2>
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
              columns={['Name', 'Type', 'Checklist', 'Company', 'Customer', 'Status', 'Actions']}
            />
          ) : (
            <TaskListTable
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
              name='TaskList'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create TaskList'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateTasklist}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update TaskList'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditTasklist}
        />
      )}
    </>
  )
}

export default TaskList
