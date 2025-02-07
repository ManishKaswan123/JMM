import {FetchSingleTaskTrackResponse, FetchTaskTrackResponse} from './taskTrackInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'

// Fetch Task Management List
export const fetchTaskTrack = (payload: Record<string, any>): Promise<FetchTaskTrackResponse> =>
  apiService<FetchTaskTrackResponse>('/taskTrack', payload)

// Fetch Single Task Management Entry
export const fetchSingleTaskTrack = (id: string): Promise<FetchSingleTaskTrackResponse> =>
  apiService<FetchSingleTaskTrackResponse>('/taskTrack', {id})

// Create Task Management Hook
export const useCreateTaskTrack = (): QueryMutationReturnType =>
  useApiMutation('/taskTrack', 'post', 'Task Track Created Successfully', 'taskTrack')

// Update Task Management Hook
export const useUpdateTaskTrack = (): QueryMutationReturnType =>
  useApiMutation('/taskTrack', 'put', 'Task Track Updated Successfully', 'taskTrack')

// Delete Task Management Hook
export const useDeleteTaskTrack = (): QueryMutationReturnType =>
  useApiMutation('/taskTrack', 'delete', 'Task Track Deleted Successfully', 'taskTrack')
