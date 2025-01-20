import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'

export type CompanyResponse = JmmApiResponse<CompanyData>

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

export const fetchCompanyDetail = async (id: string): Promise<CompanyResponse> => {
  try {
    const res = await get<CompanyResponse>(`/company/addlinfo`, {company_id: id})

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
