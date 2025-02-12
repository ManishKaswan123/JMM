import {
  fetchSingleStripeCustomer,
  fetchStripeCustomer,
  useCreateStripeCustomer,
  useUpdateStripeCustomer,
} from './stripeCustomerApi'
import {useCallback, useMemo} from 'react'
import {generateStripeCustomerFields} from './stripeCustomerHelpers'
import {
  FetchSingleStripeCustomerResponse,
  FetchStripeCustomerResponse,
  StripeCustomerDetails,
  UseStripeCustomerQueryProps,
} from './stripeCustomerInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'

export const useStripeCustomerMutations = () => {
  const createMutation = useCreateStripeCustomer()
  const updateMutation = useUpdateStripeCustomer()

  return useMemo(() => ({createMutation, updateMutation}), [createMutation, updateMutation])
}

export const useStripeCustomerFields = () => {
  const stores = {} // Fetch workorder and task store data

  return useGenerateFields({
    stores,
    generateFieldsFunction: useCallback(generateStripeCustomerFields, []),
  })
}
export const useStripeCustomerQuery = (props: UseStripeCustomerQueryProps) =>
  useApiQuery<FetchStripeCustomerResponse>({
    queryKey: 'stripeCustomer',
    fetchFunction: fetchStripeCustomer,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleStripeCustomer = () =>
  useFetchSingleItem<StripeCustomerDetails[], FetchSingleStripeCustomerResponse>({
    fetchFunction: fetchSingleStripeCustomer,
    key: 'stripe_customer_id',
  })

export const useStripeCustomerDefaultValues = (selectedData: StripeCustomerDetails | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {
      name: selectedData.stripe_data.name,
      email: selectedData.stripe_data.email,
      cleanpig_id: selectedData.cleanpig_id,
      type: selectedData.type,
    }
  }, [selectedData])
}
