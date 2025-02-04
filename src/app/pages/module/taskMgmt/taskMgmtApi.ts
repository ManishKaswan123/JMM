import {get, post, put} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {
  FetchSingleTaskMgmtResponse,
  FetchTaskMgmtResponse,
  TaskMgmtFilters,
} from './taskMgmtInterfaces'
import {QueryMutationReturnType, QueryPayloadVariables} from 'sr/utils/api/globalInterface'
import {filterPayload, handleApiError, invalidateQueryData} from 'sr/helpers/globalHelpers'

// Fetch Task Management List
export const fetchTaskMgmt = async (payload: TaskMgmtFilters): Promise<FetchTaskMgmtResponse> => {
  try {
    const res = await get<FetchTaskMgmtResponse>('/taskmgmt', filterPayload(payload))
    if (res.success) return res
    else throw new Error('No task mgmt found')
  } catch (error) {
    handleApiError(error, 'Failed to fetch task mgmt')
    return Promise.reject(error)
  }
}

// Fetch Single Task Management Entry
export const fetchSingleTaskMgmt = async (id: string): Promise<FetchSingleTaskMgmtResponse> => {
  try {
    const res = await get<FetchSingleTaskMgmtResponse>('/taskmgmt', {id})
    if (res.success) return res
    throw new Error('No task mgmt found')
  } catch (error) {
    handleApiError(error, 'Failed to fetch task mgmt')
    return Promise.reject(error)
  }
}

// Generic Task Management Mutation Function
const taskMgmtMutation = async (
  url: string,
  payload: Record<string, any>,
  onSuccess: (action: string) => void,
  successMessage: string
): Promise<boolean> => {
  try {
    const res = await (url === 'post'
      ? post<any>('/taskmgmt', payload)
      : put<any>('/taskmgmt', payload))
    if (res.success) {
      toast.success(successMessage)
      onSuccess(url === 'post' ? 'create' : 'update')
      return true
    }
    throw new Error(`${successMessage} failed`)
  } catch (error) {
    handleApiError(error, successMessage)
    return Promise.reject(error)
  }
}

// Create Task Management Hook
export const useCreateTaskMgmt = (): QueryMutationReturnType => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, QueryPayloadVariables>({
    mutationFn: ({payload, onSuccess}) =>
      taskMgmtMutation('post', payload, onSuccess, 'Task Mgmt Created Successfully'),
    onSuccess: () => invalidateQueryData(queryClient, 'taskMgmt'),
    onError: (error: Error) => toast.error(error.message),
  })
}

// Update Task Management Hook
export const useUpdateTaskMgmt = (): QueryMutationReturnType => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, QueryPayloadVariables>({
    mutationFn: ({payload, onSuccess}) =>
      taskMgmtMutation('put', payload, onSuccess, 'Task Mgmt Updated Successfully'),
    onSuccess: () => invalidateQueryData(queryClient, 'taskMgmt'),
    onError: (error: Error) => toast.error(error.message),
  })
}
