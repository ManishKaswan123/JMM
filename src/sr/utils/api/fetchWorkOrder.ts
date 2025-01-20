import {get} from 'sr/utils/axios/index'
import {transformPayloadToFilter} from '../helpers/processFilter'
import {JmmApiResponse} from './contant'

interface ChecklistDetails {
  _id: string
  name: string
  type: string
  subtype: string
  company_id: string
  customer_id: string
  task_ids: string[]
  status: string
  createdAt: string
  updatedAt: string
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
}

interface CustomerDetails {
  _id: string
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
}

interface CustomerLocationDetails {
  _id: string
  customer_id: string
  company_id: string
  address: {
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    postal: string
    country: string
    lat: number
    lng: number
  }
  checklist_ids: string[]
  geofence_ids: string[]
  contacts: string[]
  createdAt: string
  updatedAt: string
}

export interface WorkOrderResponse {
  title: string
  description: string
  type: string
  contractor_id: Record<string, any>
  checklist_id: ChecklistDetails
  company_id: CompanyDetails
  customer_id: CustomerDetails
  customer_location_id: CustomerLocationDetails
  job_type: string
  pay_type: string
  pay_type_rate: number
  entry_time: string
  exit_time: string
  one_time_date: string
  time_for_work_completion: number
  recurring: boolean
  payment_status: string
  workorder_status: string
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
  counts: {
    statusCounts: Record<string, number>
    approvalStatusCounts: Record<string, number>
    paymentStatusCounts: Record<string, number>
    workorderStatusCounts: Record<string, number>
  }
}

export type FetchSingleWorkOrderResponse = JmmApiResponse<WorkOrderResponse>
export type FetchWorkOrderResponse = JmmApiResponse<WorkOrderResponse[]>

export const fetchWorkOrder = async (
  payload: Record<string, any>
): Promise<FetchWorkOrderResponse> => {
  const {min_pay_type_rate, max_pay_type_rate, ...rest} = transformPayloadToFilter(payload)
  payload = {
    ...rest, // Include the rest of the payload fields
    [`pay_type_rate>${min_pay_type_rate}`]: '',
    [`pay_type_rate<${max_pay_type_rate}`]: '',
  }

  try {
    const res = await get<FetchWorkOrderResponse>(`/workorder`, payload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleWorkOrder = async (id: string): Promise<FetchSingleWorkOrderResponse> => {
  try {
    const res = await get<FetchSingleWorkOrderResponse>(`/workorder`, {id})

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
