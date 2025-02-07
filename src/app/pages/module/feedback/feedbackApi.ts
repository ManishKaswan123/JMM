import {FetchSingleFeedbackResponse, FetchFeedbackResponse} from './feedbackInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'

// Fetch Task Management List
export const fetchFeedback = (payload: Record<string, any>): Promise<FetchFeedbackResponse> =>
  apiService<FetchFeedbackResponse>('/feedback', payload)

// Fetch Single Task Management Entry
export const fetchSingleFeedback = (id: string): Promise<FetchSingleFeedbackResponse> =>
  apiService<FetchSingleFeedbackResponse>('/feedback', {id})

// Create Task Management Hook
export const useCreateFeedback = (): QueryMutationReturnType =>
  useApiMutation('/feedback', 'post', 'Feedback Created Successfully', 'feedback')

// Update Task Management Hook
export const useUpdateFeedback = (): QueryMutationReturnType =>
  useApiMutation('/feedback', 'put', 'Feedback Updated Successfully', 'feedback')

// Delete Task Management Hook
export const useDeleteFeedback = (): QueryMutationReturnType =>
  useApiMutation('/feedback', 'delete', 'Feedback Deleted Successfully', 'feedback')
