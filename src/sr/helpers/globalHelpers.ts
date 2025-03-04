import {InvalidateQueryFilters, QueryClient} from '@tanstack/react-query'
import {useMemo} from 'react'
import {statuses} from 'sr/constants/common'
import {FieldsArray} from 'sr/constants/fields'
import {pathSet} from 'sr/layout/components/aside/constant'
import {Modals, PaginationType, Status} from 'sr/utils/api/globalInterface'
import {useUrlItems} from 'sr/utils/helpers/useUrlItems'

// Helper function for filtering payload
export const filterPayload = (payload: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
// Generic API Call Wrapper
export const handleApiError = (error: any, message: string) => {
  const errorMsg = error instanceof Error ? error.message : 'Unknown error'
  throw new Error(`${message}: ${errorMsg}`)
}
// Helper function to invalidate query data
export const invalidateQueryData = (queryClient: QueryClient, key: string) => {
  queryClient.invalidateQueries([key] as InvalidateQueryFilters)
}

export const onPageChange = (
  pageNumber: number,
  setPagination: (value: React.SetStateAction<PaginationType>) => void
) => {
  setPagination((prev) => ({...prev, currentPage: pageNumber}))
}
export const onLimitChange = (
  newLimit: number,
  setPagination: (value: React.SetStateAction<PaginationType>) => void
) => {
  setPagination({currentPage: 1, itemsPerPage: newLimit})
}
// Toggle modal states dynamically
export const toggleModal = (
  key: string,
  value: boolean,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  setModals((prev) => ({...prev, [key]: value}))
}
export const applyFilterAndResetPagination = <
  TFilters // Generic type for filters (this will be inferred based on passed argument)
>(
  newFilters: TFilters, // Dynamic type for filters
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>, // Set the filters state using dynamic type
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>> // Set the pagination state
) => {
  setFilters(newFilters)
  setPagination((prev) => ({...prev, currentPage: 1})) // Reset to page 1 when filters are applied
}

interface UseGenerateFieldsProps {
  stores: Record<string, any> // Store slices dynamically
  generateFieldsFunction: (storeData: Record<string, any>) => {
    createAndUpdateFields: FieldsArray
    filterFields: FieldsArray
  }
}

export const useGenerateFields = ({stores, generateFieldsFunction}: UseGenerateFieldsProps) => {
  return useMemo(() => generateFieldsFunction(stores), [stores, generateFieldsFunction])
}
// Function to get the display name for the status
export const getStatusName = (statusId: Status) => {
  return statuses.find((status) => status.id === statusId)?.name || statusId
}
export const useIsMasterInUse = () => {
  const urlItems = useUrlItems()
  return useMemo(() => pathSet.has(urlItems[0]), [urlItems])
}
