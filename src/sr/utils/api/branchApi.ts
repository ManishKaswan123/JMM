import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {Address} from './addressApi'
export interface BranchFilters {
  limit?: number
  page?: number
  company_id?: string
  type?: string
  isDefaultBranch?: boolean
  status?: string
}

export interface BranchType {
  company_id: string
  branch_name: string
  type: string
  isDefaultBranch?: boolean
  phone_number: string
  address: Address
  status?: string
  createdAt: string
  updatedAt: string
  id: string
}

export type BranchApiResponse = JmmApiResponse<BranchType[]>
export type SingleBranchApiResponse = JmmApiResponse<BranchType>

const filterPayload = (payload: BranchFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchBranches = async (payload: BranchFilters): Promise<BranchApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<BranchApiResponse>(`/company/branch`, filteredPayload)

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
export const fetchSingleBranch = async (id: string): Promise<SingleBranchApiResponse> => {
  try {
    const res = await get<SingleBranchApiResponse>(`/company/branch`, {id})

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
interface BranchVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createBranch = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/company/branch`, payload)
    if (res.success === true) {
      toast.success('Branch Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateBranch = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  BranchVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, BranchVariables>({
    mutationFn: async ({payload, onSuccess}) => createBranch(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['branch'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateBranch = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/company/branch`, payload)
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
export const useUpdateBranch = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  BranchVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, BranchVariables>({
    mutationFn: async ({payload, onSuccess}: BranchVariables) => updateBranch(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['branch'] as InvalidateQueryFilters)
      toast.success('Branch Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
