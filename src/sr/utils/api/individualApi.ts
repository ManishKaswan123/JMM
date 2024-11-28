import {get, post} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
}

export interface Individual {
  username: string
  comapanyId?: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  status: string
  user_id: string
  address?: string
  createdAt: string
  updatedAt: string
  id: string
}
export type IndividaulApiResponse = JmmApiResponse<Individual[]>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchIndividual = async (payload: PayloadType): Promise<IndividaulApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<IndividaulApiResponse>(`/individual`, filteredPayload)

    if (res.success && res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const createIndividual = async (payload: any) => {
  try {
    const res = await post<any>('/individual', payload)
    if (res.success === 'true') {
      toast.success('Individual created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
