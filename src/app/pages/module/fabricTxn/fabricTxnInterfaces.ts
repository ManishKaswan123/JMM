import {JmmApiResponse} from 'sr/utils/api/globalInterface'
import {WorkOrderResponse} from 'sr/utils/api/fetchWorkOrder'

interface UpdatedWorkorder extends Omit<WorkOrderResponse, 'id'> {
  _id: string
}

export interface FabricTxnDetails {
  from: string
  to: string
  amount: number
  tokenId: string
  workorder_id: UpdatedWorkorder
  data: string
  type: string
  last4: string
  brand: string
  blockchain_transaction: any
  createdAt: string
  updatedAt: string
  id: string
}
export interface FabricTxnForm
  extends Omit<FabricTxnDetails, 'blockchain_transaction' | 'createdAt' | 'updatedAt' | 'id'> {}

// API Response Types
export type FetchFabricTxnResponse = JmmApiResponse<FabricTxnDetails[]>
export type FetchSingleFabricTxnResponse = JmmApiResponse<FabricTxnDetails>

export interface FabricTxnFilters {
  limit?: number
  page?: number
  sortBy?: string
  workorder_id?: string
  type?: string
  amount?: number
  from?: string
  to?: string
}

// export interface GenerateFabricTxnFieldsProps {
//   workorderData: {workorder_name: string; id: string}[]
//   isFilter?: boolean
// }
export interface UseFabricTxnQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
