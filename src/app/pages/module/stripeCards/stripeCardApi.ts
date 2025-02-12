import {FetchSingleStripeCardResponse, FetchStripeCardResponse} from './stripeCardInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'

// Fetch Task Management List
export const fetchStripeCard = (payload: Record<string, any>): Promise<FetchStripeCardResponse> =>
  apiService<FetchStripeCardResponse>('/stripepayments/cards', payload)

// Fetch Single Task Management Entry
export const fetchSingleStripeCard = (id: string): Promise<FetchSingleStripeCardResponse> =>
  apiService<FetchSingleStripeCardResponse>('/stripepayments/cards', {id})

// Create Task Management Hook
export const useCreateStripeCard = (): QueryMutationReturnType =>
  useApiMutation('/stripepayments/cards', 'post', 'Task Track Created Successfully', 'stripeCard')

// Update Task Management Hook
export const useUpdateStripeCard = (): QueryMutationReturnType =>
  useApiMutation('/stripepayments/cards', 'put', 'Task Track Updated Successfully', 'stripeCard')

// Delete Task Management Hook
export const useDeleteStripeCard = (): QueryMutationReturnType =>
  useApiMutation('/stripepayments/cards', 'delete', 'Task Track Deleted Successfully', 'stripeCard')
