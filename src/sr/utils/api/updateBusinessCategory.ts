import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {patch} from '../axios'
// Define the variables that the mutation expects
interface UpdateBusinessCategoryVariables {
  payload: Record<string, any>
  id: string
}
// Define the function with correct typing
const updateBusinessCategory = async (
  payload: Record<string, any>,
  id: string
): Promise<boolean> => {
  try {
    const res = await patch<any>(`/business-categories/${id}`, payload)
    if (res) {
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
    mutationFn: async ({payload, id}: UpdateBusinessCategoryVariables) =>
      updateBusinessCategory(payload, id),

    onSuccess: () => {
      queryClient.invalidateQueries(['businessCategories'] as InvalidateQueryFilters)
      toast.success('Business Category Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
