import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {
  fetchSingleFeedback,
  fetchFeedback,
  useCreateFeedback,
  useUpdateFeedback,
} from './feedbackApi'
import {useActions} from 'sr/utils/helpers/useActions'
import {useCallback, useEffect, useMemo} from 'react'
import {generateFeedbackFields} from './feedbackHelpers'
import {
  FetchSingleFeedbackResponse,
  FetchFeedbackResponse,
  FeedbackDetails,
  UseFeedbackQueryProps,
} from './feedbackInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'

export const useFeedbackMutations = () => {
  const createMutation = useCreateFeedback()
  const updateMutation = useUpdateFeedback()

  return useMemo(() => ({createMutation, updateMutation}), [createMutation, updateMutation])
}

export const useFeedbackStoreData = () => {
  // Fetch the stores using useSelector
  const workorderStore = useSelector((state: RootState) => state.workorder)

  // Actions to fetch data
  const {fetchWorkorderData} = useActions()

  // Function to fetch data if it's not already loaded
  const fetchFeedbackDataIfNeeded = useCallback(() => {
    if (workorderStore.status !== 'succeeded') fetchWorkorderData({})
  }, [workorderStore.status, fetchWorkorderData])

  // Run the fetch logic when needed
  useEffect(() => {
    fetchFeedbackDataIfNeeded()
  }, [fetchFeedbackDataIfNeeded])

  // Return the workorderStore, taskStore, and the fetch function
  return {workorderStore}
}

export const useFeedbackFields = () => {
  const stores = useFeedbackStoreData() // Fetch workorder and task store data

  return useGenerateFields({
    stores,
    generateFieldsFunction: useCallback(generateFeedbackFields, []),
  })
}
export const useFeedbackQuery = (props: UseFeedbackQueryProps) =>
  useApiQuery<FetchFeedbackResponse>({
    queryKey: 'feedback',
    fetchFunction: fetchFeedback,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleFeedback = () =>
  useFetchSingleItem<FeedbackDetails, FetchSingleFeedbackResponse>({
    fetchFunction: fetchSingleFeedback,
  })

export const useFeedbackDefaultValues = (selectedData: FeedbackDetails | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {
      workorder_id: selectedData.workorder_id,
      contractor_id: selectedData.contractor_id,
      supervisor_id: selectedData.supervisor_id,
      contractor_rating: selectedData.contractor_rating,
      contractor_feedback: selectedData.contractor_feedback,
      external_supervisor_rating: selectedData.external_supervisor_rating,
      external_supervisor_feedback: selectedData.external_supervisor_feedback,
      internal_supervisor_rating: selectedData.internal_supervisor_rating,
      internal_supervisor_feedback: selectedData.internal_supervisor_feedback,
      status: selectedData.status,
    }
  }, [selectedData])
}
