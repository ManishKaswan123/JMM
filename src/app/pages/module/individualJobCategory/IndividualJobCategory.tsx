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
import JobCategoryTable from './IndividualJobCategoryTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchIndividualJobCategory,
  IndividualJobCategory,
  IndividualJobCategoryFilters,
  useCreateIndividualJobCategory,
  useUpdateIndividualJobCategory,
} from 'sr/utils/api/individualJobCategoryApi'
import {IndividualJobCategoryDetailsCard} from './IndividualJobCategoryDetails'
import {useParams} from 'react-router-dom'

interface IndividualJobCategoryCreatePayload {
  name: string
  icon_path: string
}
interface IndividualJobCategoryUpdatePayload extends IndividualJobCategoryCreatePayload {
  id: string
}

const Custom: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<IndividualJobCategory>()
  const [selectedJobCategory, setSelectedJobCategory] = useState<IndividualJobCategory>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<IndividualJobCategoryFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateIndividualJobCategory()
  const updateMutation = useUpdateIndividualJobCategory()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(() => [], [])

  const {data, isLoading} = useQuery({
    queryKey: ['individualJobCategory', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchIndividualJobCategory({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateIndividualJobCategory = async (payload: IndividualJobCategoryCreatePayload) => {
    const data: IndividualJobCategoryCreatePayload = {
      icon_path: payload.icon_path || '',
      name: payload.name,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditIndividualJobCategory = async (payload: IndividualJobCategoryUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: IndividualJobCategoryUpdatePayload = {
      name: payload.name,
      icon_path: selectedData.icon_path || '',
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: IndividualJobCategoryUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData.name,
      icon_path: selectedData.icon_path,
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedJobCategory) {
    return (
      <IndividualJobCategoryDetailsCard
        data={selectedJobCategory}
        onGoBack={() => setSelectedJobCategory(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Individual JobCategory
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
            <SkeletonTable columns={['Name', 'Icon Path', 'Created At', 'Updated At', 'Actions']} />
          ) : (
            <JobCategoryTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectJobCategory={setSelectedJobCategory}
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
            name='individualJobCategory'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Individual JobCategory'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateIndividualJobCategory}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Individual JobCategory'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividualJobCategory}
        />
      )}
    </>
  )
}
const IndividualJobCategoryCard: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/individual/job/category'}
      ></DashboardWrapper>
    </>
  )
}

export default IndividualJobCategoryCard
