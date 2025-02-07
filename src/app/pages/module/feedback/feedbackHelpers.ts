import {FieldsArray} from 'sr/constants/fields'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {statuses} from 'sr/constants/common'
import {useMemo} from 'react'
import {FeedbackDetails, FeedbackFilters} from './feedbackInterfaces'

export const generateFeedbackFields = (
): {createAndUpdateFields: FieldsArray; filterFields: FieldsArray} => {
  const fieldConfigs = [
    {label: 'Contractor Rating', name: 'contractor_rating'},
    {label: 'Contractor Feedback', name: 'contractor_feedback'},
    {label: 'External Supervisor Rating', name: 'external_supervisor_rating'},
    {label: 'External Supervisor Feedback', name: 'external_supervisor_feedback'},
    {label: 'Internal Supervisor Rating', name: 'internal_supervisor_rating'},
    {label: 'Internal Supervisor Feedback', name: 'internal_supervisor_feedback'},
  ]

  const createAndUpdateFields = [
    ...fieldConfigs.map(({label, name}) => ({
      type: 'text',
      label,
      name,
      placeholder: `Enter ${label}`,
    })),
    {
      type: 'dropdown',
      label: 'status',
      name: statuses,
      topLabel: 'Status',
      placeholder: 'Select Status',
      labelKey: 'name',
    },
  ]
  const filterFields = createAndUpdateFields
    .filter((field) => !field.label.includes('Feedback')) // Remove fields with 'Feedback'
    .map((field) => ({...field, required: false})) // Set required: false for all
  return {createAndUpdateFields, filterFields}
}

export const handleApplyFeedbackFilter = (
  newFilters: FeedbackFilters,
  setFilters: React.Dispatch<React.SetStateAction<FeedbackFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<FeedbackFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateFeedback = (
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

export const handleEditFeedback = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: FeedbackDetails | null,
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

export const useFeedbackModalConfig = (
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  updateMutation: QueryMutationReturnType,
  selectedData: FeedbackDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMemo(
    () => [
      {
        key: 'create' as const,
        label: 'Create Feedback',
        onSubmit: (payload: any) =>
          handleCreateFeedback(payload, setModals, createMutation, setIsCreatingUpdating),
      },
      {
        key: 'update' as const,
        label: 'Update Feedback',
        onSubmit: (payload: any) =>
          handleEditFeedback(
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
