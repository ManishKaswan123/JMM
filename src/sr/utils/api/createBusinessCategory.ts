import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'
// Define the variables that the mutation expects

// Define the function with correct typing
const createBusinessCategory = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await post<any>(`/business-categories`, payload)
    if (res) {
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateBusinessCategory = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  Record<string, any> // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => createBusinessCategory(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['businessCategories'] as InvalidateQueryFilters)
      toast.success('Business Category Created Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
