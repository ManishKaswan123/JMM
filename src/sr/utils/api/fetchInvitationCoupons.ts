import {get} from 'sr/utils/axios/index'
import {UserInterface} from 'sr/constants/User'

interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  isActive?: boolean
  title?: string
  code?: string
  createdBy?: string
}
interface invitationCodeApiResponse {
  title?: string
  descriptions?: string
  noOfTimeUsed?: number
  noOfTimeUses?: number
  code?: string
  expiryDate?: string
  createdBy?: UserInterface
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  id: string
}
interface fetchInvitationCouponResponse {
  results: invitationCodeApiResponse[]
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

export const fetchInvitationCoupon = async (
  payload?: PayloadType
): Promise<fetchInvitationCouponResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchInvitationCouponResponse>(`/seller-invitation-code`, filteredPayload)

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
