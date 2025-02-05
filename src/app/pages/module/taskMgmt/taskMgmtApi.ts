import {FetchSingleTaskMgmtResponse, FetchTaskMgmtResponse} from './taskMgmtInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'

// Fetch Task Management List
export const fetchTaskMgmt = (payload: Record<string, any>): Promise<FetchTaskMgmtResponse> =>
  apiService<FetchTaskMgmtResponse>('/taskmgmt', payload)

// Fetch Single Task Management Entry
export const fetchSingleTaskMgmt = (id: string): Promise<FetchSingleTaskMgmtResponse> =>
  apiService<FetchSingleTaskMgmtResponse>('/taskmgmt', {id})

// Create Task Management Hook
export const useCreateTaskMgmt = (): QueryMutationReturnType =>
  useApiMutation('/taskmgmt', 'post', 'Task Mgmt Created Successfully', 'taskMgmt')

// Update Task Management Hook
export const useUpdateTaskMgmt = (): QueryMutationReturnType =>
  useApiMutation('/taskmgmt', 'put', 'Task Mgmt Updated Successfully', 'taskMgmt')

// Delete Task Management Hook
export const useDeleteTaskMgmt = (): QueryMutationReturnType =>
  useApiMutation('/taskmgmt', 'delete', 'Task Mgmt Deleted Successfully', 'taskMgmt')
