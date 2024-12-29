import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {put} from '../axios'
interface UpdateTasklistVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const updateTasklist = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/customer/tasklist`, payload)
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
export const useUpdateTasklist = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  UpdateTasklistVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateTasklistVariables>({
    mutationFn: async ({payload, onSuccess}: UpdateTasklistVariables) =>
      updateTasklist(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['tasklist'] as InvalidateQueryFilters)
      toast.success('Tasklist Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
