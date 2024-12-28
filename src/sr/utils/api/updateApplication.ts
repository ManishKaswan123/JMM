import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {put} from '../axios'
// Define the variables that the mutation expects
interface UpdateApplicationVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
// Define the function with correct typing
const updateApplication = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/application`, payload)
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
export const useUpdateApplication = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  UpdateApplicationVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateApplicationVariables>({
    mutationFn: async ({payload, onSuccess}: UpdateApplicationVariables) =>
      updateApplication(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['application'] as InvalidateQueryFilters)
      toast.success('Application Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
