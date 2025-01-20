import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {toast} from 'react-toastify'
import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

export interface CleanerReferenceFilters {
  limit?: number
  page?: number
  cleaner_id?: string
}

export interface CleanerReference {
  cleaner_id: string
  first_name: string
  last_name: string
  email: string
  mobile_number: string
  createdAt: string
  updatedAt: string
  id: string
}
export type IndividaulApiResponse = JmmApiResponse<CleanerReference[]>
type SingleCleanerReferenceApiResponse = JmmApiResponse<CleanerReference>

const filterPayload = (payload: CleanerReferenceFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchCleanerReference = async (
  payload: CleanerReferenceFilters
): Promise<IndividaulApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<IndividaulApiResponse>(`/cleaner/references`, filteredPayload)

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

export const fetchSingleCleanerReference = async (id: string): Promise<CleanerReference> => {
  try {
    const res = await get<SingleCleanerReferenceApiResponse>(`/cleaner/references`, {id})

    if (res.success === true && res.data) {
      return res.data // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

interface CleanerReferenceVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createCleanerReference = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/cleaner/reference`, payload)
    if (res.success === true) {
      toast.success('CleanerReference Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateCleanerReference = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CleanerReferenceVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CleanerReferenceVariables>({
    mutationFn: async ({payload, onSuccess}) => createCleanerReference(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleanerReference'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateCleanerReference = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/cleaner/reference`, payload)
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
export const useUpdateCleanerReference = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CleanerReferenceVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CleanerReferenceVariables>({
    mutationFn: async ({payload, onSuccess}: CleanerReferenceVariables) =>
      updateCleanerReference(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleanerReference'] as InvalidateQueryFilters)
      toast.success('CleanerReference Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
