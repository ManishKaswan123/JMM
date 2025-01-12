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
  fetchCleanerMedical,
  CleanerMedical,
  CleanerMedicalFilters,
  useCreateCleanerMedical,
  useUpdateCleanerMedical,
} from 'sr/utils/api/cleanerMedicalApi'
import {CleanerMedicalDetailsCard} from './CleanerMedicalDetails'
import {useParams} from 'react-router-dom'
import CleanerMedicalTable from './CleanerMedicalTable'

interface CleanerMedicalCreatePayload {
  cleaner_id: string
  condition: string
  since_when: string
  description: string
}
interface CleanerMedicalUpdatePayload extends CleanerMedicalCreatePayload {
  id: string
}

const CleanerMedicalCard: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerMedical>()
  const [selectedCleanerMedical, setSelectedCleanerMedical] = useState<CleanerMedical>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerMedicalFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCleanerMedical()
  const updateMutation = useUpdateCleanerMedical()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Condition',
        name: 'condition',
        placeholder: 'Condition',
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
        label: 'Since When',
        name: 'since_when',
        placeholder: 'Since When',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(() => [], [])

  const {data, isLoading} = useQuery({
    queryKey: ['cleanerMedical', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchCleanerMedical({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateCleanerMedical = async (payload: CleanerMedicalCreatePayload) => {
    const data: CleanerMedicalCreatePayload = {
      cleaner_id: cleanerId || '',
      condition: payload.condition,
      since_when: payload.since_when,
      description: payload.description,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditCleanerMedical = async (payload: CleanerMedicalUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CleanerMedicalUpdatePayload = {
      cleaner_id: selectedData.cleaner_id,
      condition: payload.condition,
      since_when: payload.since_when,
      description: payload.description,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: CleanerMedicalUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      cleaner_id: selectedData.cleaner_id,
      condition: selectedData.condition,
      description: selectedData.description,

      since_when: (() => {
        const date = new Date(selectedData.since_when)
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),

      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedCleanerMedical) {
    return (
      <CleanerMedicalDetailsCard
        data={selectedCleanerMedical}
        onGoBack={() => setSelectedCleanerMedical(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Cleaner Medical
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
            <SkeletonTable columns={['Cleaner', 'Condition', 'Since When', 'Actions']} />
          ) : (
            <CleanerMedicalTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectCleanerMedical={setSelectedCleanerMedical}
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
            name='cleanerMedical'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Cleaner Medical'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerMedical}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner Medical'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleanerMedical}
        />
      )}
    </>
  )
}

export default CleanerMedicalCard
