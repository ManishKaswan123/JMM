import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'

const createCleaner = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await post<any>(`/cleaner`, payload)
    if (res.success === true) {
      toast.success('Cleaner Created Successfully')
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
  Record<string, any> // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, Record<string, any>>({
    mutationFn: async (payload: Record<string, any>) => createCleaner(payload),

    onSuccess: () => {
      queryClient.invalidateQueries(['cleaner'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
