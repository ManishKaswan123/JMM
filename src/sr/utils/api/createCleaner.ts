import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'
interface CreateCleanerVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createCleaner = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/cleaner`, payload)
    if (res.success === true) {
      toast.success('Cleaner Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateCleaner = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CreateCleanerVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CreateCleanerVariables>({
    mutationFn: async ({payload, onSuccess}) => createCleaner(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleaner'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
