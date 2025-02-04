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
import {ContractorDetails} from './contractorApi'
import {transformPayloadToFilter} from '../helpers/processFilter'

interface UpdatedContractor extends Omit<ContractorDetails, 'id'> {
  _id: string
}
interface UpdatedCompany extends Omit<CompanyResponse, 'id'> {
  _id: string
}

export interface ContractorJobtypeDetails {
  contractor_id: UpdatedContractor
  company_id?: UpdatedCompany
  job_type?: string
  additional_information?: string
  rate?: string
  createdAt: string
  updatedAt: string
  id: string
}

export type FetchContractorJobtypeResponse = JmmApiResponse<ContractorJobtypeDetails[]>
export type FetchSingleContractorJobtypeResponse = JmmApiResponse<ContractorJobtypeDetails>

export interface ContractorJobtypeListPayload {
  limit?: number
  page?: number
  sortBy?: string
  contractor_id?: string
  company_id?: string
  job_type?: string
  rate?: string
}

export const fetchContractorJobtype = async (
  payload: ContractorJobtypeListPayload
): Promise<FetchContractorJobtypeResponse> => {
  const filteredPayload = transformPayloadToFilter(payload)

  try {
    const res = await get<FetchContractorJobtypeResponse>(`/contractor/jobtype`, filteredPayload)

    if (res.success === true && res.data) {
      return res
    } else {
      throw new Error('No Contractor Jobtype found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch Contractor Jobtype: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

export const fetchSingleContractorJobtype = async (
  id: string
): Promise<FetchSingleContractorJobtypeResponse> => {
  try {
    const res = await get<FetchSingleContractorJobtypeResponse>(`/contractor/jobtype`, {id})

    if (res.success === true && res.data) {
      return res
    } else {
      throw new Error('No Contractor Jobtype found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch Contractor Jobtype: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}
interface ContractorJobtypeVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createContractorJobtype = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/contractor/jobtype`, payload)
    if (res.success === true) {
      toast.success('Contractor Jobtype Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateContractorJobtype = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ContractorJobtypeVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ContractorJobtypeVariables>({
    mutationFn: async ({payload, onSuccess}) => createContractorJobtype(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['contractorJobtype'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateContractorJobtype = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/contractor/jobtype`, payload)
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
export const useUpdateContractorJobtype = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ContractorJobtypeVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ContractorJobtypeVariables>({
    mutationFn: async ({payload, onSuccess}: ContractorJobtypeVariables) =>
      updateContractorJobtype(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['contractorJobtype'] as InvalidateQueryFilters)
      toast.success('Contractor Jobtype Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
