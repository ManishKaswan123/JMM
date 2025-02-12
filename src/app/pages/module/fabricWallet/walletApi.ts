import {FetchSingleWalletResponse, FetchWalletResponse} from './walletInterfaces'
import {QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {apiService, useApiMutation} from 'sr/utils/api/apiService'

// Fetch Task Management List
export const fetchWallet = (payload: Record<string, any>): Promise<FetchWalletResponse> =>
  apiService<FetchWalletResponse>('/wallet/fabric', payload)

// Fetch Single Task Management Entry
export const fetchSingleWallet = (id: string): Promise<FetchSingleWalletResponse> =>
  apiService<FetchSingleWalletResponse>('/wallet/fabric', {id})

// Create Task Management Hook
export const useCreateWallet = (): QueryMutationReturnType =>
  useApiMutation('/wallet/fabric', 'post', 'Wallet Created Successfully', 'wallet')

// Update Task Management Hook
export const useUpdateWallet = (): QueryMutationReturnType =>
  useApiMutation('/wallet/fabric', 'put', 'Wallet Updated Successfully', 'wallet')

// Delete Task Management Hook
export const useDeleteWallet = (): QueryMutationReturnType =>
  useApiMutation('/wallet/fabric', 'delete', 'Wallet Deleted Successfully', 'wallet')
