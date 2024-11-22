import {get, remove, post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import {RewardUsageFilters} from 'app/pages/module/masterData/rewardUsageHistory/RewardUsageHistory'
import {rewardPointApiResponse} from './rewardPointApi'
export interface rewardUsageApiResponse {
  amount: number
  remarks?: string
  orderId: string
  userId: string
  rewardPointId: rewardPointApiResponse
  createdBy: string
  isActive?: boolean
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchRewardUsageResponse {
  status: string
  results: rewardUsageApiResponse[]
  page?: number
  limit?: number
  totalPages?: number
  totalResults?: number
}
const filterPayload = (payload: RewardUsageFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchRewardUsage = async (
  payload?: RewardUsageFilters
): Promise<fetchRewardUsageResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchRewardUsageResponse>(`/reward-point-uses-history`, filteredPayload)

    if (res.status === 'success' && res.results && res.results.length > 0) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No data found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const createRewardUsage = async (payload: any) => {
  try {
    const res = await post<any>('/reward-point-uses-history', payload)
    if (res) {
      toast.success('Reward Usage History created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}

export const deleteRewardUsage = async (payload: string) => {
  try {
    const res = await remove<any>(`/reward-point-uses-history/${payload}`)
    toast.success('Reward Usage History deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
