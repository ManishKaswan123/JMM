import {get} from 'sr/utils/axios/index'

interface Address {
  address_line_1: string
  address_line_2?: string
  country: string
  city: string
  state: string
  postal: string
  lat: number
  lng: number
  _id: string
}

interface Cleaner {
  _id: string
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
  __v: number
  address: Address
}

interface Company {
  _id: string
  username: string
  email: string
  mobile_number: string
  company_name: string
  business_type: string[]
  intent: string[]
  candidate_msg: boolean
  user_id: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Contractor {
  cleaner_id: Cleaner
  first_name: string
  last_name: string
  mobile_number: string
  email?: string
  date_of_birth: string
  address: Address
  customer_location_ids: string[]
  company_id: Company
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

interface Pagination {
  total: number
  page: number
  pageSize: number
  sort?: Record<string, number>
}

interface FetchContractorResponse {
  success: boolean
  data: Contractor[]
  pagination?: Pagination
}

interface FetchSingleContractorResponse extends Omit<FetchContractorResponse, 'data'> {
  data: Contractor
}

interface ContractorListPayload {
  limit?: number
  page?: number
  sortBy?: string
  status?: string
  company_id?: string
  cleaner_id?: string
}

const filterPayload = (payload: ContractorListPayload) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchContractor = async (
  payload: ContractorListPayload
): Promise<FetchContractorResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchContractorResponse>(`/contractor`, filteredPayload)

    if (res.data && res.data.length > 0) {
      return res
    } else {
      throw new Error('No contractor found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch contractor: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export const fetchSingleContractor = async (id: string): Promise<FetchSingleContractorResponse> => {
  try {
    const res = await get<FetchSingleContractorResponse>(`/contractor`, {id})

    if (res.success === true && res.data) {
      return res
    } else {
      throw new Error('No contractor found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch contractor: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
