import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {EightySixApiResponse, fetch86} from 'sr/utils/api/fetch86'
import {delete86} from 'sr/utils/api/delete86'
import EightSixTable from './86Table'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {create86} from 'sr/utils/api/create86'
import {update86} from 'sr/utils/api/update86'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonEightySixTable from './Skeleton86Table'

interface EightySixFilters {
  title?: string
  status?: string
  neUserId?: string
  userId?: string
  id?: string
  sortBy?: string
  isPublished?: boolean
  removeExpired?: boolean
}

interface EightySixPayload {
  title: string
  description: string
  businessType: string[]
  category: string[]
  hashtags: string[]
  // location: any
  images: string[]
  isPublished: boolean
  quantity: string
  userId: string
  timeframe: string
  isWillingToPay: boolean
  // address: any
  countryCode: string
  delivery: number
  radius: number
  status: string
}
interface defaultData
  extends Omit<
    EightySixApiResponse,
    'id' | 'location' | 'address' | 'businessType' | 'category' | 'hashtags' | 'images' | 'userId'
  > {
  countryCode?: string
  businessType?: string
  category?: string
  hashtags?: string
  images?: string
  userId?: string
}

const EightSix: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<EightySixFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [selectedData, setSelectedData] = useState<EightySixApiResponse>()
  const businessTypeData = useSelector((state: RootState) => state.businessType.data)
  const categoryData = useSelector((state: RootState) => state.categoryType.data)
  const businessTypeStatus = useSelector((state: RootState) => state.businessType.status)
  const categoryStatus = useSelector((state: RootState) => state.categoryType.status)
  const {fetchUserData, fetchCategoryType} = useActions()

  const status = useMemo(
    () => [
      {name: 'Published', id: '1'},
      {name: 'Draft', id: '2'},
      {name: 'Pending', id: '3'},
      {name: 'Sold', id: '4'},
    ],
    []
  )
  const isPublished = useMemo(
    () => [
      {id: true, name: 'Yes'},
      {id: false, name: 'No'},
    ],
    []
  )

  const removeExpired = useMemo(
    () => [
      {id: true, name: 'Yes'},
      {id: false, name: 'No'},
    ],
    []
  )

  const fields = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'isPublished',
        name: isPublished,
        topLabel: 'Is Published',
        placeholder: 'Select',
      },
      {type: 'text', label: 'Title', name: 'title', placeholder: 'Title'},
      {
        type: 'dropdown',
        label: 'removeExpired',
        name: removeExpired,
        topLabel: 'Remove Expired',
        placeholder: 'Select',
      },
      {type: 'text', label: 'Status', name: 'status', placeholder: 'Status'},
      {type: 'text', label: 'NeUserId', name: 'neUserId', placeholder: 'NeUserId'},
      {type: 'text', label: 'ID', name: 'id', placeholder: 'ID'},
      {type: 'text', label: 'Sort By', name: 'sortBy', placeholder: 'Sort By'},
      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        labelKey: 'firstName',
      },
    ],
    [userData?.results]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Title', name: 'title', placeholder: 'Title', required: true},
      {
        type: 'text',
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
        required: true,
      },
      {
        type: 'text',
        label: 'Quantity',
        name: 'quantity',
        topLabel: 'Quantity',
        placeholder: 'Quantity',
        required: true,
      },
      {
        type: 'text',
        label: 'Time Frame',
        name: 'timeframe',
        placeholder: 'Time Frame',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'category',
        name: categoryData?.results,
        topLabel: 'Category',
        placeholder: 'Select Category',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'hashtags',
        name: categoryData?.results,
        topLabel: 'Hashtags',
        placeholder: 'Select Hashtags',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'status',
        name: status,
        topLabel: 'Status',
        placeholder: 'Select Status',
        required: true,
      },
      {
        type: 'checkbox',
        label: 'Is Willing To Pay',
        name: 'isWillingToPay',
      },
      {
        type: 'checkbox',
        label: 'Is Published',
        name: 'isPublished',
      },
      {
        type: 'file',
        label: 'Images',
        name: 'images',
        wrapperLabel: 'Upload image',
        topLabel: 'Images',
        placeholder: 'Select Images',
        required: true,
      },
    ],
    [userData?.results, categoryData?.results]
  )
  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['86Request', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetch86({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') fetchUserData({})
    if (categoryStatus !== 'succeeded') fetchCategoryType({})
  }, [userStatus, businessTypeStatus, categoryStatus, fetchUserData, fetchCategoryType])

  const handleApplyFilter = (newFilters: EightySixFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const onPageChange = async (pageNumber: number) => {
    // setLoading(true)
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleCreateEightSixItem = async (payload: EightySixPayload) => {
    setIsCreateModalOpen(false)
    const res = await create86({
      ...payload,
      businessType: [payload.businessType],
      category: [payload.category],
      hashtags: [payload.hashtags],
      location: {},
      address: {countryCode: payload.countryCode},
    })
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }
  const handleEditEightSixItem = async (payload: EightySixPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    setIsUpdateModalOpen(false)
    const res = await update86(
      {
        ...payload,
        businessType: [payload.businessType],
        category: [payload.category],
        hashtags: [payload.hashtags],
        location: {},
        address: {countryCode: payload.countryCode},
      },
      selectedData.id
    )
    if (!res) {
      setIsUpdateModalOpen(false)
      return
    }
    refetch()
  }

  const onDeleteEightySixItem = async (id: string) => {
    const res = await delete86(id)
    if (!res) {
      return
    }
    refetch()
  }

  const defaultData: defaultData | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      title: selectedData.title,
      description: selectedData.description,
      businessType: selectedData.businessType?.[0],
      category: selectedData.category?.[0],
      hashtags: selectedData.hashtags?.[0],
      images: selectedData.images?.[0],
      isPublished: selectedData.isPublished,
      quantity: selectedData.quantity,
      timeframe: selectedData.timeframe,
      isWillingToPay: selectedData.isWillingToPay,
      countryCode: selectedData.address?.countryCode,
      delivery: selectedData.delivery,
      radius: selectedData.radius,
      status: selectedData.status,
      userId: selectedData.userId?.id,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>86 Orders</h2>
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
            <SkeletonEightySixTable />
          ) : (
            <EightSixTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              eightSixItems={data?.results}
              onDelete={onDeleteEightySixItem}
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            totalResults={data?.totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='86'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          imageType='images'
          label='Create 86 items'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateEightSixItem}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          imageType='images'
          label='Update 86 items'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={defaultData}
          onSubmit={handleEditEightSixItem}
        />
      )}
    </>
  )
}

export default EightSix
