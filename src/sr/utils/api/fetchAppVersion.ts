import {get} from 'sr/utils/axios/index'

interface PayloadType {
  limit?: number
  page?: number
  title?: string
  code?: number
  sortBy?: string
  projectBy?: string
  isActive?: boolean
}
interface appVersionHistoryApiResponse {
  title?: string
  descriptions?: string
  code?: number
  isForceUpdate?: boolean
  isActive?: boolean
  platform?: string
  link?: string
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchAppVersionResponse {
  results: appVersionHistoryApiResponse[]
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

export const fetchAppVersion = async (payload?: PayloadType): Promise<fetchAppVersionResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchAppVersionResponse>(`/mobile-app-version-history`, filteredPayload)

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
