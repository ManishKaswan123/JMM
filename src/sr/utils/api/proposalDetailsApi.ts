import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './globalInterface'
import {toast} from 'react-toastify'
import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

export interface ProposalDetails {
  cleaner_id: string
  descrption: string
  expected_rate: string
  createdAt: string
  updatedAt: string
  id: string
}

export type FetchProposalDetailsResponse = JmmApiResponse<ProposalDetails[]>
export type FetchSingleProposalDetailsResponse = JmmApiResponse<ProposalDetails>

export interface ProposalDetailsFilters {
  limit?: number
  page?: number
  sortBy?: string
  status?: string
  cleaner_id?: string
  expected_rate?: string
}

const filterPayload = (payload: ProposalDetailsFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchProposalDetails = async (
  payload: ProposalDetailsFilters
): Promise<FetchProposalDetailsResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchProposalDetailsResponse>(`/cleaner/proposaldetails`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleProposalDetails = async (
  id: string
): Promise<FetchSingleProposalDetailsResponse> => {
  try {
    const res = await get<FetchSingleProposalDetailsResponse>(`/cleaner/proposaldetails`, {id})

    if (res.data && res.success === true) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

interface ProposalDetailsVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}

const createProposalDetails = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/cleaner/proposaldetails`, payload)
    if (res.success === true) {
      toast.success('Proposal Details Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateProposalDetails = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ProposalDetailsVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ProposalDetailsVariables>({
    mutationFn: async ({payload, onSuccess}) => createProposalDetails(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['proposalDetails'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
// Define the function with correct typing
const updateProposalDetails = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/cleaner/proposaldetails`, payload)
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
export const useUpdateProposalDetails = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ProposalDetailsVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ProposalDetailsVariables>({
    mutationFn: async ({payload, onSuccess}: ProposalDetailsVariables) =>
      updateProposalDetails(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['proposalDetails'] as InvalidateQueryFilters)
      toast.success('Proposal Details Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
