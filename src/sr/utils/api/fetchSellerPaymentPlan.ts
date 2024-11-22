import {get} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import {UserInterface} from 'sr/constants/User'

interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  planName?: string
  isActive?: boolean
}
interface sellerPaymentPlanApiResponse {
  settlementDays?: number
  convenienceFee?: number
  planName?: string
  planDetails?: string
  createdBy?: UserInterface
  isActive?: boolean
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchSellerPaymentPlanResponse {
  results: sellerPaymentPlanApiResponse[]
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

export const fetchPaymentPlan = async (
  payload?: PayloadType
): Promise<fetchSellerPaymentPlanResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchSellerPaymentPlanResponse>(`/seller-payment-plan`, filteredPayload)

    if (res.results && res.results.length > 0) {
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
