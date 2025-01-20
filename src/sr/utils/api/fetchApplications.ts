import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'

export type FetchApplicationResponse = JmmApiResponse<JobApplication[]>
export type FetchSingleApplicationResponse = JmmApiResponse<JobApplication>
export interface JobApplication {
  _id: string
  job_id: JobDetails
  cleaner_id: CleanerDetails
  answers: any[] // Update the type if answers structure is known
  status:
    | 'hired'
    | 'active'
    | 'withdrawn'
    | 'shortlist'
    | 'rejected'
    | 'awaiting-reviews'
    | 'pause'
    | 'contacting'
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

interface JobDetails {
  _id: string
  company_id: CompanyDetails
  job_title: string
  job_type: string[]
  schedule: string[]
  employment_type: string[]
  start_date: string
  show_pay_by: string
  max_amount: number
  rate: string
  benefits: string[]
  job_description: string
  application_call_mobile_number: string
  require_resume: boolean
  notifications: boolean
  email: string
  application_ids: string[]
  status: string
  createdAt: string
  updatedAt: string
  __v: number
  job_advanced_id: string
  id: string
}

interface CompanyDetails {
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
  id: string
}

interface CleanerDetails {
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
  address: AddressDetails
  id: string
}

interface AddressDetails {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
  _id: string
}

interface Pagination {
  total: number
  page: number
  pageSize: number
  sort: SortOptions
  statusCounts: StatusCounts
}

interface SortOptions {
  createdAt: number
}

interface StatusCounts {
  active: number
  hired: number
  withdrawn: number
}

interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  job_id?: string
  cleaner_id?: string
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchApplications = async (
  payload: PayloadType
): Promise<FetchApplicationResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchApplicationResponse>(`/application`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleApplication = async (
  id: string
): Promise<FetchSingleApplicationResponse> => {
  try {
    const res = await get<FetchSingleApplicationResponse>(`/application`, {id})

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
