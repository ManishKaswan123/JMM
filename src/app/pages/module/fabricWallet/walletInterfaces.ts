import {JmmApiResponse, Status} from 'sr/utils/api/globalInterface'
import Wallet from './walletComponents/Wallet'

export interface WalletDetails {
  type: string
  owner_type: string
  owner_id: string
  wallet_db_id: string
  address: string
  status: Status
  createdAt: string
  updatedAt: string
  id: string
}
export interface WalletFormFields
  extends Omit<WalletDetails, 'wallet_db_id|address|createdAt|updatedAt|id'> {}
// API Response Types
export type FetchWalletResponse = JmmApiResponse<WalletDetails[]>
export type FetchSingleWalletResponse = JmmApiResponse<WalletDetails>

export interface WalletFilters {
  limit?: number
  page?: number
  sortBy?: string
  type?: string
  owner_type?: string
  owner_id?: string
  status?: Status
}

export interface UseWalletQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
