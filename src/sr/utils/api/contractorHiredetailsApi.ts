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

export interface ContractorHiredetailsDetails {
  contractor_id: UpdatedContractor
  company_id?: UpdatedCompany
  destination?: string
  joining_date?: string
  employment_type?: string
  rate?: number
  createdAt: string
  updatedAt: string
  id: string
}

export type FetchContractorHiredetailsResponse = JmmApiResponse<ContractorHiredetailsDetails>
export type FetchSingleContractorHiredetailsResponse = JmmApiResponse<ContractorHiredetailsDetails>

export interface ContractorHiredetailsListPayload {
  limit?: number
  page?: number
  sortBy?: string
  contractor_id?: string
  company_id?: string
  employment_type?: string
  rate?: string
}

export const fetchContractorHiredetails = async (
  payload: ContractorHiredetailsListPayload
): Promise<FetchContractorHiredetailsResponse> => {
  const filteredPayload = transformPayloadToFilter(payload)

  try {
    const res = await get<FetchContractorHiredetailsResponse>(
      `/contractor/hiredetails`,
      filteredPayload
    )

    if (res.success === true && res.data) {
      return res
    } else {
      throw new Error('No Contractor Hiredetails found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch Contractor Hiredetails: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

export const fetchSingleContractorHiredetails = async (
  id: string
): Promise<FetchSingleContractorHiredetailsResponse> => {
  try {
    const res = await get<FetchSingleContractorHiredetailsResponse>(`/contractor/hiredetails`, {id})

    if (res.success === true && res.data) {
      return res
    } else {
      throw new Error('No Contractor Hiredetails found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch Contractor Hiredetails: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}
interface ContractorHiredetailsVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createContractorHiredetails = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/contractor/hiredetails`, payload)
    if (res.success === true) {
      toast.success('Contractor Hiredetails Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateContractorHiredetails = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ContractorHiredetailsVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ContractorHiredetailsVariables>({
    mutationFn: async ({payload, onSuccess}) => createContractorHiredetails(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['contractorHiredetails'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateContractorHiredetails = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/contractor/hiredetails`, payload)
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
export const useUpdateContractorHiredetails = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  ContractorHiredetailsVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, ContractorHiredetailsVariables>({
    mutationFn: async ({payload, onSuccess}: ContractorHiredetailsVariables) =>
      updateContractorHiredetails(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['contractorHiredetails'] as InvalidateQueryFilters)
      toast.success('Contractor Hiredetails Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
