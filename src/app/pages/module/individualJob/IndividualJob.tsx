import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import JobTable from './IndividualJobTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchIndividualJob,
  IndividualJob,
  IndividualJobFilters,
  useCreateIndividualJob,
  useUpdateIndividualJob,
} from 'sr/utils/api/individualJobApi'
import {IndividualJobDetailsCard} from './IndividualJobDetails'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {jobTypes} from 'sr/constants/jobsConstants'

interface IndividualJobCreatePayload {
  title: string
  streetAddress: string
  unitorapt: string
  description: string
  individual_id: string
  schedule_date: string
  work_status: string
  cleaner_id: string
  start_time: string
}
interface IndividualJobUpdatePayload extends IndividualJobCreatePayload {
  id: string
}

const IndividualJobCard: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<IndividualJob>()
  const [selectedJob, setSelectedJob] = useState<IndividualJob>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<IndividualJobFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const cleanerData = useSelector((state: RootState) => state.cleaner.data)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const {fetchCleanerData} = useActions()
  const createMutation = useCreateIndividualJob()
  const updateMutation = useUpdateIndividualJob()

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
      {
        type: 'dropdown',
        label: 'title',
        name: jobTypes,
        topLabel: 'Title',
        placeholder: 'Select Title',
        labelKey: 'label',
        valueKey: 'value',
        id: 'id',
        required: true,
      },

      {
        type: 'text',
        label: 'Street Address',
        name: 'streetAddress',
        placeholder: 'Street Address',
        required: true,
      },
      {
        type: 'text',
        label: 'Unit or Apt',
        name: 'unitorapt',
        placeholder: 'Unit or Apt',
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
        type: 'date',
        label: 'Schedule Date',
        name: 'schedule_date',
        placeholder: 'Schedule Date',
        required: true,
      },
      {
        type: 'text',
        label: 'Start Time',
        name: 'start_time',
        placeholder: 'Start time in HH:MM format',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'work_status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Pending', id: 'pending'},
          {name: 'Completed', id: 'completed'},
        ],
        topLabel: 'Work Status',
        placeholder: 'Select Work Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    [cleanerData]
  )

  const fields: FieldsArray = useMemo(
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
      {
        type: 'dropdown',
        label: 'work_status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Pending', id: 'pending'},
          {name: 'Completed', id: 'completed'},
        ],
        topLabel: 'Work Status',
        placeholder: 'Select Work Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [cleanerData]
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
    queryKey: ['individualJob', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchIndividualJob({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateIndividualJob = async (payload: IndividualJobCreatePayload) => {
    const data: IndividualJobCreatePayload = {
      title: payload.title,
      streetAddress: payload.streetAddress,
      unitorapt: payload.unitorapt,
      description: payload.description,
      individual_id: userId || '',
      schedule_date: payload.schedule_date,
      work_status: payload.work_status,
      cleaner_id: payload.cleaner_id,
      start_time: payload.start_time,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditIndividualJob = async (payload: IndividualJobUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: IndividualJobUpdatePayload = {
      title: payload.title,
      streetAddress: payload.streetAddress,
      unitorapt: payload.unitorapt,
      description: payload.description,
      individual_id: userId || '',
      schedule_date: payload.schedule_date,
      work_status: payload.work_status,
      cleaner_id: payload.cleaner_id,
      start_time: payload.start_time,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: IndividualJobUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      title: selectedData.title,
      streetAddress: selectedData.streetAddress || '',
      unitorapt: selectedData.unitorapt || '',
      description: selectedData.description || '',
      individual_id: selectedData.individual_id._id,
      schedule_date: (() => {
        const date = new Date(selectedData.schedule_date || '')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      work_status: selectedData.work_status || '',
      cleaner_id: selectedData.cleaner_id?._id,
      start_time: selectedData.start_time || '',
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedJob) {
    return (
      <IndividualJobDetailsCard data={selectedJob} onGoBack={() => setSelectedJob(undefined)} />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Individual Job
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
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={['Title', 'Unit or Apt', 'Individual', 'Cleaner', 'Work Status', 'Actions']}
            />
          ) : (
            <JobTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectJob={setSelectedJob}
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
              name='individualJob'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Individual Job'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateIndividualJob}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Individual Job'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividualJob}
        />
      )}
    </>
  )
}

export default IndividualJobCard
