import {JmmApiResponse} from 'sr/utils/api/globalInterface'
import {ContractorDetails} from 'sr/utils/api/contractorApi'
import {TaskListDetails} from 'sr/utils/api/fetchTaskList'
import {WorkOrderResponse} from 'sr/utils/api/fetchWorkOrder'

interface UpdatedContractor extends Omit<ContractorDetails, 'id'> {
  _id: string
}

interface UpdatedWorkorder extends Omit<WorkOrderResponse, 'id'> {
  _id: string
}
interface UpdatedTask extends Omit<TaskListDetails, 'id'> {
  _id: string
}
export interface TaskMgmtDetails {
  contractor_id?: UpdatedContractor
  workorder_id?: UpdatedWorkorder
  task_id?: UpdatedTask
  contractor_status: string
  supervisor_status: string
  status: string
  images: string[]
  videos: string[]
  createdAt: string
  updatedAt: string
  id: string
}
// API Response Types
export type FetchTaskMgmtResponse = JmmApiResponse<TaskMgmtDetails[]>
export type FetchSingleTaskMgmtResponse = JmmApiResponse<TaskMgmtDetails>

export interface TaskMgmtFilters {
  limit?: number
  page?: number
  sortBy?: string
  contractor_id?: string
  workorder_id?: string
  task_id?: string
  contractor_status?: string
  supervisor_status?: string
}
export type TaskMgmtStatus = 'active' | 'in progress' | 'publish'
export type TaskMgmtSubStatus = 'completed' | 'pending'
export interface GenerateTaskMmgtFieldsProps {
  workorderData: {workorder_name: string; id: string}[]
  taskData: {task_name: string; id: string}[]
  isFilter?: boolean
}
export interface UseTaskMgmtQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
