import {UseMutationResult} from '@tanstack/react-query'

export interface JmmApiResponse<T> {
  success: boolean
  data: T
  pagination: {
    total: number
    page: number
    pageSize: number
    sort: Record<string, number>
  }
}
export interface QueryPayloadVariables {
  payload: Record<string, any>
  onSuccess: (action: string) => void
}
export type QueryMutationReturnType = UseMutationResult<boolean, Error, QueryPayloadVariables>
export interface PaginationType {
  currentPage: number
  itemsPerPage: number
}
export interface Modals {
  create: boolean
  update: boolean
  filter: boolean
}
