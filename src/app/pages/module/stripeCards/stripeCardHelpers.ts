import {FieldsArray} from 'sr/constants/fields'
import {StripeCardDetails, StripeCardFilters} from './stripeCardInterfaces'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {useMemo} from 'react'

export const generateStripeCardFields = (
  stores: Record<string, any>
): {createAndUpdateFields: FieldsArray; filterFields: FieldsArray} => {
  return {} as {createAndUpdateFields: FieldsArray; filterFields: FieldsArray}
}

export const handleApplyStripeCardFilter = (
  newFilters: StripeCardFilters,
  setFilters: React.Dispatch<React.SetStateAction<StripeCardFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<StripeCardFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateStripeCard = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsCreatingUpdating(true)
  createMutation.mutate({
    payload,
    onSuccess: () => {
      setIsCreatingUpdating(false)
      toggleModal('create', false, setModals)
    },
  })
}

export const handleEditStripeCard = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: StripeCardDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectedData === null) return toggleModal('update', false, setModals)
  setIsCreatingUpdating(true)
  updateMutation.mutate({
    payload: {...payload, id: selectedData.id},
    onSuccess: () => {
      setIsCreatingUpdating(false)
      toggleModal('update', false, setModals)
    },
  })
}

export const useStripeCardModalConfig = (
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  updateMutation: QueryMutationReturnType,
  selectedData: StripeCardDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMemo(
    () => [
      {
        key: 'create' as const,
        label: 'Create StripeCard',
        onSubmit: (payload: any) =>
          handleCreateStripeCard(payload, setModals, createMutation, setIsCreatingUpdating),
      },
      {
        key: 'update' as const,
        label: 'Update TaskList',
        onSubmit: (payload: any) =>
          handleEditStripeCard(
            payload,
            setModals,
            updateMutation,
            selectedData,
            setIsCreatingUpdating
          ),
      },
    ],
    [createMutation, selectedData, setModals, setIsCreatingUpdating, updateMutation]
  )
