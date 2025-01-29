import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'

import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchCleanerFavWorkorder,
  CleanerFavWorkorder,
  CleanerFavWorkorderFilters,
  useCreateCleanerFavWorkorder,
  useUpdateCleanerFavWorkorder,
  useDeleteCleanerFavWorkorder,
} from 'sr/utils/api/cleanerFavWorkorderApi'
import {useParams} from 'react-router-dom'
import WorkOrderTable from '../workOrder/WorkOrderTable'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
//   Workorder_id: string
//   Workorder_type: string[]
//   rate: number
//   additional_information: string
// }
// interface CleanerFavWorkorderFormPayload extends Omit<CleanerFavWorkorderCreatePayload, 'Workorder_type'> {
//   Workorder_type: string
// }
// interface CleanerFavWorkorderUpdatePayload extends CleanerFavWorkorderCreatePayload {
//   id: string
// }

const CleanerFavWorkorderCard: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerFavWorkorder>()
  const [selectedCleanerFavWorkorder, setSelectedCleanerFavWorkorder] =
    useState<CleanerFavWorkorder>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerFavWorkorderFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const workorderStore = useSelector((state: RootState) => state.workorder)
  const {fetchWorkorderData} = useActions()
  const createMutation = useCreateCleanerFavWorkorder()
  const updateMutation = useUpdateCleanerFavWorkorder()
  const deleteMutation = useDeleteCleanerFavWorkorder()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'workorder_id',
        name: workorderStore.data,
        topLabel: 'Workorder',
        placeholder: 'Select Workorder',
        labelKey: 'workorder_name',
        id: 'id',
        required: true,
      },
    ],
    [workorderStore.data]
  )

  const fields: FieldsArray = useMemo(
    () => [
      // {
      //   type: 'number',
      //   label: 'Rate',
      //   name: 'rate',
      //   placeholder: 'Rate',
      // },
    ],
    []
  )
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (workorderStore.status !== 'succeeded') {
      fetchWorkorderData({})
    }
  }, [workorderStore.status, fetchWorkorderData])

  const {data, isLoading} = useQuery({
    queryKey: ['cleanerFavWorkorder', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchCleanerFavWorkorder({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateCleanerFavWorkorder = async (payload: {workorder_id: string}) => {
    if (!cleanerId) return
    const data: {workorder_id: string; cleaner_id: string} = {
      workorder_id: payload.workorder_id,
      cleaner_id: cleanerId,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleDelete = async (workorder_id: string) => {
    if (!cleanerId) return
    deleteMutation.mutate({
      cleaner_id: cleanerId,
      workorder_id: workorder_id,
    })
  }
  // const handleEditCleanerFavWorkorder = async (payload: CleanerFavWorkorderFormPayload) => {
  //   if (!selectedData) {
  //     setIsUpdateModalOpen(false)
  //     return
  //   }
  //   const data: CleanerFavWorkorderUpdatePayload = {
  //     Workorder_id: selectedData.Workorder_id._id,
  //     Workorder_type: [payload.Workorder_type],
  //     rate: payload.rate,
  //     additional_information: payload.additional_information,
  //     id: selectedData.id,
  //   }
  //   updateMutation.mutate({payload: data, onSuccess})
  // }
  // const defaultValues: CleanerFavWorkorderFormPayload | undefined = useMemo(() => {
  //   if (!selectedData) return undefined
  //   return {
  //     Workorder_id: selectedData.Workorder_id._id,
  //     Workorder_type: selectedData.Workorder_type[0],
  //     rate: selectedData.rate,
  //     additional_information: selectedData.additional_information,
  //     id: selectedData.id,
  //   }
  // }, [selectedData])
  // if (selectedCleanerFavWorkorder) {
  //   return (
  //     <CleanerFavWorkorderDetailsCard
  //       data={selectedCleanerFavWorkorder}
  //       onGoBack={() => setSelectedCleanerFavWorkorder(undefined)}
  //     />
  //   )
  // }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Favourite Workorder
            </h2>
            <div className='flex items-center'>
              <Button
                label='Add new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              {/* <Button
                label={`${isFilterVisible ? 'Close' : 'Filters'}`}
                Icon={!isFilterVisible ? AiOutlineFilter : AiOutlineClose}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className={`text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center ${
                  isFilterVisible ? 'bg-red-400 hover:bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              ></Button> */}
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
            <SkeletonTable
              columns={[
                'Title',
                'Description',
                'Type',
                'Company Name',
                'Checklist Name',
                'Customer Name',
                'Actions',
              ]}
            />
          ) : (
            <WorkOrderTable<Record<string, any>>
              //   setSelectedData={setSelectedData}
              //   setIsUpdateModalOpen={setIsUpdateModalOpen}
              type='favworkorder'
              data={data?.data.workorder_ids}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
              handleDelete={handleDelete}
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
              name='CleanerFavWorkorder'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Add Fav Workorder'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerFavWorkorder}
        />
      )}
      {/* {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Workorder WorkorderType'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleanerFavWorkorder}
        />
      )} */}
    </>
  )
}

export default CleanerFavWorkorderCard
