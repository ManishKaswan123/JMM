import {get, remove, post, patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
interface PayloadType {
  sortBy?: string
  projectBy?: string
  limit?: number
  page?: number
  isActive?: boolean
  isDefault?: boolean
  populate?: string
  planName?: string
  createdBy?: string
}
export interface rewardPointPlanApiResponse {
  maxDiscountValue: number
  maxDiscountPercentage: number
  minDiscountValue?: number
  maxEarnedPercentage: number
  maxEarnedValue: number
  minOrderValue: number
  defaultValue: string
  defaultExpiryDays: number
  planName: string
  planDetails?: string
  createdBy: string
  isDefault?: boolean
  isActive?: boolean
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchRewardPointPlanResponse {
  status: string
  results: rewardPointPlanApiResponse[]
  page?: number
  limit?: number
  totalPages?: number
  totalResults?: number
}
const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchRewardPlan = async (
  payload?: PayloadType
): Promise<fetchRewardPointPlanResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchRewardPointPlanResponse>(`/reward-point-plan`, filteredPayload)

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

export const createRewardPlan = async (payload: any) => {
  try {
    const res = await post<any>('/reward-point-plan', payload)
    if (res) {
      toast.success('Reward Plan created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}

export const deleteRewardPlan = async (payload: string) => {
  try {
    const res = await remove<any>(`/reward-point-plan/${payload}`)
    toast.success('Reward Plan deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
export const updateUser = async (userId: string, payload: Record<string, any>) => {
  try {
    const res = await patch<any>(`/users/${userId}`, payload)
    if (res && res.user) {
      toast.success('User updated successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
