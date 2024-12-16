import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'

interface PayloadType {
  limit?: number
  page?: number
  companyId?: string
  status?: string
}

export interface Customer {
  company_id: string
  email: string
  mobile_number: string
  name: string
  type: string
  remarks: string
  location_ids: string[]
  checklist_ids: string[]
  status: string
  contacts: string[]
  createdAt: string
  updatedAt: string
  id: string
}

export type CustomerApiResponse = JmmApiResponse<Customer[]>
export type SingleCustomerApiResponse = JmmApiResponse<Customer>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchCustomers = async (payload: PayloadType): Promise<CustomerApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<CustomerApiResponse>(`/customer`, filteredPayload)

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
export const fetchSingleCustomer = async (id: string): Promise<SingleCustomerApiResponse> => {
  try {
    const res = await get<SingleCustomerApiResponse>(`/customer`, {id})

    if (res.success && res.data) {
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
