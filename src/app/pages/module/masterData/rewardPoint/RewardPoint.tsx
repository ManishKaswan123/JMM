import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import RewardPointTable from './RewardPointTable'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useQuery} from '@tanstack/react-query'
import SkeletonRewardPointTable from './SkeletonRewardPoint'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {createReward, deleteReward, fetchReward} from 'sr/utils/api/rewardPointApi'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

interface RewardPlanFilters {
  sortBy?: string
  projectBy?: string
  populate?: string
  limit?: number
  page?: number
  userId?: string
  createdBy?: string
  isActive?: boolean
}
interface RewardPlanPayload {
  amount: number
  details?: string
  expiryDate?: string
  userId: string
  isActive?: boolean
}

const RewardPoint: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<RewardPlanFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const userData = useSelector((state: RootState) => state.user.data)
  const {fetchUserData, fetchRewardPlanMap} = useActions()
  const userStatus = useSelector((state: RootState) => state.user.status)

  const isActive = useMemo(
    () => [
      {id: true, name: 'Active'},
      {id: false, name: 'Inactive'},
    ],
    []
  )

  const fields = useMemo(
    () => [
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

      {
        type: 'dropdown',
        label: 'isActive',
        name: isActive,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
    ],
    [userData?.results, isActive]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'number',
        label: 'Amount',
        name: 'amount',
        placeholder: 'Amount',
        required: true,
      },
      {
        type: 'text',
        label: 'Details',
        name: 'details',
        placeholder: 'Details',
      },

      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        labelKey: 'firstName',
        required: true,
      },
      // {
      //   type: 'dropdown',
      //   label: 'isActive',
      //   name: isActive,
      //   topLabel: 'Status',
      //   placeholder: 'Select Status',
      // },
      {
        type: 'datetime-local',
        label: 'Expiry Date',
        name: 'expiryDate',
        placeholder: 'Expiry Date',
      },
    ],
    [userData?.results]
  )

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') fetchUserData({})
    // if (rewardPlanMapStatus !== 'succeeded') fetchRewardPlanMap({})
  }, [userStatus, fetchUserData])

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [fetchUserDataIfNeeded])

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['rewardPoint', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchReward({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })

  const onDeleteRewardPlan = async (id: string) => {
    const res = await deleteReward(id)
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

  const handleApplyFilter = (newFilters: RewardPlanFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateRewardPlan = async (payload: RewardPlanPayload) => {
    setIsCreateModalOpen(false)
    const res = await createReward(payload)
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Reward Earning
            </h2>
            <div className='flex items-center'>
              <Button
                label='Give Reward'
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
            <SkeletonRewardPointTable />
          ) : (
            <RewardPointTable data={data?.results} onDelete={onDeleteRewardPlan} />
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
            name='Reward Point'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Give Reward'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateRewardPlan}
        />
      )}
    </>
  )
}

export default RewardPoint
