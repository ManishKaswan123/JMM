import {fetchSingleWallet, fetchWallet, useCreateWallet, useUpdateWallet} from './walletApi'
import {useCallback, useMemo} from 'react'
import {
  FetchSingleWalletResponse,
  FetchWalletResponse,
  WalletDetails,
  UseWalletQueryProps,
  WalletFormFields,
} from './walletInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'
import {generateWalletFields} from './walletHelpers'

export const useWalletMutations = () => {
  const createMutation = useCreateWallet()
  const updateMutation = useUpdateWallet()
  return useMemo(() => ({createMutation, updateMutation}), [createMutation, updateMutation])
}

export const useWalletFields = () => {
  const stores = {}
  return useGenerateFields({
    stores,
    generateFieldsFunction: useCallback(generateWalletFields, []),
  })
}
export const useWalletQuery = (props: UseWalletQueryProps) =>
  useApiQuery<FetchWalletResponse>({
    queryKey: 'wallet',
    fetchFunction: fetchWallet,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleWallet = () =>
  useFetchSingleItem<WalletDetails, FetchSingleWalletResponse>({
    fetchFunction: fetchSingleWallet,
  })

export const useWalletDefaultValues = (selectedData: WalletFormFields | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {
      type: selectedData.type,
      owner_type: selectedData.owner_type,
      owner_id: selectedData.owner_id,
      status: selectedData.status,
    }
  }, [selectedData])
}
