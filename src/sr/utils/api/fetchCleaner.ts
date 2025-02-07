import {get} from 'sr/utils/axios/index'
import {JmmApiResponse, Status} from './globalInterface'
import {Address} from './addressApi'

export interface CleanerDetails {
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  date_of_birth: string
  user_id: string
  status: Status
  createdAt: string
  updatedAt: string
  address: Address
  id: string
}

export type FetchCleanerResponse = JmmApiResponse<CleanerDetails[]>
export type FetchSingleCleanerResponse = JmmApiResponse<CleanerDetails>
export interface CleanerFilters {
  limit?: number
  page?: number
  sortBy?: string
  status?: Status
}

const filterPayload = (payload: CleanerFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchCleaner = async (payload: CleanerFilters): Promise<FetchCleanerResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchCleanerResponse>(`/cleaner`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleCleaner = async (id: string): Promise<FetchSingleCleanerResponse> => {
  try {
    const res = await get<FetchSingleCleanerResponse>(`/cleaner`, {id})

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
