import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {put} from '../axios'
interface UpdateCompanyVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
const updateCompanyDetails = async (
  payload: Record<string, any>,
  onSuccess: (action: string) => void
): Promise<boolean> => {
  try {
    const res = await put<any>(`/company/addlinfo`, payload)
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
export const useUpdateCompanyDetails = (): UseMutationResult<
  boolean, // The type of the data returned on success
  Error, // The type of the error that could be thrown
  UpdateCompanyVariables // The type of the variables passed to the mutation
> => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, UpdateCompanyVariables>({
    mutationFn: async ({payload, onSuccess}: UpdateCompanyVariables) =>
      updateCompanyDetails(payload, onSuccess),

    onSuccess: () => {
      queryClient.invalidateQueries(['companyDetail'] as InvalidateQueryFilters)
      toast.success('Company Details Updated Successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
