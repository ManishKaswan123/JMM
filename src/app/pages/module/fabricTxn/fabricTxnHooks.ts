import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {
  fetchSingleFabricTxn,
  fetchFabricTxn,
  useCreateFabricTxn,
  useUpdateFabricTxn,
} from './fabricTxnApi'
import {useActions} from 'sr/utils/helpers/useActions'
import {useCallback, useEffect, useMemo} from 'react'
import {generateFabricTxnFields} from './fabricTxnHelpers'
import {
  FetchSingleFabricTxnResponse,
  FetchFabricTxnResponse,
  FabricTxnDetails,
  UseFabricTxnQueryProps,
  FabricTxnForm,
} from './fabricTxnInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'

export const useFabricTxnMutations = () => {
  const createMutation = useCreateFabricTxn()
  const updateMutation = useUpdateFabricTxn()
  return useMemo(() => ({createMutation, updateMutation}), [createMutation, updateMutation])
}

export const useFabricTxnStoreData = () => {
  // Fetch the stores using useSelector
  const workorderStore = useSelector((state: RootState) => state.workorder)

  // Actions to fetch data
  const {fetchWorkorderData} = useActions()

  // Function to fetch data if it's not already loaded
  const fetchFabricTxnDataIfNeeded = useCallback(() => {
    if (workorderStore.status !== 'succeeded') fetchWorkorderData({})
  }, [workorderStore.status, fetchWorkorderData])

  // Run the fetch logic when needed
  useEffect(() => {
    fetchFabricTxnDataIfNeeded()
  }, [fetchFabricTxnDataIfNeeded])

  // Return the workorderStore, taskStore, and the fetch function
  return {workorderStore}
}

export const useFabricTxnFields = () => {
  const stores = useFabricTxnStoreData() // Fetch workorder and task store data

  return useGenerateFields({
    stores,
    generateFieldsFunction: useCallback(generateFabricTxnFields, []),
  })
}
export const useFabricTxnQuery = (props: UseFabricTxnQueryProps) =>
  useApiQuery<FetchFabricTxnResponse>({
    queryKey: 'fabricTxn',
    fetchFunction: fetchFabricTxn,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleFabricTxn = () =>
  useFetchSingleItem<FabricTxnDetails, FetchSingleFabricTxnResponse>({
    fetchFunction: fetchSingleFabricTxn,
  })

export const useFabricTxnDefaultValues = (selectedData: FabricTxnForm | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {
      from: selectedData.from,
      to: selectedData.to,
      amount: selectedData.amount,
      tokenId: selectedData.tokenId,
      workorderId: selectedData.workorder_id,
      data: selectedData.data,
      type: selectedData.type,
    }
  }, [selectedData])
}
