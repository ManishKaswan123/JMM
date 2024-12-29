import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {post} from '../axios'
interface CreateCompanyVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const createCompanyDetails = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await post<any>(`/company/addlinfo`, payload)
    if (res.success === true) {
      toast.success('Company Details Created Successfully')
      onSuccess('create')
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}

// The useMutation hook with correct typing
export const useCreateCompanyDetails = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  CreateCompanyVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, CreateCompanyVariables>({
    mutationFn: async ({payload, onSuccess}) => createCompanyDetails(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['companyDetail'] as InvalidateQueryFilters)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
