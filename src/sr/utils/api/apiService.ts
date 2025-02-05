import {get, post, put, remove} from 'sr/utils/axios/index'
import {filterPayload, handleApiError, invalidateQueryData} from 'sr/helpers/globalHelpers'
import {
  ApiMethod,
  QueryMutationReturnType,
  QueryPayloadVariables,
  UseApiQueryProps,
} from './globalInterface'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

export const apiService = async <T>(
  endpoint: string,
  payload?: Record<string, any>
): Promise<T> => {
  try {
    const res = await get<T>(endpoint, payload ? filterPayload(payload) : {})
    if ((res as any).success) return res
    throw new Error('Data not found')
  } catch (error) {
    handleApiError(error, `Failed to fetch ${endpoint}`)
    return Promise.reject(error)
  }
}

export const useApiMutation = (
  endpoint: string, // Dynamic API endpoint (e.g., '/taskmgmt')
  method: ApiMethod, // HTTP method (POST, PUT, DELETE)
  successMessage: string,
  queryKey?: string // Optional: Only required if we need to invalidate cache
): QueryMutationReturnType => {
  const queryClient = useQueryClient()

  return useMutation<boolean, Error, QueryPayloadVariables>({
    mutationFn: async ({payload, onSuccess}) => {
      try {
        const apiCall = method === 'post' ? post : method === 'put' ? put : remove
        const res = await apiCall<any>(endpoint, payload)

        if (res.success) {
          toast.success(successMessage)
          onSuccess?.(method) // Pass the method type on success
          return true
        }

        throw new Error(`${successMessage} failed`)
      } catch (error) {
        handleApiError(error, successMessage)
        return Promise.reject(error)
      }
    },
    onSuccess: () => {
      if (queryKey) invalidateQueryData(queryClient, queryKey)
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
export const useApiQuery = <T>({
  queryKey,
  fetchFunction,
  pagination,
  filters,
}: UseApiQueryProps<T>) => {
  return useQuery({
    queryKey: [
      queryKey,
      {limit: pagination?.itemsPerPage, page: pagination?.currentPage, ...filters},
    ],
    queryFn: () =>
      fetchFunction({limit: pagination?.itemsPerPage, page: pagination?.currentPage, ...filters}),
  })
}
interface UseFetchSingleItemProps<T> {
  fetchFunction: (id: string) => Promise<T>
}

export const useFetchSingleItem = <T>({fetchFunction}: UseFetchSingleItemProps<T>) => {
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<T | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchFunction(id)
      .then((res) => setData(res))
      .catch(() => setIsError(true))
  }, [id, fetchFunction])

  return {data, isError}
}
