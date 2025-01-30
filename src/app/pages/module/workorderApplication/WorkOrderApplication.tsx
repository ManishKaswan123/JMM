import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import {deleteChat} from 'sr/utils/api/deleteChat'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {getPreSignedURL} from 'sr/utils/api/media'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useParams} from 'react-router-dom'
import {
  fetchWorkorderApplications,
  useCreateWorkorderApplication,
  useUpdateWorkorderApplication,
  WorkorderApplication,
} from 'sr/utils/api/workorderApplicationApi'
import WorkorderApplicationTable from './WorkOrderApplicationTable'
interface WorkorderApplicationFormPayload {
  workorder_id: string
  status: string
  cleaner_id: string
}
interface WorkoderApplicationCreatePayload extends WorkorderApplicationFormPayload {}
interface WorkoderApplicationUpdatePayload extends WorkorderApplicationFormPayload {
  id: string
}

const WorkOrderApplication: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string}>()
  const [selectedData, setSelectedData] = useState<WorkorderApplication>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<any>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const cleanerStore = useSelector((state: RootState) => state.cleaner)
  const workorderStore = useSelector((state: RootState) => state.workorder)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCleanerData, fetchWorkorderData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateWorkorderApplication()
  const updateMutation = useUpdateWorkorderApplication()

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'workorder_id',
        name: workorderStore.data,
        topLabel: 'Workorder',
        placeholder: 'Select workorder',
        labelKey: 'workorder_name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerStore.data,
        topLabel: 'Cleaner',
        placeholder: 'Select cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Accept', id: 'accept'},
          {name: 'Publish', id: 'publish'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    [workorderStore.data, cleanerStore.data]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerStore.data,
        topLabel: 'Cleaner',
        placeholder: 'Select cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
      },

      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Accept', id: 'accept'},
          {name: 'Publish', id: 'publish'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [cleanerStore.data]
  )

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['workorderApplication', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchWorkorderApplications({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  useEffect(() => {
    if (cleanerId === undefined) {
      const {cleaner_id, ...rest} = filters
      setFilters(rest)
    }
  }, [cleanerId])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (cleanerStore.status !== 'succeeded') {
      fetchCleanerData({})
    }
    if (workorderStore.status !== 'succeeded') {
      fetchWorkorderData({})
    }
  }, [cleanerStore.status, fetchCleanerData, fetchWorkorderData, workorderStore.status])
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  // const onDeleteChat = async (id: string) => {
  //   const res = await deleteChat(id)
  //   if (!res) {
  //     return
  //   }
  //   refetch()
  // }
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

  const handleCreateWorkorderApplication = async (payload: WorkorderApplicationFormPayload) => {
    const data: WorkoderApplicationCreatePayload = {
      cleaner_id: payload.cleaner_id,
      status: payload.status,
      workorder_id: payload.workorder_id,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditWorkorderApplication = async (payload: WorkorderApplicationFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: WorkoderApplicationUpdatePayload = {
      cleaner_id: payload.cleaner_id,
      status: payload.status,
      workorder_id: payload.workorder_id,
      id: selectedData.id,
    }

    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: WorkorderApplicationFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined

    return {
      workorder_id: selectedData.workorder_id._id,
      status: selectedData.status,
      cleaner_id: selectedData.cleaner_id?._id,
    }
  }, [selectedData])

  const handleView = async (fileUrl: string) => {
    const response: any = await getPreSignedURL({fileName: fileUrl})
    window.open(response.results.url.toString(), '_blank')
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Workorder Application
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
                handleClearFilter={() => {
                  handleApplyFilter({cleaner_id: cleanerId})
                }}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable columns={['Workorder', 'Cleaner', 'Status', 'Actions']} />
          ) : (
            <WorkorderApplicationTable
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
              name='Work Order Application'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Workorder Application'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={{cleaner_id: cleanerId}}
          onSubmit={handleCreateWorkorderApplication}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Workorder Application'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditWorkorderApplication}
        />
      )}
    </>
  )
}

export default WorkOrderApplication
