import React, {useState, useMemo, useCallback, useEffect} from 'react'
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
  fetchCleanerEmployment,
  CleanerEmployment,
  CleanerEmploymentFilters,
  useCreateCleanerEmployment,
  useUpdateCleanerEmployment,
} from 'sr/utils/api/cleanerEmploymentApi'
import {CleanerEmploymentDetailsCard} from './CleanerEmploymentDetails'
import {useParams} from 'react-router-dom'
import CleanerEmploymentTable from './CleanerEmploymentTable'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

interface CleanerEmploymentCreatePayload {
  cleaner_id: string
  currently_employed: boolean
  company_name: string
  job_title: string
  company_location: string
  working_since_start: string
  working_since_end: string
}
interface CleanerEmploymentUpdatePayload extends CleanerEmploymentCreatePayload {
  id: string
}

const CleanerEmploymentCard: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerEmployment>()
  const [selectedCleanerEmp, setSelectedCleanerEmp] = useState<CleanerEmployment>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerEmploymentFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCleanerEmployment()
  const updateMutation = useUpdateCleanerEmployment()
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])
  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore.status, fetchCompanyData])

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'currently_employed',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Currently Employed',
        placeholder: 'Select Currently Employed',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'company_name',
        name: companyStore.data,
        topLabel: 'Company Name',
        placeholder: 'Select Company Name',
        labelKey: 'name',
        id: 'name',
        required: true,
      },
      {
        type: 'text',
        label: 'Job Title',
        name: 'job_title',
        placeholder: 'Job Title',
        required: true,
      },
      {
        type: 'text',
        label: 'Company Location',
        name: 'company_location',
        placeholder: 'Company Location',
        required: true,
      },
      {
        type: 'date',
        label: 'Working Since Start',
        name: 'working_since_start',
        placeholder: 'Working Since Start',
        required: true,
      },
      {
        type: 'date',
        label: 'Working Since End',
        name: 'working_since_end',
        placeholder: 'Working Since End',
        required: true,
      },
    ],
    [companyStore.data]
  )

  const fields: FieldsArray = useMemo(() => [], [])

  const {data, isLoading} = useQuery({
    queryKey: ['cleanerEmployment', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchCleanerEmployment({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateCleanerEmployment = async (payload: CleanerEmploymentCreatePayload) => {
    const data: CleanerEmploymentCreatePayload = {
      cleaner_id: cleanerId || '',
      currently_employed: payload.currently_employed,
      company_name: payload.company_name,
      job_title: payload.job_title,
      company_location: payload.company_location,
      working_since_start: payload.working_since_start,
      working_since_end: payload.working_since_end,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditCleanerEmployment = async (payload: CleanerEmploymentUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CleanerEmploymentUpdatePayload = {
      cleaner_id: selectedData.cleaner_id,
      currently_employed: payload.currently_employed,
      company_name: payload.company_name,
      job_title: payload.job_title,
      company_location: payload.company_location,
      working_since_start: payload.working_since_start,
      working_since_end: payload.working_since_end,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: CleanerEmploymentUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      cleaner_id: selectedData.cleaner_id,
      currently_employed: selectedData.currently_employed || false,
      company_name: selectedData.company_name || '',
      job_title: selectedData.job_title || '',
      company_location: selectedData.company_location || '',
      working_since_start: (() => {
        const date = new Date(selectedData.working_since_start || '')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      working_since_end: (() => {
        const date = new Date(selectedData.working_since_end || '')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedCleanerEmp) {
    return (
      <CleanerEmploymentDetailsCard
        data={selectedCleanerEmp}
        onGoBack={() => setSelectedCleanerEmp(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Cleaner Employment
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
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
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={['Cleaner', 'Company Name', 'Job Title', 'Currently Employed', 'Actions']}
            />
          ) : (
            <CleanerEmploymentTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectCleanerEmployment={setSelectedCleanerEmp}
              data={data?.data}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
            />
          )}
        </div>
        {isLoading ? (
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
            name='CleanerEmployment'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Cleaner Employment'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerEmployment}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner Employment'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleanerEmployment}
        />
      )}
    </>
  )
}

export default CleanerEmploymentCard
