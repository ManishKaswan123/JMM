import {get} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface payloadType {
  limit?: Number
  page?: Number
  name?: string
  categoryId?: string
}
interface subCategoryApiResponse {
  name: string
  categoryId?: string
  taxCode: string
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchSubCategoryResponse {
  results: subCategoryApiResponse[]
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

export const fetchSubCategory = async (
  payload?: payloadType
): Promise<fetchSubCategoryResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchSubCategoryResponse>(`/sub-categories`, filteredPayload)

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
