import {FieldsArray} from 'sr/constants/fields'
import {StripeCustomerDetails, StripeCustomerFilters} from './stripeCustomerInterfaces'
import {applyFilterAndResetPagination, toggleModal} from 'sr/helpers/globalHelpers'
import {Modals, PaginationType, QueryMutationReturnType} from 'sr/utils/api/globalInterface'
import {useMemo} from 'react'

export const generateStripeCustomerFields = (
  stores?: Record<string, any>
): {createAndUpdateFields: FieldsArray; filterFields: FieldsArray} => {
  const createAndUpdateFields = [
    ...['name', 'email', 'cleanpig_id'].map((label) => ({
      type: 'text',
      label: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      name: label,
      placeholder: `Select ${label.replace('_', ' ')}`,
      labelKey: 'name',
      id: 'id',
      required: true,
    })),
    {
      type: 'dropdown',
      label: 'type',
      name: [
        {
          name: 'Individual',
          id: 'individual',
        },
        {
          name: 'Company',
          id: 'company',
        },
      ],
      topLabel: 'Type',
      placeholder: 'Select type',
      labelKey: 'name',
      required: true,
    },
  ]

  const filterFields = [
    ...createAndUpdateFields
      .map((field) => ({...field, required: false}))
      .filter((field) => field.label === 'type'), // Ensure label is matched correctly
    {
      type: 'text',
      label: 'Stripe Customer ID',
      name: 'stripe_customer_id',
      placeholder: 'Stripe Customer ID',
      required: false,
    },
  ]

  return {createAndUpdateFields, filterFields}
}

export const handleApplyStripeCustomerFilter = (
  newFilters: StripeCustomerFilters,
  setFilters: React.Dispatch<React.SetStateAction<StripeCustomerFilters>>,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>
) => {
  applyFilterAndResetPagination<StripeCustomerFilters>(newFilters, setFilters, setPagination)
  toggleModal('filter', false, setModals)
}

export const handleCreateStripeCustomer = (
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

export const handleEditStripeCustomer = (
  payload: Record<string, any>,
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  updateMutation: QueryMutationReturnType,
  selectedData: StripeCustomerDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectedData === null) return toggleModal('update', false, setModals)
  setIsCreatingUpdating(true)
  updateMutation.mutate({
    payload: {...payload, id: selectedData._id},
    onSuccess: () => {
      setIsCreatingUpdating(false)
      toggleModal('update', false, setModals)
    },
  })
}

export const useStripeCustomerModalConfig = (
  setModals: React.Dispatch<React.SetStateAction<Modals>>,
  createMutation: QueryMutationReturnType,
  updateMutation: QueryMutationReturnType,
  selectedData: StripeCustomerDetails | null,
  setIsCreatingUpdating: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMemo(
    () => [
      {
        key: 'create' as const,
        label: 'Create StripeCustomer',
        onSubmit: (payload: any) =>
          handleCreateStripeCustomer(payload, setModals, createMutation, setIsCreatingUpdating),
      },
      {
        key: 'update' as const,
        label: 'Update StripeCustomer',
        onSubmit: (payload: any) =>
          handleEditStripeCustomer(
            payload,
            setModals,
            updateMutation,
            selectedData,
            setIsCreatingUpdating
          ),
      },
    ],
    [setModals, createMutation, updateMutation, selectedData, setIsCreatingUpdating]
  )
