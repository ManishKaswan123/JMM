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
  fetchIndividualFavCleaner,
  IndividualFavCleaner,
  IndividualFavCleanerFilters,
  useCreateIndividualFavCleaner,
  useUpdateIndividualFavCleaner,
} from 'sr/utils/api/individualFavCleanerApi'
import {useParams} from 'react-router-dom'
import CleanerTable from '../cleaner/CleanerTable'

// interface IndividualFavCleanerCreatePayload {
//   cleaner_id: string
//   job_type: string[]
//   rate: number
//   additional_information: string
// }
// interface IndividualFavCleanerFormPayload extends Omit<IndividualFavCleanerCreatePayload, 'job_type'> {
//   job_type: string
// }
// interface IndividualFavCleanerUpdatePayload extends IndividualFavCleanerCreatePayload {
//   id: string
// }

const IndividualFavCleanerCard: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<IndividualFavCleaner>()
  const [selectedIndividualFavCleaner, setSelectedIndividualFavCleaner] =
    useState<IndividualFavCleaner>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<IndividualFavCleanerFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateIndividualFavCleaner()
  const updateMutation = useUpdateIndividualFavCleaner()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      // {
      //   type: 'text',
      //   label: 'Job Type',
      //   name: 'job_type',
      //   placeholder: 'Job Type',
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
    queryKey: ['individualFavCleaner', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchIndividualFavCleaner({limit: itemsPerPage, page: currentPage, ...filters}),
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

  // const handleCreateIndividualFavCleaner = async (payload: IndividualFavCleanerFormPayload) => {
  //   const data: IndividualFavCleanerCreatePayload = {
  //     cleaner_id: cleanerId || '',
  //     job_type: [payload.job_type],
  //     rate: payload.rate,
  //     additional_information: payload.additional_information,
  //   }
  //   createMutation.mutate({payload: data, onSuccess})
  // }
  // const handleEditIndividualFavCleaner = async (payload: IndividualFavCleanerFormPayload) => {
  //   if (!selectedData) {
  //     setIsUpdateModalOpen(false)
  //     return
  //   }
  //   const data: IndividualFavCleanerUpdatePayload = {
  //     cleaner_id: selectedData.cleaner_id._id,
  //     job_type: [payload.job_type],
  //     rate: payload.rate,
  //     additional_information: payload.additional_information,
  //     id: selectedData.id,
  //   }
  //   updateMutation.mutate({payload: data, onSuccess})
  // }
  // const defaultValues: IndividualFavCleanerFormPayload | undefined = useMemo(() => {
  //   if (!selectedData) return undefined
  //   return {
  //     cleaner_id: selectedData.cleaner_id._id,
  //     job_type: selectedData.job_type[0],
  //     rate: selectedData.rate,
  //     additional_information: selectedData.additional_information,
  //     id: selectedData.id,
  //   }
  // }, [selectedData])
  // if (selectedIndividualFavCleaner) {
  //   return (
  //     <IndividualFavCleanerDetailsCard
  //       data={selectedIndividualFavCleaner}
  //       onGoBack={() => setSelectedIndividualFavCleaner(undefined)}
  //     />
  //   )
  // }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Favourite Cleaner
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
                  handleApplyFilter({individual_id: userId})
                }}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={['Username', 'Mobile Number', 'Email', 'Date Of Birth', 'Status', 'Actions']}
            />
          ) : (
            <CleanerTable<Record<string, any>> type='favcleaner' data={data?.data.cleaner_ids} />
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
              name='IndividualFavCleaner'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {/* {isCreateModalOpen && (
        <DynamicModal
          label='Create Cleaner JobType'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateIndividualFavCleaner}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner JobType'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividualFavCleaner}
        />
      )} */}
    </>
  )
}

export default IndividualFavCleanerCard
