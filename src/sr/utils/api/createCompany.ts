import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'
// Define the variables that the mutation expects

interface CreateCompanyVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
// Define the function with correct typing
const createCompany = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/company`, payload)
    if (res.success === true) {
      toast.success('Company Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateCompany = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CreateCompanyVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CreateCompanyVariables>({
    mutationFn: async ({payload, onSuccess}) => createCompany(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['company'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
