import {FieldsArray} from 'sr/constants/fields'
import {FabricTxnDetails, FabricTxnFilters} from './fabricTxnInterfaces'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {useMemo} from 'react'

export const generateFabricTxnFields = (
  stores: Record<string, any>
): {createAndUpdateFields: FieldsArray; filterFields: FieldsArray} => {
  const {workorderStore} = stores
  const dropdowns = [
    {
      label: 'workorder_id',
      topLabel: 'Workorder',
      data: workorderStore.data,
      key: 'workorder_name',
    },
  ].map(({label, topLabel, data, key}) => ({
    type: 'dropdown',
    label,
    name: data,
    topLabel,
    placeholder: `Select ${topLabel}`,
    labelKey: key,
    id: 'id',
    required: true,
  }))

  const createAndUpdateFields = [
    ...dropdowns,
    ...['from', 'to', 'amount', 'tokenId', 'data', 'type'].map((label) => ({
      type: 'text',
      label: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      name: label,
      placeholder: `${label.replace('_', ' ')}`,
      required: true,
    })),

    {
      type: 'text',
      label: 'Work Completion Time',
      name: 'work_completion_time',
      placeholder: 'Enter Work Completion Time',
      required: true,
    },
  ]
  const filterFields = createAndUpdateFields.map((field) => ({...field, required: false})) // Set required: false for all
  return {createAndUpdateFields, filterFields}
}

export const handleApplyFabricTxnFilter = (
  newFilters: FabricTxnFilters,
  setFilters: React.Dispatch<React.SetStateAction<FabricTxnFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<FabricTxnFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateFabricTxn = (
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

export const handleEditFabricTxn = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: FabricTxnDetails | null,
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

export const useFabricTxnModalConfig = (
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  updateMutation: QueryMutationReturnType,
  selectedData: FabricTxnDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMemo(
    () => [
      {
        key: 'create' as const,
        label: 'Create FabricTxn',
        onSubmit: (payload: any) =>
          handleCreateFabricTxn(payload, setModals, createMutation, setIsCreatingUpdating),
      },
      {
        key: 'update' as const,
        label: 'Update Fabric Txn',
        onSubmit: (payload: any) =>
          handleEditFabricTxn(
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
