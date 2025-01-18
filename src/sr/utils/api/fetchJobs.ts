import {get} from 'sr/utils/axios/index'
import {transformPayloadToFilter} from '../helpers/processFilter'

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
}

export interface JobAdvancedDetails {
  _id: string
  job_id: string
  reporting_address: {
    address_line_1: string
    address_line_2: string
    country: string
    city: string
    state: string
    postal: string
    lat: number
    lng: number
  }
  hire_count: number
  supplemental_pay: string[]
  recruitment_timeline: string
  application_deadline: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ApplicationDetails {
  _id: string
  job_id: string
  cleaner_id: string
  answers: string[]
  status: string
  createdAt: string
  updatedAt: string
}

export interface JobResponse {
  company_id: CompanyDetails
  job_title: string
  job_type: string[]
  schedule: string[]
  employment_type: string[]
  start_date: string
  show_pay_by: string
  exact_amount: number
  min_amount?: number
  max_amount: number
  range: {
    min: number
    max: number
  }
  rate: string
  benefits: string[]
  job_description: string
  application_call_mobile_number: string
  require_resume: boolean
  notifications: boolean
  email: string
  application_ids: ApplicationDetails[]
  status: string
  createdAt: string
  updatedAt: string
  job_advanced_id: JobAdvancedDetails
  application_status_counts: {
    hired: number
    active: number
  }
  id: string
}

interface Pagination {
  total: number
  page: number
  pageSize: number
  sort: Record<string, number>
  statusCounts: {
    open: number
    closed: number
    pause: number
    active: number
  }
}

interface FetchJobResponse {
  data: JobResponse[]
  success: boolean
  pagination: Pagination
}
export interface FetchSingleJobResponse {
  data: JobResponse
  success: boolean
  pagination: Pagination
}

export const fetchJobs = async (payload: Record<string, any>): Promise<FetchJobResponse> => {
  console.log('filter payload', payload)
  const filteredPayload = transformPayloadToFilter(payload)

  try {
    const res = await get<FetchJobResponse>(`/job`, filteredPayload)

    if (res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleJob = async (id: string): Promise<FetchSingleJobResponse> => {
  try {
    const res = await get<FetchSingleJobResponse>(`/job`, {id})

    if (res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
