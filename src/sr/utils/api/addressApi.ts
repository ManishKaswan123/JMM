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

    if (res.success && res.data && res.data.length > 0) {
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
const createAddress = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await post<any>(`/address`, payload)
    if (res.success === true) {
      toast.success('Address Created Successfully')
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
  Record<string, any> // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => createAddress(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['address'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

interface UpdateAddressVariables {
  payload: Record<string, any>
}
// Define the function with correct typing
const updateAddress = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await put<any>(`/address`, payload)
    if (res.success === true) {
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
  UpdateAddressVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateAddressVariables>({
    mutationFn: async ({payload}: UpdateAddressVariables) => updateAddress(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['address'] as InvalidateQueryFilters)
      toast.success('Address Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
