import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse, Status} from './globalInterface'
import {toast} from 'react-toastify'
import {Address} from './addressApi'
import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

export interface IndividualFilters {
  limit?: number
  page?: number
  status?: Status
}

export interface Individual {
  username: string
  comapanyId?: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  status: Status
  user_id: string
  no_of_rooms?: number
  no_of_bath?: number
  total_area?: number
  remark?: string
  address?: Address
  createdAt: string
  updatedAt: string
  id: string
}
export type IndividaulApiResponse = JmmApiResponse<Individual[]>
type SingleIndividualApiResponse = JmmApiResponse<Individual>

const filterPayload = (payload: IndividualFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchIndividual = async (
  payload: IndividualFilters
): Promise<IndividaulApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<IndividaulApiResponse>(`/individual`, filteredPayload)

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

export const fetchSingleIndividual = async (id: string): Promise<Individual> => {
  try {
    const res = await get<SingleIndividualApiResponse>(`/individual`, {id})

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

interface IndividualVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createIndividual = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/individual`, payload)
    if (res.success === true) {
      toast.success('Individual Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateIndividual = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  IndividualVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, IndividualVariables>({
    mutationFn: async ({payload, onSuccess}) => createIndividual(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['individual'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateIndividual = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/individual`, payload)
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
export const useUpdateIndividual = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  IndividualVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, IndividualVariables>({
    mutationFn: async ({payload, onSuccess}: IndividualVariables) =>
      updateIndividual(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['individual'] as InvalidateQueryFilters)
      toast.success('Individual Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
