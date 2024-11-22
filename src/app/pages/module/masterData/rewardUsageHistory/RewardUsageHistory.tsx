import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useQuery} from '@tanstack/react-query'
import SkeletonPaymentPlanTable from './SkeletonPaymentPlanTable'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {
  createRewardUsage,
  deleteRewardUsage,
  fetchRewardUsage,
} from 'sr/utils/api/rewardUsageHistory'
import RewardUsageHistoryTable from './RewardUsageHistoryTable'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {fetchReward} from 'sr/utils/api/rewardPointApi'
import {fetchOrder} from 'sr/utils/api/fetchOrder'

export interface RewardUsageFilters {
  sortBy?: string
  projectBy?: string
  populate?: string
  limit?: number
  page?: number
  isActive?: boolean
  orderId?: string
  userId?: string
  createdBy?: string
}
interface RewardUsagePayload {
  amount: number
  remarks?: string
  orderId: string
  userId: string
  rewardPointId: string
}
interface UserRewardPoints {
  details: string
  id: string
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<RewardUsageFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  // const rewardPointData = useSelector((state: RootState) => state.rewardPointMap.data)
  // const rewardPointMapStatus = useSelector((state: RootState) => state.rewardPointMap.status)
  const {fetchUserData, fetchRewardPointMap} = useActions()
  const [selectedUser, setSelectedUser] = useState<string | undefined>()
  const [userRewardPoints, setUserRewardPoints] = useState<UserRewardPoints[]>(
    [] as UserRewardPoints[]
  )
  const [userOrders, setUserOrders] = useState<any[]>([])

  const isActive = useMemo(
    () => [
      {id: true, name: 'Active'},
      {id: false, name: 'Inactive'},
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'isActive',
        name: isActive,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        labelKey: 'firstName',
      },
      {
        type: 'dropdown',
        label: 'createdBy',
        name: userData?.results,
        topLabel: 'Created By',
        placeholder: 'Select Created By',
        labelKey: 'firstName',
      },
    ],
    [userData?.results, isActive]
  )
  const createFields: FieldsArray = useMemo(() => {
    const fields = [
      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        labelKey: 'firstName',
        required: true,
        onChange: (e: any) => setSelectedUser(e.target.value),
      },
      {
        type: 'number',
        label: 'Amount',
        name: 'amount',
        placeholder: 'Amount',
        required: true,
      },
      {
        type: 'text',
        label: 'Remarks',
        name: 'remarks',
        placeholder: 'Remarks',
      },
    ]

    if (selectedUser) {
      fields.push(
        {
          type: 'dropdown',
          label: 'rewardPointId',
          name: userRewardPoints,
          topLabel: 'Reward Point',
          placeholder: 'Select Reward Point',
          labelKey: 'details',
          required: true,
          onChange: () => {},
        },
        {
          type: 'dropdown',
          label: 'orderId',
          name: userOrders,
          topLabel: 'Order',
          placeholder: 'Select Order',
          labelKey: 'title',
          required: true,
          onChange: () => {},
        }
      )
    }

    return fields
  }, [userData?.results, userRewardPoints, userOrders, selectedUser])

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: [
      'rewardUsageHistory',
      {limit: itemsPerPage, page: currentPage, populate: 'rewardPointId', ...filters},
    ],
    queryFn: async () => fetchRewardUsage({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
    // if (rewardPointMapStatus !== 'succeeded') {
    //   fetchRewardPointMap({})
    // }
  }, [userStatus, fetchUserData])
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [fetchUserDataIfNeeded])

  const onDeleteRewardUsage = async (id: string) => {
    const res = await deleteRewardUsage(id)
    if (!res) {
      return
    }
    refetch()
  }
  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: RewardUsageFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateRewardPlan = async (payload: RewardUsagePayload) => {
    onCloseModal()
    const res = await createRewardUsage(payload)
    if (!res) {
      onCloseModal()
      return
    }
    refetch()
  }
  const onCloseModal = () => {
    setIsCreateModalOpen(false)
    setSelectedUser(undefined)
    setUserRewardPoints([] as UserRewardPoints[])
    setUserOrders([])
  }

  useEffect(() => {
    if (selectedUser) {
      fetchReward({
        userId: selectedUser,
        projectBy: 'details',
      }).then((response) => {
        setUserRewardPoints(response.results)
      })
    }
  }, [selectedUser])
  useEffect(() => {
    if (selectedUser) {
      fetchOrder({
        userId: selectedUser,
      }).then((response) => {
        setUserOrders(response.results)
      })
    }
  }, [selectedUser])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Reward Transaction
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
            <SkeletonPaymentPlanTable />
          ) : (
            <RewardUsageHistoryTable data={data?.results} onDelete={onDeleteRewardUsage} />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
            totalResults={data?.totalResults}
            itemsPerPage={itemsPerPage}
            name='Reward Usage History'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Reward Point Plan'
          isOpen={isCreateModalOpen}
          onClose={onCloseModal}
          fields={createFields}
          onSubmit={handleCreateRewardPlan}
        />
      )}
    </>
  )
}
const RewardUsageHistory: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/reward-uses-history'}
      ></DashboardWrapper>
    </>
  )
}

export default RewardUsageHistory
