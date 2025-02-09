import {
  FetchSingleStripeCustomerResponse,
  FetchStripeCustomerResponse,
} from './stripeCustomerInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'

// Fetch Task Management List
export const fetchStripeCustomer = (
  payload: Record<string, any>
): Promise<FetchStripeCustomerResponse> =>
  apiService<FetchStripeCustomerResponse>('/stripepayments/customer', payload)

// Fetch Single Task Management Entry
export const fetchSingleStripeCustomer = (id: string): Promise<FetchSingleStripeCustomerResponse> =>
  apiService<FetchSingleStripeCustomerResponse>('/stripepayments/customer', {id})

// Create Task Management Hook
export const useCreateStripeCustomer = (): QueryMutationReturnType =>
  useApiMutation(
    '/stripepayments/customer',
    'post',
    'Task Mgmt Created Successfully',
    'stripeCustomer'
  )

// Update Task Management Hook
export const useUpdateStripeCustomer = (): QueryMutationReturnType =>
  useApiMutation(
    '/stripepayments/customer',
    'put',
    'Task Mgmt Updated Successfully',
    'stripeCustomer'
  )

// Delete Task Management Hook
export const useDeleteStripeCustomer = (): QueryMutationReturnType =>
  useApiMutation(
    '/stripepayments/customer',
    'delete',
    'Task Mgmt Deleted Successfully',
    'stripeCustomer'
  )
