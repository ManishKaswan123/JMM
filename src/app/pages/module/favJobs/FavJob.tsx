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
  fetchCleanerFavJob,
  CleanerFavJob,
  CleanerFavJobFilters,
  useCreateCleanerFavJob,
  useUpdateCleanerFavJob,
} from 'sr/utils/api/cleanerFavJobApi'
import {useParams} from 'react-router-dom'
import JobsTable from '../jobs/JobsTable'
//   Job_id: string
//   job_type: string[]
//   rate: number
//   additional_information: string
// }
// interface CleanerFavJobFormPayload extends Omit<CleanerFavJobCreatePayload, 'job_type'> {
//   job_type: string
// }
// interface CleanerFavJobUpdatePayload extends CleanerFavJobCreatePayload {
//   id: string
// }

const CleanerFavJobCard: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerFavJob>()
  const [selectedCleanerFavJob, setSelectedCleanerFavJob] = useState<CleanerFavJob>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerFavJobFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCleanerFavJob()
  const updateMutation = useUpdateCleanerFavJob()

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
    queryKey: ['cleanerFavJob', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchCleanerFavJob({limit: itemsPerPage, page: currentPage, ...filters}),
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

  // const handleCreateCleanerFavJob = async (payload: CleanerFavJobFormPayload) => {
  //   const data: CleanerFavJobCreatePayload = {
  //     Job_id: JobId || '',
  //     job_type: [payload.job_type],
  //     rate: payload.rate,
  //     additional_information: payload.additional_information,
  //   }
  //   createMutation.mutate({payload: data, onSuccess})
  // }
  // const handleEditCleanerFavJob = async (payload: CleanerFavJobFormPayload) => {
  //   if (!selectedData) {
  //     setIsUpdateModalOpen(false)
  //     return
  //   }
  //   const data: CleanerFavJobUpdatePayload = {
  //     Job_id: selectedData.Job_id._id,
  //     job_type: [payload.job_type],
  //     rate: payload.rate,
  //     additional_information: payload.additional_information,
  //     id: selectedData.id,
  //   }
  //   updateMutation.mutate({payload: data, onSuccess})
  // }
  // const defaultValues: CleanerFavJobFormPayload | undefined = useMemo(() => {
  //   if (!selectedData) return undefined
  //   return {
  //     Job_id: selectedData.Job_id._id,
  //     job_type: selectedData.job_type[0],
  //     rate: selectedData.rate,
  //     additional_information: selectedData.additional_information,
  //     id: selectedData.id,
  //   }
  // }, [selectedData])
  // if (selectedCleanerFavJob) {
  //   return (
  //     <CleanerFavJobDetailsCard
  //       data={selectedCleanerFavJob}
  //       onGoBack={() => setSelectedCleanerFavJob(undefined)}
  //     />
  //   )
  // }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Favourite Job
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
                'Company Name',
                'Job Title',
                'Start Date',
                'Max Amount',
                'Min Amount',
                'Rate',
                'Status',
                'Actions',
              ]}
            />
          ) : (
            <JobsTable<Record<string, any>>
              //   setSelectedData={setSelectedData}
              //   setIsUpdateModalOpen={setIsUpdateModalOpen}
              data={data?.data.job_ids}
              type='favjobs'
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
            />
          )}
        </div>
        {/* {isLoading ? (
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
            name='CleanerFavJob'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )} */}
      </div>
      {/* {isCreateModalOpen && (
        <DynamicModal
          label='Create Job JobType'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerFavJob}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Job JobType'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleanerFavJob}
        />
      )} */}
    </>
  )
}

export default CleanerFavJobCard
