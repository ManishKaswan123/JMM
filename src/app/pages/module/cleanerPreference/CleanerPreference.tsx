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
  fetchCleanerPreference,
  CleanerPreference,
  CleanerPreferenceFilters,
  useCreateCleanerPreference,
  useUpdateCleanerPreference,
} from 'sr/utils/api/cleanerPreferenceApi'
import {CleanerPreferenceDetailsCard} from './CleanerPreferenceDetails'
import {useParams} from 'react-router-dom'
import CleanerPreferenceTable from './CleanerPreferenceTable'

interface CleanerPreferenceCreatePayload {
  cleaner_id: string
  radius: number
  shift_type: string
  min_hours: number
  max_hours: number
}
interface CleanerPreferenceUpdatePayload extends CleanerPreferenceCreatePayload {
  id: string
}

const CleanerPreferenceCard: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerPreference>()
  const [selectedCleanerPreference, setSelectedCleanerPreference] = useState<CleanerPreference>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerPreferenceFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCleanerPreference()
  const updateMutation = useUpdateCleanerPreference()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'number',
        label: 'Radius',
        name: 'radius',
        placeholder: 'Radius',
        required: true,
      },
      {
        type: 'text',
        label: 'Shift Type',
        name: 'shift_type',
        placeholder: 'Shift Type',
        required: true,
      },
      {
        type: 'number',
        label: 'Min Hours',
        name: 'min_hours',
        placeholder: 'Min Hours',
        required: true,
      },
      {
        type: 'number',
        label: 'Max Hours',
        name: 'max_hours',
        placeholder: 'Max Hours',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(() => [], [])

  const {data, isLoading} = useQuery({
    queryKey: ['cleanerPreference', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchCleanerPreference({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateCleanerPreference = async (payload: CleanerPreferenceCreatePayload) => {
    const data: CleanerPreferenceCreatePayload = {
      cleaner_id: cleanerId || '',
      radius: payload.radius,
      shift_type: payload.shift_type,
      min_hours: payload.min_hours,
      max_hours: payload.max_hours,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditCleanerPreference = async (payload: CleanerPreferenceUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CleanerPreferenceUpdatePayload = {
      cleaner_id: selectedData.cleaner_id,
      radius: payload.radius,
      shift_type: payload.shift_type,
      min_hours: payload.min_hours,
      max_hours: payload.max_hours,

      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: CleanerPreferenceUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      cleaner_id: selectedData.cleaner_id,
      radius: selectedData.radius,
      shift_type: selectedData.shift_type,
      min_hours: selectedData.min_hours,
      max_hours: selectedData.max_hours,
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedCleanerPreference) {
    return (
      <CleanerPreferenceDetailsCard
        data={selectedCleanerPreference}
        onGoBack={() => setSelectedCleanerPreference(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Cleaner Preference
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
              columns={['Cleaner', 'Radius', 'Shift Type', 'Min Hours', 'Max Hours', 'Actions']}
            />
          ) : (
            <CleanerPreferenceTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectCleanerPreference={setSelectedCleanerPreference}
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
              name='cleanerPreference'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Cleaner Preference'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerPreference}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner Preference'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleanerPreference}
        />
      )}
    </>
  )
}

export default CleanerPreferenceCard
