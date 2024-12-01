import {get, post} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
  individual_id?: string
}

export interface Address {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: string
  lat: number
  lng: number
  _id: string
}
export interface IndividualId {
  _id: string
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  statue: string
  user_id: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface AddressData {
  address_type: string
  address: Address
  individual_id: IndividualId
  no_of_rooms: number
  no_of_bath: number
  total_area: number
  remark: string
  createdAt: string
  updatedAt: string
  status: string
  id: string
}
export type AddressApiResponse = JmmApiResponse<AddressData[]>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchAddress = async (payload: PayloadType): Promise<AddressApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<AddressApiResponse>(`/address`, filteredPayload)

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
