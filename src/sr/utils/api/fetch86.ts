import {UserInterface} from 'sr/constants/User'
import {get} from 'sr/utils/axios/index'

interface payloadType {
  limit?: Number
  page?: Number
  getAll?: Boolean
  removeExpired?: Boolean
  status?: string
  neUserId?: String
  id?: String
  sortBy?: String
  projectBy?: String
  userId?: String
  isPublished?: Boolean
  title?: String
}

export interface EightySixApiResponse {
  location?: any
  userId?: UserInterface | null
  title?: string
  description?: string
  hashtags?: string[]
  images?: string[]
  category?: string[]
  businessType?: string[]
  address?: any
  timeframe?: string
  delivery?: number
  radius?: number
  status?: string
  createdAt?: string
  updatedAt?: string
  isPublished?: boolean
  isWillingToPay?: boolean
  quantity?: string
  id: string
}

export interface fetch86ApiResponse {
  results: EightySixApiResponse[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetch86 = async (payload: payloadType): Promise<fetch86ApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<fetch86ApiResponse>(`/86-request`, filteredPayload)

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
