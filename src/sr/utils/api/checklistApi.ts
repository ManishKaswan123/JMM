import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {CompanyResponse} from './fetchCompany'
import {Customer} from './customerApi'
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
  type?: string
  subtype?: string
  company_id?: string
  customer_id?: string
  status?: string
}
interface ModifiedCompanyResponse extends Omit<CompanyResponse, 'id'> {
  _id: string
}
interface ModifiedCustomerResponse extends Omit<Customer, 'id'> {
  _id: string
}

export interface Checklist {
  name: string
  type: string
  subtype: string
  company_id: ModifiedCompanyResponse
  customer_id: ModifiedCustomerResponse
  task_ids: string[]
  remarks?: string
  location_ids: string[]
  checklist_ids: string[]
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

export type ChecklistApiResponse = JmmApiResponse<Checklist[]>
export type SingleChecklistApiResponse = JmmApiResponse<Checklist>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchChecklists = async (payload: PayloadType): Promise<ChecklistApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<ChecklistApiResponse>(`/checklist`, filteredPayload)

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
export const fetchSingleChecklist = async (id: string): Promise<SingleChecklistApiResponse> => {
  try {
    const res = await get<SingleChecklistApiResponse>(`/checklist`, {id})

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
interface ChecklistVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createChecklist = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/checklist`, payload)
    if (res.success === true) {
      toast.success('Checklist Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateChecklist = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ChecklistVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ChecklistVariables>({
    mutationFn: async ({payload, onSuccess}) => createChecklist(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['checklist'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateChecklist = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/checklist`, payload)
    if (res.success === true) {
      onSuccess('update')
      return true
    }
    throw new Error('Update failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useUpdateChecklist = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ChecklistVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ChecklistVariables>({
    mutationFn: async ({payload, onSuccess}: ChecklistVariables) =>
      updateChecklist(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['checklist'] as InvalidateQueryFilters)
      toast.success('Checklist Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
