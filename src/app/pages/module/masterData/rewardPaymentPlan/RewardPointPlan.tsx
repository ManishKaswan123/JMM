import React, {useState, useMemo} from 'react'
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
import {createRewardPlan, deleteRewardPlan, fetchRewardPlan} from 'sr/utils/api/rewardPointPlanApi'
import RewardPointPlanTable from './RewardPointPlanTable'

interface RewardPlanFilters {
  isActive?: boolean
}
interface RewardPlanPayload {
  maxDiscountPercentage: number
  maxDiscountValue: number
  maxEarnedPercentage: number
  maxEarnedValue: number
  minOrderValue: number
  defaultValue: number
  defaultExpiryDays: number
  planName: string
  planDetails?: string
  isDefault: boolean
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<RewardPlanFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)

  const isActive = [
    {id: true, name: 'Active'},
    {id: false, name: 'Inactive'},
  ]
  const isDefault = useMemo(
    () => [
      {id: true, name: 'Yes'},
      {id: false, name: 'No'},
    ],
    []
  )

  const fields: FieldsArray = [
    {
      type: 'dropdown',
      label: 'isActive',
      name: isActive,
      topLabel: 'Status',
      placeholder: 'Select Status',
    },
    {
      type: 'dropdown',
      label: 'isDefault',
      name: isDefault,
      topLabel: 'Is Default',
      placeholder: 'Select Is Default',
    },
    {
      type: 'text',
      label: 'Plan Name',
      name: 'planName',
      placeholder: 'Plan Name',
    },
  ]
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Plan Name',
        name: 'planName',
        placeholder: 'Plan Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Plan Details',
        name: 'planDetails',
        placeholder: 'Plan Details',
      },
      {
        type: 'number',
        label: 'Max Discount Amount',
        name: 'maxDiscountValue',
        placeholder: 'Max Discount Amount',
        required: true,
      },
      {
        type: 'number',
        label: 'Max Earned Amount',
        name: 'maxEarnedValue',
        placeholder: 'Max Earned Amount',
        required: true,
      },

      {
        type: 'number',
        label: 'Min Order Amount',
        name: 'minOrderValue',
        placeholder: 'Min Order Amount',
        required: true,
      },
      {
        type: 'number',
        label: 'Max Discount Percentage',
        name: 'maxDiscountPercentage',
        placeholder: 'Max Discount Percentage',
        required: true,
      },
      {
        type: 'number',
        label: 'Max Earnerd Percentage',
        name: 'maxEarnedPercentage',
        placeholder: 'Max Earned Percentage',
        required: true,
      },
      {
        type: 'number',
        label: 'Initial Reward',
        name: 'defaultValue',
        placeholder: 'Initial Reward',
        required: true,
      },
      {
        type: 'number',
        label: 'Expiry Days',
        name: 'defaultExpiryDays',
        placeholder: 'Expiry Days',
        required: true,
      },
      {
        type: 'checkbox',
        label: 'Is Default',
        name: 'isDefault',
      },
    ],
    []
  )
  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['rewardPointPlan', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchRewardPlan({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })

  const onDeleteRewardPlan = async (id: string) => {
    const res = await deleteRewardPlan(id)
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
    const res = await createRewardPlan(payload)
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
              Reward Point Plan
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
            <RewardPointPlanTable data={data?.results} onDelete={onDeleteRewardPlan} />
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
            name='Reward Point Plan'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Reward Point Plan'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateRewardPlan}
        />
      )}
    </>
  )
}
const RewardPointPlan: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/reward-point-plan'}
      ></DashboardWrapper>
    </>
  )
}

export default RewardPointPlan
