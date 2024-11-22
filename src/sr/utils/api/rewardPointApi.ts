import {get, remove, post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  isActive?: boolean
  userId?: string
}
export interface rewardPointApiResponse {
  maxValue: number
  details: string
  expiryDate: string
  rewardPointPlanId: string
  userId: string
  createdBy: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  isExpired: boolean
  id: string
}
interface fetchRewardPointResponse {
  status: string
  results: rewardPointApiResponse[]
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

export const fetchReward = async (payload?: PayloadType): Promise<fetchRewardPointResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchRewardPointResponse>(`/reward-point`, filteredPayload)

    if (res.status === 'success' && res.results && res.results.length > 0) {
      return res // Return the fetched data
    } else {
      return {} as fetchRewardPointResponse
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const createReward = async (payload: any) => {
  try {
    const res = await post<any>('/reward-point', payload)
    if (res) {
      toast.success('Reward Point created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}

export const deleteReward = async (payload: string) => {
  try {
    const res = await remove<any>(`/reward-point/${payload}`)
    toast.success('Reward Point deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
