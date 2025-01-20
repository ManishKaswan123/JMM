import {get, post, put} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {toast} from 'react-toastify'
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'

interface PayloadType {
  limit?: number
  page?: number
  individual_id?: string
  no_of_rooms?: number
  no_of_bath?: number
  total_area?: number
  status?: string
}

export interface Address {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
  no_of_rooms?: number
  no_of_bath?: number
  total_area?: number
  remark?: string
  _id: string
}
export interface IndividualId {
  _id: string
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  statue: string
  user_id: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface AddressData {
  address_type: string
  address: Address
  individual_id: IndividualId
  no_of_rooms: number
  no_of_bath: number
  total_area: number
  remark: string
  createdAt: string
  updatedAt: string
  status: string
  id: string
}
export type AddressApiResponse = JmmApiResponse<AddressData[]>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchAddress = async (payload: PayloadType): Promise<AddressApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<AddressApiResponse>(`/address`, filteredPayload)

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

export const createIndividual = async (payload: any) => {
  try {
    const res = await post<any>('/individual', payload)
    if (res.success === 'true') {
      toast.success('Individual created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}

interface AddressVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createAddress = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/address`, payload)
    if (res.success === true) {
      toast.success('Address Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateAddress = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  AddressVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, AddressVariables>({
    mutationFn: async ({payload, onSuccess}) => createAddress(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['address'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Define the function with correct typing
const updateAddress = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/address`, payload)
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
export const useUpdateAddress = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  AddressVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, AddressVariables>({
    mutationFn: async ({payload, onSuccess}: AddressVariables) => updateAddress(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['address'] as InvalidateQueryFilters)
      toast.success('Address Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
