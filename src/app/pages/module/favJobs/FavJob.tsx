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
  fetchCleanerFavJob,
  CleanerFavJob,
  CleanerFavJobFilters,
  useCreateCleanerFavJob,
  useUpdateCleanerFavJob,
  useDeleteCleanerFavJob,
} from 'sr/utils/api/cleanerFavJobApi'
import {useParams} from 'react-router-dom'
import JobsTable from '../jobs/JobsTable'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
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
  const jobStore = useSelector((state: RootState) => state.job)
  const {fetchJobData} = useActions()
  const createMutation = useCreateCleanerFavJob()
  const updateMutation = useUpdateCleanerFavJob()
  const deleteMutation = useDeleteCleanerFavJob()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'job_id',
        name: jobStore.data,
        topLabel: 'Job',
        placeholder: 'Select Job',
        labelKey: 'job_title',
        id: 'id',
        required: true,
      },
    ],
    [jobStore.data]
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
    if (jobStore.status !== 'succeeded') {
      fetchJobData({})
    }
  }, [jobStore.status, fetchJobData])

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

  const handleCreateCleanerFavJob = async (payload: {job_id: string}) => {
    if (!cleanerId) return
    const data: {job_id: string; cleaner_id: string} = {
      job_id: payload.job_id,
      cleaner_id: cleanerId,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleDelete = async (job_id: string) => {
    if (!cleanerId) return
    deleteMutation.mutate({
      cleaner_id: cleanerId,
      job_id: job_id,
    })
  }
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
              handleDelete={handleDelete}
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          data?.pagination && (
            <Pagination
              pagination={data.pagination}
              currentPage={currentPage}
              onPageChange={onPageChange}
              name='CleanerFavJob'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Add Fav Job'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerFavJob}
        />
      )}
      {/* {isUpdateModalOpen && defaultValues && (
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
