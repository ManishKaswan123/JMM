import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './globalInterface'
import {CompanyResponse} from './fetchCompany'
import {toast} from 'react-toastify'
import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

export interface SupervisorAccess {
  job_management: {
    view_job: boolean
    add_job: boolean
    update_job: boolean
    delete_job: boolean
  }
  work_order_management: {
    view_work_order: boolean
    add_work_order: boolean
    update_work_order: boolean
    delete_work_order: boolean
  }
  customer_management: {
    view_customer: boolean
    add_customer: boolean
    update_customer: boolean
    delete_customer: boolean
  }
  contractor_management: {
    view_contractor: boolean
    add_contractor: boolean
    update_contractor: boolean
    delete_contractor: boolean
  }
}

interface UpdatedComapany extends Omit<CompanyResponse, 'id'> {
  _id: string
}

export interface SupervisorDetails {
  access: SupervisorAccess
  company_id: UpdatedComapany
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  customer_location_ids?: string[]
  workorder_ids?: string[]
  status: string
  createdAt: string
  updatedAt: string
  user_id?: string
  username?: string
  id: string
}

export type FetchSupervisorsResponse = JmmApiResponse<SupervisorDetails[]>
export type FetchSingleSupervisorResponse = JmmApiResponse<SupervisorDetails>

export interface SupervisorFilters {
  limit?: number
  page?: number
  company_id?: string
  status?: string
}

const filterPayload = (payload: SupervisorFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchSupervisors = async (
  payload: SupervisorFilters
): Promise<FetchSupervisorsResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchSupervisorsResponse>(`/supervisor`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const fetchSingleSupervisor = async (id: string): Promise<FetchSingleSupervisorResponse> => {
  try {
    const res = await get<FetchSingleSupervisorResponse>(`/supervisor`, {id})

    if (res.success === true && res.data) {
      return res
    } else {
      throw new Error('No supervisor found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch supervisor: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

interface SupervisorVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}

const createSupervisor = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/supervisor`, payload)
    if (res.success === true) {
      toast.success('Supervisor Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}
// The useMutation hook with correct typing
export const useCreateSupervisor = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  SupervisorVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, SupervisorVariables>({
    mutationFn: async ({payload, onSuccess}) => createSupervisor(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['supervisor'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
// Define the function with correct typing
const updateSupervisor = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/supervisor`, payload)
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
export const useUpdateSupervisor = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  SupervisorVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, SupervisorVariables>({
    mutationFn: async ({payload, onSuccess}: SupervisorVariables) =>
      updateSupervisor(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['supervisor'] as InvalidateQueryFilters)
      toast.success('Supervisor Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
