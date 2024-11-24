import { get } from 'sr/utils/axios/index'

interface CompanyResponse {
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

interface PayloadType {
  limit?: number
  page?: number
  senderId?: string
  sortBy?: string
  projectBy?: string
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchCompany = async (payload: PayloadType): Promise<FetchCompanyResponse> => {
  const filteredPayload = filterPayload(payload)

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