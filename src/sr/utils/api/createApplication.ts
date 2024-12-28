import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'
// Define the variables that the mutation expects

interface CreateApplicationVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
// Define the function with correct typing
const createApplication = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/application`, payload)
    if (res.success === true) {
      toast.success(res.msg)
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateApplication = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CreateApplicationVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CreateApplicationVariables>({
    mutationFn: async ({payload, onSuccess}) => createApplication(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['application'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
