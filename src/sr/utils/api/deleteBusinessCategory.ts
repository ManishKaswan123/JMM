import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {remove} from '../axios'
// Define the variables that the mutation expects

// Define the function with correct typing
const deleteBusinessCategory = async (payload: string): Promise<boolean> => {
  try {
    const res = await remove<any>(`/business-categories/${payload}`)
    return true
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useDeleteBusinessCategory = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  string // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, string>({
    mutationFn: async (payload: string) => deleteBusinessCategory(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['businessCategories'] as InvalidateQueryFilters)
      toast.success('Business Category Deleted Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
