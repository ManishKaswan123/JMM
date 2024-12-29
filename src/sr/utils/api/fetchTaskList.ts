import {get} from 'sr/utils/axios/index'

export interface TaskListDetails {
  name: string
  description: string
  type: string
  checklist_id: string
  company_id: string
  customer_id: string
  images: string[]
  videos: string[]
  status?: string
  createdAt: string
  updatedAt: string
  id: string
}

interface TaskListPagination {
  total: number
  page: number
  pageSize: number
  sort: Record<string, number>
}

interface FetchTaskListResponse {
  success: boolean
  data: TaskListDetails[]
  pagination: TaskListPagination
}
export interface FetchSingleTaskListResponse {
  success: boolean
  data: TaskListDetails
  pagination: TaskListPagination
}

export interface TasklistFilters {
  limit?: number
  page?: number
  sortBy?: string
  status?: string
  company_id?: string
  customer_id?: string
  checklist_id?: string
}

const filterPayload = (payload: TasklistFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchTaskList = async (payload: TasklistFilters): Promise<FetchTaskListResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchTaskListResponse>(`/customer/tasklist`, filteredPayload)

    if (res.success === true && res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleTaskList = async (id: string): Promise<FetchSingleTaskListResponse> => {
  try {
    const res = await get<FetchSingleTaskListResponse>(`/customer/tasklist`, {id})

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
