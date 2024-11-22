// import ApiResponse from 'sr/models/ApiResponse'
import {get} from 'sr/utils/axios/index'
// import {alertService} from 'sr/utils/services/alert.service'
// import {toast} from 'react-toastify'

interface payloadType {
  limit?: Number
  page?: Number
  name?: string
}
interface businessTypeApiResponse {
  name?: string
  imagePath?: string
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchBusinessCategoryResponse {
  results: businessTypeApiResponse[]
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

export const fetchBusinessCategory = async (
  payload?: payloadType
): Promise<fetchBusinessCategoryResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchBusinessCategoryResponse>(`/business-categories`, filteredPayload)

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
