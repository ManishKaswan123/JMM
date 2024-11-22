import {get} from 'sr/utils/axios/index'

interface payloadType {
  limit?: Number
  page?: Number
  name?: string
}
interface categoryApiResponse {
  name: string
  imagePath?: string
  createdAt: string
  updatedAt: string
  id: string
  taxCode?: string
}
interface fetchCategoryResponse {
  results: categoryApiResponse[]
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
export const fetchCategory = async (payload?: payloadType): Promise<fetchCategoryResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<fetchCategoryResponse>(`/categories`, filteredPayload)

    if (res.results) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('Invalid response structure')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
