import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {put} from '../axios'
// Define the variables that the mutation expects
interface UpdateBusinessCategoryVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
// Define the function with correct typing
const updateBusinessCategory = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/businesstype`, payload)
    if (res) {
      onSuccess('update')
      return true
    }
    throw new Error('Update failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useUpdateBusinessCategory = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  UpdateBusinessCategoryVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateBusinessCategoryVariables>({
    mutationFn: async ({payload, onSuccess}: UpdateBusinessCategoryVariables) =>
      updateBusinessCategory(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['businessCategories'] as InvalidateQueryFilters)
      toast.success('Business Category Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
