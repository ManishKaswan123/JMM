import React, {useState, useMemo} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'

import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchCleanerReference,
  CleanerReference,
  CleanerReferenceFilters,
  useCreateCleanerReference,
  useUpdateCleanerReference,
} from 'sr/utils/api/cleanerReferenceApi'
import {CleanerReferenceDetailsCard} from './CleanerReferenceDetails'
import {useParams} from 'react-router-dom'
import CleanerReferenceTable from './CleanerReferenceTable'

interface CleanerReferenceCreatePayload {
  cleaner_id: string
  first_name: string
  last_name: string
  email: string
  mobile_number: string
}
interface CleanerReferenceUpdatePayload extends CleanerReferenceCreatePayload {
  id: string
}

const Custom: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<CleanerReference>()
  const [selectedCleanerRef, setSelectedCleanerRef] = useState<CleanerReference>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerReferenceFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCleanerReference()
  const updateMutation = useUpdateCleanerReference()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'First Name',
        name: 'first_name',
        placeholder: 'First Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Last Name',
        name: 'last_name',
        placeholder: 'Last Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },
      {
        type: 'text',
        label: 'Mobile Number',
        name: 'mobile_number',
        placeholder: 'Mobile Number',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(() => [], [])

  const {data, isLoading} = useQuery({
    queryKey: ['cleanerReference', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchCleanerReference({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateCleanerReference = async (payload: CleanerReferenceCreatePayload) => {
    const data: CleanerReferenceCreatePayload = {
      cleaner_id: cleanerId || '',
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      mobile_number: payload.mobile_number,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditCleanerReference = async (payload: CleanerReferenceUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CleanerReferenceUpdatePayload = {
      cleaner_id: cleanerId || '',
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      mobile_number: payload.mobile_number,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: CleanerReferenceUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      cleaner_id: selectedData.cleaner_id,
      first_name: selectedData.first_name,
      last_name: selectedData.last_name,
      email: selectedData.email,
      mobile_number: selectedData.mobile_number,
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedCleanerRef) {
    return (
      <CleanerReferenceDetailsCard
        data={selectedCleanerRef}
        onGoBack={() => setSelectedCleanerRef(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Cleaner Reference
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
              columns={['Cleaner', 'First Name', 'Last Name', 'Email', 'Mobile', 'Actions']}
            />
          ) : (
            <CleanerReferenceTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectCleanerReference={setSelectedCleanerRef}
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
            name='CleanerReference'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Cleaner Reference'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateCleanerReference}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner Reference'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleanerReference}
        />
      )}
    </>
  )
}
const CleanerReferenceCard: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/cleaner/references'}
      ></DashboardWrapper>
    </>
  )
}

export default CleanerReferenceCard
