// import {FetchSingleFabricTxnResponse, FetchFabricTxnResponse} from './fabricTxnInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'
import {
  FetchSingleFabricTxnResponse,
  FetchFabricTxnResponse,
} from '../fabricTxn/fabricTxnInterfaces'

// Fetch Task Management List
export const fetchFabricTxn = (payload: Record<string, any>): Promise<FetchFabricTxnResponse> =>
  apiService<FetchFabricTxnResponse>('/wallet/fabric/transaction', payload)

// Fetch Single Task Management Entry
export const fetchSingleFabricTxn = (id: string): Promise<FetchSingleFabricTxnResponse> =>
  apiService<FetchSingleFabricTxnResponse>('/wallet/fabric/transaction', {id})

// Create Task Management Hook
export const useCreateFabricTxn = (): QueryMutationReturnType =>
  useApiMutation(
    '/wallet/fabric/transaction',
    'post',
    'Fabric Txn Created Successfully',
    'fabricTxn'
  )

// Update Task Management Hook
export const useUpdateFabricTxn = (): QueryMutationReturnType =>
  useApiMutation(
    '/wallet/fabric/transaction',
    'put',
    'Fabric Txn Updated Successfully',
    'fabricTxn'
  )

// Delete Task Management Hook
export const useDeleteFabricTxn = (): QueryMutationReturnType =>
  useApiMutation(
    '/wallet/fabric/transaction',
    'delete',
    'Fabric Txn Deleted Successfully',
    'fabricTxn'
  )
