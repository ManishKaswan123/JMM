import {FieldsArray} from 'sr/constants/fields'
import {TaskTrackDetails, TaskTrackFilters} from './taskTrackInterfaces'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {statuses} from 'sr/constants/common'
import {useMemo} from 'react'

export const generateTaskTrackFields = (
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
    ...['contractor_status', 'supervisor_status'].map((label) => ({
      type: 'dropdown',
      label,
      name: statuses,
      topLabel: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      placeholder: `Select ${label.replace('_', ' ')}`,
      labelKey: 'name',
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

export const handleApplyTaskTrackFilter = (
  newFilters: TaskTrackFilters,
  setFilters: React.Dispatch<React.SetStateAction<TaskTrackFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<TaskTrackFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateTaskTrack = (
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

export const handleEditTaskTrack = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: TaskTrackDetails | null,
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

export const useTaskTrackModalConfig = (
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  updateMutation: QueryMutationReturnType,
  selectedData: TaskTrackDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMemo(
    () => [
      {
        key: 'create' as const,
        label: 'Create TaskTrack',
        onSubmit: (payload: any) =>
          handleCreateTaskTrack(payload, setModals, createMutation, setIsCreatingUpdating),
      },
      {
        key: 'update' as const,
        label: 'Update TaskList',
        onSubmit: (payload: any) =>
          handleEditTaskTrack(
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
