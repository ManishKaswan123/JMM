// import ApiResponse from 'sr/models/ApiResponse'
import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
// import {alertService} from 'sr/utils/services/alert.service'
// import {toast} from 'react-toastify'

interface payloadType {
  limit?: Number
  page?: Number
  name?: string
}

export interface BusinessType {
  type: string
  company_count: number
  createdAt: string
  updatedAt: string
  id: string
}
export type BusinessTypeApiResponse = JmmApiResponse<BusinessType[]>

const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchBusinessCategory = async (
  payload?: payloadType
): Promise<BusinessTypeApiResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<BusinessTypeApiResponse>(`/businesstype`, filteredPayload)

    if (res.success && res.data && res.data.length > 0) {
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
