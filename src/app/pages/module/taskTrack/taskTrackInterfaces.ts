import {JmmApiResponse, Status} from 'sr/utils/api/globalInterface'
import {WorkOrderResponse} from 'sr/utils/api/fetchWorkOrder'

interface UpdatedWorkorder extends Omit<WorkOrderResponse, 'id'> {
  _id: string
}

export interface TaskTrackDetails {
  workorder_id?: UpdatedWorkorder
  contractor_status: Status
  supervisor_status: Status
  work_completion_time: string
  status: Status
  createdAt: string
  updatedAt: string
  id: string
}
// API Response Types
export type FetchTaskTrackResponse = JmmApiResponse<TaskTrackDetails[]>
export type FetchSingleTaskTrackResponse = JmmApiResponse<TaskTrackDetails>

export interface TaskTrackFilters {
  limit?: number
  page?: number
  sortBy?: string
  workorder_id?: string
  contractor_status?: Status
  supervisor_status?: Status
  status?: string
}

export interface GenerateTaskTrackFieldsProps {
  workorderData: {workorder_name: string; id: string}[]
  isFilter?: boolean
}
export interface UseTaskTrackQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
