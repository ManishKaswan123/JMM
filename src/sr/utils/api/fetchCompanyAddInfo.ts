import {get} from 'sr/utils/axios/index'

export interface CompanyResponse {
  success: boolean
  data: CompanyData
  pagination: Pagination
}

export interface CompanyData {
  company_id: string
  company_website: string
  social_link_fb?: string
  social_link_twitter?: string
  company_logo_path: string
  no_of_employees: number
  date_format: string
  date_of_incorporation: string | null
  number_of_branches: number
  annual_revenue: number
  no_of_clients?: number
  about_company: string
  createdAt: string
  updatedAt: string
  id: string
}

interface Pagination {
  total: number
  page: number
  pageSize: number
  sort: SortOrder
}

interface SortOrder {
  createdAt: number
}

export const fetchCompanyDetail = async (id: string): Promise<CompanyResponse> => {
  try {
    const res = await get<CompanyResponse>(`/company/addlinfo`, {company_id: id})

    if (res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
