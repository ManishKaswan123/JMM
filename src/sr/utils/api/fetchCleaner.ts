import {get} from 'sr/utils/axios/index'

interface Address {
  address_line_1: string
  address_line_2: string
  street: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
  _id: string
}

export interface CleanerDetails {
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  date_of_birth: string
  user_id: string
  status: string
  createdAt: string
  updatedAt: string
  address: Address
  id: string
}

interface CleanerPagination {
  total: number
  page: number
  pageSize: number
  sort: Record<string, number>
}

interface FetchCleanerResponse {
  success: boolean
  data: CleanerDetails[]
  pagination: CleanerPagination
}
interface FetchSingleCleanerResponse {
  success: boolean
  data: CleanerDetails
  pagination: CleanerPagination
}

export interface CleanerFilters {
  limit?: number
  page?: number
  sortBy?: string
  status?: string
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

    if (res.data && res.data.length > 0) {
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

    if (res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
