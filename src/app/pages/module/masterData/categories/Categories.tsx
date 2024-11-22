import React, {useMemo, useState} from 'react'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import Table from 'sr/helpers/ui-components/dashboardComponents/Table'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {deleteCategory} from 'sr/utils/api/deleteCategory'
import {fetchCategory} from 'sr/utils/api/fetchCategory'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {createCategory} from 'sr/utils/api/createCategory'
import {updateCategory} from 'sr/utils/api/updateCategory'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {getPreSignedURL} from 'sr/utils/api/media'
import {useQuery} from '@tanstack/react-query'
import SkeletonTable from 'sr/helpers/ui-components/dashboardComponents/SkeletonTable'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'

interface categoryApiResponse {
  name: string
  imagePath?: string
  createdAt: string
  updatedAt: string
  id: string
  taxCode?: string
}
interface categoryFilters {
  name?: string
}
interface fetchCategoryResponse {
  results: categoryApiResponse[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}
interface categoryCreatePayload {
  name: string
  imagePath: string
  taxCode?: string
}
interface categoryUpdatePayload extends Omit<categoryCreatePayload, 'taxCode'> {}

const Custom: React.FC = () => {
  const [filters, setFilters] = useState<categoryFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<categoryApiResponse>()
  const fields: FieldsArray = [{type: 'text', label: 'Name', name: 'name', placeholder: 'Name'}]

  const createFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},
      {type: 'text', label: 'Tax Code', name: 'taxCode', placeholder: 'Tax Code', required: true},
      {
        type: 'file',
        label: 'Images',
        name: 'imagePath',
        wrapperLabel: 'Upload image',
        topLabel: 'Images',
        placeholder: 'Select Images',
        required: true,
      },
    ],
    []
  )
  const updateFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},

      {
        type: 'file',
        label: 'Images',
        name: 'imagePath',
        wrapperLabel: 'Upload image',
        topLabel: 'Images',
        placeholder: 'Select Images',
        required: true,
      },
    ],
    []
  )
  const {data, error, isLoading, isError, refetch} = useQuery<fetchCategoryResponse>({
    queryKey: ['categories', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchCategory({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleView = async (fileUrl: string | undefined) => {
    if (!fileUrl) return
    const response: any = await getPreSignedURL({fileName: fileUrl})
    window.open(response.results.url.toString(), '_blank')
  }

  const onDeleteCategory = async (id: string) => {
    // setLoading(true)
    const res = await deleteCategory(id)
    if (!res) {
      // setLoading(false)
      return
    }

    // setLoading(false)
    refetch()
  }
  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const handleCreateCategory = async (payload: categoryCreatePayload) => {
    // setLoading(true)
    // setLoading(false)
    setIsCreateModalOpen(false)
    const res = await createCategory(payload)
    if (!res) {
      // setLoading(false)
      setIsCreateModalOpen(false)
      return
    }

    refetch()
  }

  const handleEditCategory = async (payload: categoryUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }

    setIsUpdateModalOpen(false)
    const res = await updateCategory(payload, selectedData.id)
    if (!res) {
      setIsUpdateModalOpen(false)
      return
    }

    refetch()
  }

  const defaultValues: categoryApiResponse | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData?.name,
      imagePath: selectedData?.imagePath,
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
              Categories
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
            <SkeletonTable title={'Category'} />
          ) : (
            <Table
              handleView={handleView}
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data?.results}
              handleDelete={onDeleteCategory}
              topicName='Category'
            />
          )}
        </div>
        {/* Conditional rendering of Pagination component */}
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
            totalResults={data?.totalResults || 0}
            itemsPerPage={itemsPerPage}
            name='Category'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          imageType='imagePath'
          label='Create Category'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateCategory}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          imageType='imagePath'
          label='Update Category'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCategory}
        />
      )}
    </>
  )
}
const Categories: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem={'/category'}></DashboardWrapper>
}

export default Categories
