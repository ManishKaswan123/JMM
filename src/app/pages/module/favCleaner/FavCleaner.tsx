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
  fetchIndividualFavCleaner,
  IndividualFavCleaner,
  IndividualFavCleanerFilters,
  useCreateIndividualFavCleaner,
  useDeleteIndividualFavCleaner,
  useUpdateIndividualFavCleaner,
} from 'sr/utils/api/individualFavCleanerApi'
import {useParams} from 'react-router-dom'
import CleanerTable from '../cleaner/CleanerTable'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {CleanerDetails} from 'sr/utils/api/fetchCleaner'

interface IndividualFavCleanerCreatePayload {
  individual_id: string
  cleaner_ids: string[]
}
interface IndividualFavCleanerFormPayload
  extends Omit<IndividualFavCleanerCreatePayload, 'cleaner_ids'> {
  cleaner_id: string
}
// interface IndividualFavCleanerUpdatePayload extends IndividualFavCleanerCreatePayload {
//   id: string
// }

const IndividualFavCleanerCard: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerDetails>()
  const [selectedIndividualFavCleaner, setSelectedIndividualFavCleaner] =
    useState<IndividualFavCleaner>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<IndividualFavCleanerFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const cleanerData = useSelector((state: RootState) => state.cleaner.data)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const {fetchCleanerData} = useActions()
  const createMutation = useCreateIndividualFavCleaner()
  const updateMutation = useUpdateIndividualFavCleaner()
  const deleteMutation = useDeleteIndividualFavCleaner()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerData,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
        required: true,
      },
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
    [cleanerData]
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
    if (cleanerStatus !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStatus, fetchCleanerData])

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
  const handleDeleteIndividualFavCleaner = async (cleaner_id: string) => {
    deleteMutation.mutate({
      individual_id: userId || '',
      cleaner_id: cleaner_id,
    })
  }

  const handleCreateIndividualFavCleaner = async (payload: IndividualFavCleanerFormPayload) => {
    const data: IndividualFavCleanerCreatePayload = {
      individual_id: userId || '',
      cleaner_ids: [payload.cleaner_id],
    }
    createMutation.mutate({payload: data, onSuccess})
  }
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
            <CleanerTable<Record<string, any>>
              type='favcleaner'
              data={data?.data.cleaner_ids}
              handleDelete={handleDeleteIndividualFavCleaner}
              setSelectedData={setSelectedData}
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
              name='IndividualFavCleaner'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Add New Cleaner'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateIndividualFavCleaner}
        />
      )}
      {/* {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner JobType'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividualFavCleaner}
        />
      )}  */}
    </>
  )
}

export default IndividualFavCleanerCard
