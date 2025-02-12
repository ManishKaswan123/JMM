import {
  fetchSingleStripeCard,
  fetchStripeCard,
  useCreateStripeCard,
  useUpdateStripeCard,
} from './stripeCardApi'
import {useCallback, useMemo} from 'react'
import {generateStripeCardFields} from './stripeCardHelpers'
import {
  FetchSingleStripeCardResponse,
  FetchStripeCardResponse,
  StripeCardDetails,
  UseStripeCardQueryProps,
} from './stripeCardInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'

export const useStripeCardMutations = () => {
  const createMutation = useCreateStripeCard()
  const updateMutation = useUpdateStripeCard()
  return useMemo(() => ({createMutation, updateMutation}), [createMutation, updateMutation])
}

export const useStripeCardFields = () => {
  const stores = {}
  return useGenerateFields({
    stores,
    generateFieldsFunction: useCallback(generateStripeCardFields, []),
  })
}
export const useStripeCardQuery = (props: UseStripeCardQueryProps) =>
  useApiQuery<FetchStripeCardResponse>({
    queryKey: 'stripeCard',
    fetchFunction: fetchStripeCard,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleStripeCard = () =>
  useFetchSingleItem<StripeCardDetails, FetchSingleStripeCardResponse>({
    fetchFunction: fetchSingleStripeCard,
  })

export const useStripeCardDefaultValues = (selectedData: StripeCardDetails | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {} as StripeCardDetails
  }, [selectedData])
}
