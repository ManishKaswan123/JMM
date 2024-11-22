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
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import ApiResponse from './components/86ResponseTypes'
import {
  fetch86Response,
  create86Response,
  delete86Response,
  update86Response,
} from 'sr/utils/api/86Response'
import EightSixResponseTable from './components/86ResponseTable'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonEightySixResponseTable from './components/Skeleton86ResponseTable'

interface EightySixResponseFilters {
  eightSix?: string
  senderId?: string
  receiverId?: string
}

interface EightySixResponsePayload {
  eightySix: string
  senderId: string
  receiverId: string
  deliveryType: number
  message: string
  location?: Record<string, any>
  status: number
  offerAmount: number
}

interface defaultData {
  eightySix?: string
  senderId?: string
  receiverId?: string
  deliveryType?: number
  message?: string
  status?: number
  offerAmount?: number
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<EightySixResponseFilters>({})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [selectedData, setSelectedData] = useState<ApiResponse>()
  const userData = useSelector((state: RootState) => state.user.data)
  const userDataStatus = useSelector((state: RootState) => state.user.status)
  const eightySixReduxState = useSelector((state: RootState) => state.eightySix)
  const {fetchUserData, fetch86Action} = useActions()

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['86Response', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetch86Response({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userDataStatus !== 'succeeded') fetchUserData({})
    if (eightySixReduxState.status !== 'succeeded') fetch86Action()
  }, [userDataStatus, fetchUserData, fetch86Action, eightySixReduxState.status])

  const filterFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'eightySix',
        name: eightySixReduxState.data,
        topLabel: 'Eighty Six',
        placeholder: 'Select Eighty Six',
        labelKey: 'title',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'senderId',
        name: userData?.results,
        topLabel: 'Sender',
        placeholder: 'Select Sender',
        labelKey: 'firstName',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'receiverId',
        name: userData?.results,
        topLabel: 'Receiver',
        placeholder: 'Select Receiver',
        labelKey: 'firstName',
        id: 'id',
      },
    ],
    [userData?.results, eightySixReduxState.data]
  )
  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'eightySix',
        name: eightySixReduxState.data,
        topLabel: 'Eighty Six',
        placeholder: 'Select Eighty Six',
        labelKey: 'title',
        id: 'id',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'senderId',
        name: userData?.results,
        topLabel: 'Sender',
        placeholder: 'Select Sender',
        required: true,
        labelKey: 'firstName',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'receiverId',
        name: userData?.results,
        topLabel: 'Receiver',
        placeholder: 'Select Receiver',
        required: true,
        labelKey: 'firstName',
        id: 'id',
      },
      {
        type: 'number',
        label: 'Delivery Type',
        name: 'deliveryType',
        placeholder: 'Delivery Type',
        required: true,
      },

      {
        type: 'text',
        label: 'Message',
        name: 'message',
        placeholder: 'Message',
        required: true,
      },
      {
        type: 'number',
        label: 'Status',
        name: 'status',
        placeholder: 'Status',
        required: true,
      },
      {
        type: 'number',
        label: 'Offer Amount',
        name: 'offerAmount',
        placeholder: 'Offer Amount',
        required: true,
      },
    ],
    [userData?.results, eightySixReduxState.data]
  )

  const handleApplyFilter = (newFilters: EightySixResponseFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleCreateEightSixItem = async (payload: EightySixResponsePayload) => {
    setIsCreateModalOpen(false)
    const res = await create86Response({...payload, location: {}})
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }

  const handleEditEightySixResponse = async (payload: EightySixResponsePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    setIsUpdateModalOpen(false)
    const res = await update86Response({...payload, location: {}}, selectedData.id)
    if (!res) {
      setIsUpdateModalOpen(false)
      return
    }
    refetch()
  }

  const onDeleteEightySixResponse = async (id: string) => {
    const res = await delete86Response(id)
    if (!res) {
      return
    }
    refetch()
  }

  const defaultData: defaultData | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      eightySix: selectedData.eightySix?.id,
      senderId: selectedData.senderId?.id,
      receiverId: selectedData.receiverId?.id,
      deliveryType: selectedData.deliveryType,
      message: selectedData.message,
      status: selectedData.status,
      offerAmount: selectedData.offerAmount,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              86 Response
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
                preFilters={filters}
                fields={filterFields}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonEightySixResponseTable />
          ) : (
            <EightSixResponseTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              eightySixResponseItems={data?.results}
              onDelete={onDeleteEightySixResponse}
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
            name='86 Response'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          // imageType='imagePath'
          label='Create 86 Response'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateEightSixItem}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          // imageType='imagePath'
          label='Update 86 response'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultData}
          onSubmit={handleEditEightySixResponse}
        />
      )}
    </>
  )
}
const EightySixResponse: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/86Response'}></DashboardWrapper>
    </>
  )
}

export default EightySixResponse
