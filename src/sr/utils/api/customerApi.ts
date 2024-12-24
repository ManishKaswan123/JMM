import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
interface PayloadType {
  limit?: number
  page?: number
  company_id?: string
  status?: string
}

export interface Customer {
  company_id: string
  email: string
  mobile_number: string
  name: string
  type: string
  remarks: string
  location_ids: string[]
  checklist_ids: string[]
  status: string
  contacts: string[]
  createdAt: string
  updatedAt: string
  id: string
}

export type CustomerApiResponse = JmmApiResponse<Customer[]>
export type SingleCustomerApiResponse = JmmApiResponse<Customer>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchCustomers = async (payload: PayloadType): Promise<CustomerApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<CustomerApiResponse>(`/customer`, filteredPayload)

    if (res.success && res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleCustomer = async (id: string): Promise<SingleCustomerApiResponse> => {
  try {
    const res = await get<SingleCustomerApiResponse>(`/customer`, {id})

    if (res.success && res.data) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const createCustomer = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await post<any>(`/customer`, payload)
    if (res.success === true) {
      toast.success('Customer Created Successfully')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}
// The useMutation hook with correct typing
export const useCreateCustomer = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  Record<string, any> // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => createCustomer(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['customer'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
interface UpdateCustomerVariables {
  payload: Record<string, any>
}
// Define the function with correct typing
const updateCustomer = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await put<any>(`/customer`, payload)
    if (res.success === true) {
      return true
    }
    throw new Error('Update failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useUpdateCustomer = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  UpdateCustomerVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateCustomerVariables>({
    mutationFn: async ({payload}: UpdateCustomerVariables) => updateCustomer(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['customer'] as InvalidateQueryFilters)
      toast.success('Customer Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
