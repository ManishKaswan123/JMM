import {FieldsArray} from 'sr/constants/fields'
import {WalletDetails, WalletFilters} from './walletInterfaces'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {useMemo} from 'react'
import {statuses} from 'sr/constants/common'

export const generateWalletFields = (
  stores: Record<string, any>
): {createAndUpdateFields: FieldsArray; filterFields: FieldsArray} => {
  const createAndUpdateFields = [
    ...['type', 'owner_type', 'owner_id'].map((label) => ({
      type: 'text',
      label: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      name: label,
      placeholder: `Select ${label.replace('_', ' ')}`,
      id: 'id',
      required: true,
    })),
    {
      type: 'dropdown',
      label: 'status',
      name: statuses,
      topLabel: 'Status',
      placeholder: 'Select Status',
      labelKey: 'name',
      required: true,
    },
  ]
  const filterFields = createAndUpdateFields.map((field) => ({...field, required: false}))

  return {createAndUpdateFields, filterFields}
}

export const handleApplyWalletFilter = (
  newFilters: WalletFilters,
  setFilters: React.Dispatch<React.SetStateAction<WalletFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<WalletFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateWallet = (
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

export const handleEditWallet = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: WalletDetails | null,
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

export const useWalletModalConfig = (
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  updateMutation: QueryMutationReturnType,
  selectedData: WalletDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMemo(
    () => [
      {
        key: 'create' as const,
        label: 'Create Wallet',
        onSubmit: (payload: any) =>
          handleCreateWallet(payload, setModals, createMutation, setIsCreatingUpdating),
      },
      {
        key: 'update' as const,
        label: 'Update Wallet',
        onSubmit: (payload: any) =>
          handleEditWallet(payload, setModals, updateMutation, selectedData, setIsCreatingUpdating),
      },
    ],
    [createMutation, selectedData, setModals, setIsCreatingUpdating, updateMutation]
  )
