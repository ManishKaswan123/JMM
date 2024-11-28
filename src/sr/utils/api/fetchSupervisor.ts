import { get } from 'sr/utils/axios/index'

interface SupervisorAccess {
  job_management: {
    view_job: boolean
    add_job: boolean
    update_job: boolean
    delete_job: boolean
  }
  work_order_management: {
    view_work_order: boolean
    add_work_order: boolean
    update_work_order: boolean
    delete_work_order: boolean
  }
  customer_management: {
    view_customer: boolean
    add_customer: boolean
    update_customer: boolean
    delete_customer: boolean
  }
  contractor_management: {
    view_contractor: boolean
    add_contractor: boolean
    update_contractor: boolean
    delete_contractor: boolean
  }
}

interface SupervisorCompanyDetails {
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

interface SupervisorDetails {
  access: SupervisorAccess
  company_id: SupervisorCompanyDetails
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  customer_location_ids: string[]
  workorder_ids: string[]
  status: string
  createdAt: string
  updatedAt: string
  user_id: string
  username: string
  id: string
}

interface Pagination {
  total: number
  page: number
  pageSize: number
  sort: Record<string, number>
}

interface FetchSupervisorsResponse {
  success: boolean
  data: SupervisorDetails[]
  pagination: Pagination
}

interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchSupervisors = async (payload: PayloadType): Promise<FetchSupervisorsResponse> => {
    const filteredPayload = filterPayload(payload)
  
    try {
      const res = await get<FetchSupervisorsResponse>(`/supervisor`, filteredPayload)
  
      if (res.data && res.data.length > 0) {
        return res // Return the fetched data
      } else {
        throw new Error('No data found')
      }
    } catch (error) {
      throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  