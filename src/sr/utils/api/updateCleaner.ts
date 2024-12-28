import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {put} from '../axios'
interface UpdateCleanerVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const updateCleaner = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/cleaner`, payload)
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
export const useUpdateCleaner = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  UpdateCleanerVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateCleanerVariables>({
    mutationFn: async ({payload, onSuccess}: UpdateCleanerVariables) =>
      updateCleaner(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleaner'] as InvalidateQueryFilters)
      toast.success('Cleaner Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
