import React, {useState, useMemo} from 'react'
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
} from 'sr/utils/api/cleanerFavWorkorderApi'
import {useParams} from 'react-router-dom'
import WorkOrderTable from '../workOrder/WorkOrderTable'
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
  const createMutation = useCreateCleanerFavWorkorder()
  const updateMutation = useUpdateCleanerFavWorkorder()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      // {
      //   type: 'text',
      //   label: 'Workorder Type',
      //   name: 'Workorder_type',
      //   placeholder: 'Workorder Type',
      //   required: true,
      // },
      // {
      //   type: 'number',
      //   label: 'Rate',
      //   name: 'rate',
      //   placeholder: 'Rate',
      //   required: true,
      // },
      // {
      //   type: 'text',
      //   label: 'Additional Info',
      //   name: 'additional_information',
      //   placeholder: 'Additional Info',
      //   required: true,
      // },
    ],
    []
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

  // const handleCreateCleanerFavWorkorder = async (payload: CleanerFavWorkorderFormPayload) => {
  //   const data: CleanerFavWorkorderCreatePayload = {
  //     Workorder_id: WorkorderId || '',
  //     Workorder_type: [payload.Workorder_type],
  //     rate: payload.rate,
  //     additional_information: payload.additional_information,
  //   }
  //   createMutation.mutate({payload: data, onSuccess})
  // }
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
              {/* <Button
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
      {/* {isCreateModalOpen && (
        <DynamicModal
          label='Create Workorder WorkorderType'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerFavWorkorder}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
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
