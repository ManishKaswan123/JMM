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
import ApplicationTable from './ApplicationTable'
import {fetchApplications, JobApplication} from 'sr/utils/api/fetchApplications'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useCreateApplication} from 'sr/utils/api/createApplication'
import {useUpdateApplication} from 'sr/utils/api/updateApplication'
import {useParams} from 'react-router-dom'
import {Status} from 'sr/utils/api/globalInterface'
import {statuses} from 'sr/constants/common'

interface Filters {
  cleaner_id?: string
  job_id?: string
  status?: string
}

interface ApplicationCreatePayload {
  job_id: string
  cleaner_id: string
  answers: string[]
  status: Status
}
interface ApplicationFormPayload extends Omit<ApplicationCreatePayload, 'answers'> {
  answers: string
}

interface ApplicationUpdatePayload extends ApplicationCreatePayload {
  id: string
}

const Application: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string}>()
  const [selectedData, setSelectedData] = useState<JobApplication>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<Filters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const cleanerData = useSelector((state: RootState) => state.cleaner.data)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const jobData = useSelector((state: RootState) => state.job.data)
  const jobStatus = useSelector((state: RootState) => state.job.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCleanerData, fetchJobData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateApplication()
  const updateMutation = useUpdateApplication()

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'job_id',
        name: jobData,
        topLabel: 'Job',
        placeholder: 'Select Job',
        labelKey: 'job_title',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerData,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: statuses,
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Answer',
        name: 'answers',
        placeholder: 'Answers',
        required: true,
      },
    ],
    [jobData, cleanerData]
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'job_id',
        name: jobData,
        topLabel: 'Job',
        placeholder: 'Select Job',
        labelKey: 'job_title',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerData,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: statuses,
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Answer',
        name: 'answers',
        placeholder: 'Answers',
        required: true,
      },
    ],
    [jobData, cleanerData]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'job_id',
        name: jobData,
        topLabel: 'Job',
        placeholder: 'Select Job',
        labelKey: 'job_title',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerData,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: statuses,
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [cleanerData, jobData]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['application', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchApplications({limit: itemsPerPage, page: currentPage, ...filters}),
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
    if (cleanerId === undefined) {
      const {cleaner_id, ...rest} = filters
      setFilters(rest)
    }
  }, [cleanerId])
  const fetchDataIfNeeded = useCallback(() => {
    if (jobStatus !== 'succeeded') {
      fetchJobData({})
    }
    if (cleanerStatus !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStatus, fetchCleanerData, fetchJobData, jobStatus])

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

  const handleCreateApplication = async (payload: ApplicationFormPayload) => {
    const data: ApplicationCreatePayload = {
      job_id: payload.job_id,
      cleaner_id: payload.cleaner_id,
      answers: [payload.answers],
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditApplication = async (payload: ApplicationFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: ApplicationUpdatePayload = {
      job_id: payload.job_id,
      cleaner_id: payload.cleaner_id,
      answers: [payload.answers],
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }

  const defaultValues: ApplicationUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      job_id: selectedData.job_id._id,
      cleaner_id: selectedData.cleaner_id._id,
      status: selectedData.status,
      answers: selectedData.answers[0],
      id: selectedData.id,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Job Applications
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
            <SkeletonTable columns={['Job Id', 'Cleaner Id', 'Status', 'Actions']} />
          ) : (
            <ApplicationTable
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
              name='Application'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Application'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          defaultValues={cleanerId ? {cleaner_id: cleanerId} : undefined}
          onSubmit={handleCreateApplication}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Application'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditApplication}
        />
      )}
    </>
  )
}

export default Application
