import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'

interface Checklist {
  _id: string
  name: string
  type: string
  subtype: string
  company_id: string
  customer_id: string
  task_ids: string[]
  createdAt: string
  updatedAt: string
  __v: number
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

interface Customer {
  _id: string
  company_id: string
  email: string
  mobile_number: string
  name: string
  type: string
  location_ids: string[]
  checklist_ids: string[]
  status: string
  contacts: any[] // Adjust type as needed for contacts if it has a specific structure
  createdAt: string
  updatedAt: string
  __v: number
}

interface TaskDetails {
  name: string
  description: string
  type: string
  checklist_id: Checklist
  company_id: Company
  customer_id: Customer
  images: string[]
  videos: string[]
  createdAt: string
  updatedAt: string
  id: string
}

export type FetchTaskResponse = JmmApiResponse<TaskDetails[]>
interface TaskListPayload {
  limit?: number
  page?: number
  sortBy?: string
  status?: string
}

const filterPayload = (payload: TaskListPayload) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchTask = async (payload: TaskListPayload): Promise<FetchTaskResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchTaskResponse>(`/task`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
