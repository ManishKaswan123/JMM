import {get} from 'sr/utils/axios/index'
import {transformPayloadToFilter} from '../helpers/processFilter'

export interface CompanyResponse {
  username: string
  email: string
  mobile_number: string
  company_name: string
  business_type: string[]
  intent: string[]
  candidate_msg: boolean
  no_of_clients?: number
  user_id: string
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

interface Pagination {
  total: number
  page: number
  pageSize: number
  sort: Record<string, number>
}

interface FetchCompanyResponse {
  success: boolean
  data: CompanyResponse[]
  pagination: Pagination
}
export interface FetchSingleCompanyResponse extends Omit<FetchCompanyResponse, 'data'> {
  data: CompanyResponse
}

export interface CompanyFilters {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  business_type?: string
  intent?: string
  candidate_msg?: boolean
  status?: string
}

export const fetchCompany = async (payload: Record<string, any>): Promise<FetchCompanyResponse> => {
  const filteredPayload = transformPayloadToFilter(payload)

  try {
    const res = await get<FetchCompanyResponse>(`/company`, filteredPayload)

    if (res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleCompany = async (id: string): Promise<FetchSingleCompanyResponse> => {
  try {
    const res = await get<FetchSingleCompanyResponse>(`/company`, {id})

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
