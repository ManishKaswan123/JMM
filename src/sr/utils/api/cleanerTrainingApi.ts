import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {toast} from 'react-toastify'
import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

export interface CleanerTrainingFilters {
  limit?: number
  page?: number
  cleaner_id?: string
}

export interface CleanerTraining {
  cleaner_id: string
  training: string
  date_attended: string
  description: string
  createAt: string
  updatedAt: string
  id: string
}
export type CleanerTrainingApiResponse = JmmApiResponse<CleanerTraining[]>
type SingleCleanerTrainingApiResponse = JmmApiResponse<CleanerTraining>

const filterPayload = (payload: CleanerTrainingFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchCleanerTraining = async (
  payload: CleanerTrainingFilters
): Promise<CleanerTrainingApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<CleanerTrainingApiResponse>(`/cleaner/trainings`, filteredPayload)

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

export const fetchSingleCleanerTraining = async (id: string): Promise<CleanerTraining> => {
  try {
    const res = await get<SingleCleanerTrainingApiResponse>(`/cleaner/trainings`, {id})

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

interface CleanerTrainingVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createCleanerTraining = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/cleaner/training `, payload)
    if (res.success === true) {
      toast.success('Cleaner Training Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateCleanerTraining = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CleanerTrainingVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CleanerTrainingVariables>({
    mutationFn: async ({payload, onSuccess}) => createCleanerTraining(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleanerTraining'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateCleanerTraining = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/cleaner/training`, payload)
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
export const useUpdateCleanerTraining = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CleanerTrainingVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CleanerTrainingVariables>({
    mutationFn: async ({payload, onSuccess}: CleanerTrainingVariables) =>
      updateCleanerTraining(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleanerTraining'] as InvalidateQueryFilters)
      toast.success('Cleaner Training Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
