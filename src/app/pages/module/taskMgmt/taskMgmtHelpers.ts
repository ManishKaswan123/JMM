import {FieldsArray} from 'sr/constants/fields'
import {
  GenerateTaskMmgtFieldsProps,
  TaskMgmtDetails,
  TaskMgmtFilters,
  TaskMgmtStatus,
  TaskMgmtSubStatus,
} from './taskMgmtInterfaces'
import {taskMgmtstatuses, taskMgmtsubStatuses} from './taskMgmtConstants'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'

export const generateTaskMgmtFields = ({
  workorderData,
  taskData,
  isFilter = false,
}: GenerateTaskMmgtFieldsProps): FieldsArray => {
  const dropdowns = [
    {label: 'workorder_id', topLabel: 'Workorder', data: workorderData, key: 'workorder_name'},
    {label: 'task_id', topLabel: 'Task', data: taskData, key: 'task_name'},
  ].map(({label, topLabel, data, key}) => ({
    type: 'dropdown',
    label,
    name: data,
    topLabel,
    placeholder: `Select ${topLabel}`,
    labelKey: key,
    id: 'id',
    required: !isFilter,
  }))

  return [
    ...dropdowns,
    ...['contractor_status', 'supervisor_status'].map((label) => ({
      type: 'dropdown',
      label,
      name: taskMgmtsubStatuses,
      topLabel: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      placeholder: `Select ${label.replace('_', ' ')}`,
      labelKey: 'name',
      id: 'id',
      required: !isFilter,
    })),
    {
      type: 'dropdown',
      label: 'status',
      name: taskMgmtstatuses,
      topLabel: 'Status',
      placeholder: 'Select Status',
      labelKey: 'name',
      required: !isFilter,
    },
  ]
}
export const handleApplyTaskMgmtFilter = (
  newFilters: TaskMgmtFilters,
  setFilters: React.Dispatch<React.SetStateAction<TaskMgmtFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<TaskMgmtFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateTaskMgmt = (
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

export const handleEditTaskMgmt = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: TaskMgmtDetails | null,
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
// Function to get the display name for the status
export const getTaskMgmtStatusName = (statusId: TaskMgmtStatus) => {
  return taskMgmtstatuses.find((status) => status.id === statusId)?.name || statusId
}
export const getTaskMgmtSubStatusName = (statusId: TaskMgmtSubStatus) => {
  return taskMgmtsubStatuses.find((status) => status.id === statusId)?.name || statusId
}
