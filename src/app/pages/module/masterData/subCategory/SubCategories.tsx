import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import Table from 'sr/helpers/ui-components/dashboardComponents/Table'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchSubCategory} from 'sr/utils/api/fetchSubCategory'
import {delSubCategory} from 'sr/utils/api/delSubCategory'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {createSubCategory} from 'sr/utils/api/createSubCategory'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {updateSubCategory} from 'sr/utils/api/updateSubCategory'
import {useActions} from 'sr/utils/helpers/useActions'
import {useQuery} from '@tanstack/react-query'
import SkeletonTable from 'sr/helpers/ui-components/dashboardComponents/SkeletonTable'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'

interface subCategoryApiResponse {
  name: string
  categoryId?: string
  taxCode: string
  createdAt: string
  updatedAt: string
  id: string
}

interface subCategoryFilters {
  name?: string
  categoryId?: string
}
interface subCategoryCreatePayload {
  name: string
  categoryId: string
  taxCode: string
}
interface subCategoryUpdatePayload extends Omit<subCategoryApiResponse, 'taxCode'> {}

const Custom: React.FC = () => {
  const [filters, setFilters] = useState<subCategoryFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const categoryData = useSelector((state: RootState) => state.categoryType.data)
  const categoryStatus = useSelector((state: RootState) => state.categoryType.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<subCategoryApiResponse>()
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const {fetchCategoryType} = useActions()

  const fields = useMemo(
    () => [
      {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},
      {
        type: 'dropdown',
        topLabel: 'Category',
        placeholder: 'Select Category',
        label: 'categoryId',
        name: categoryData?.results,
        required: true,
        lableKey: 'name',
      },
    ],
    [categoryData]
  )
  const createFields = useMemo(
    () => [
      {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},
      {type: 'text', label: 'Tax Code', name: 'taxCode', placeholder: 'Tax Code', required: true},
      {
        type: 'dropdown',
        topLabel: 'Category',
        placeholder: 'Select Category',
        label: 'categoryId',
        name: categoryData?.results,
        required: true,
        labelKey: 'name',
      },
    ],
    [categoryData]
  )
  const updateFields = useMemo(
    () => [
      {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},
      {type: 'text', label: 'Tax Code', name: 'taxCode', placeholder: 'Tax Code'},

      {
        type: 'dropdown',
        topLabel: 'Category',
        placeholder: 'Select Category',
        label: 'categoryId',
        name: categoryData?.results,
        required: true,
      },
    ],
    [categoryData]
  )
  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['subCategories', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchSubCategory({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })

  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const onDeleteSubCategory = async (id: string) => {
    const res = await delSubCategory(id)
    if (!res) {
      return
    }
    refetch()
  }
  const handleApplyFilter = (newFilters: subCategoryFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateSubCategory = async (payload: subCategoryCreatePayload) => {
    setIsCreateModalOpen(false)
    const res = await createSubCategory(payload)
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }
  const handleEditSubCategory = async (payload: subCategoryUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    setIsUpdateModalOpen(false)
    const res = await updateSubCategory(payload, selectedData.id)
    if (!res) {
      setIsUpdateModalOpen(false)
      return
    }
    refetch()
  }

  const fetchUserDataIfNeeded = useCallback(() => {
    if (categoryStatus !== 'succeeded') {
      fetchCategoryType({})
    }
  }, [])

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const defaultValues: subCategoryApiResponse | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData.name,
      categoryId: selectedData.categoryId,
      createdAt: selectedData.createdAt,
      updatedAt: selectedData.updatedAt,
      id: selectedData.id,
      taxCode: selectedData.taxCode,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Sub Categories
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label='Filter'
                Icon={AiOutlineFilter}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
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
            <SkeletonTable title='Sub Category' />
          ) : (
            <Table
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data?.results}
              handleDelete={onDeleteSubCategory}
              topicName='Sub Category'
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            totalResults={data?.totalResults || 0}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Sub Category'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>

      {isCreateModalOpen && (
        <DynamicModal
          label='Create New Sub Category'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateSubCategory}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Sub Category'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditSubCategory}
        />
      )}
    </>
  )
}

const SubCategory: React.FC = () => {
  return (
    <DashboardWrapper customComponent={Custom} selectedItem={'/sub-category'}></DashboardWrapper>
  )
}

export default SubCategory
