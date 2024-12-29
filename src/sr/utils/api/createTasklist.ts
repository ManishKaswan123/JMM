import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'
interface CreateTasklistVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createTasklist = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/customer/tasklist`, payload)
    if (res.success === true) {
      toast.success('Tasklist Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateTasklist = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CreateTasklistVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CreateTasklistVariables>({
    mutationFn: async ({payload, onSuccess}) => createTasklist(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['tasklist'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
