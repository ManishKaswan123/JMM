import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {
  fetchSingleTaskTrack,
  fetchTaskTrack,
  useCreateTaskTrack,
  useUpdateTaskTrack,
} from './taskTrackApi'
import {useActions} from 'sr/utils/helpers/useActions'
import {useCallback, useEffect, useMemo} from 'react'
import {generateTaskTrackFields} from './taskTrackHelpers'
import {
  FetchSingleTaskTrackResponse,
  FetchTaskTrackResponse,
  TaskTrackDetails,
  UseTaskTrackQueryProps,
} from './taskTrackInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'

export const useTaskTrackMutations = () => {
  const createMutation = useCreateTaskTrack()
  const updateMutation = useUpdateTaskTrack()
  return {createMutation, updateMutation}
}

export const useTaskTrackStoreData = () => {
  // Fetch the stores using useSelector
  const workorderStore = useSelector((state: RootState) => state.workorder)

  // Actions to fetch data
  const {fetchWorkorderData} = useActions()

  // Function to fetch data if it's not already loaded
  const fetchTaskTrackDataIfNeeded = useCallback(() => {
    if (workorderStore.status !== 'succeeded') fetchWorkorderData({})
  }, [workorderStore.status, fetchWorkorderData])

  // Run the fetch logic when needed
  useEffect(() => {
    fetchTaskTrackDataIfNeeded()
  }, [fetchTaskTrackDataIfNeeded])

  // Return the workorderStore, taskStore, and the fetch function
  return {workorderStore}
}

export const useTaskTrackFields = () => {
  const stores = useTaskTrackStoreData() // Fetch workorder and task store data

  return useGenerateFields({
    stores,
    generateFieldsFunction: generateTaskTrackFields,
  })
}
export const useTaskTrackQuery = (props: UseTaskTrackQueryProps) =>
  useApiQuery<FetchTaskTrackResponse>({
    queryKey: 'taskTrack',
    fetchFunction: fetchTaskTrack,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleTaskTrack = () =>
  useFetchSingleItem<TaskTrackDetails, FetchSingleTaskTrackResponse>({
    fetchFunction: fetchSingleTaskTrack,
  })

export const useTaskTrackDefaultValues = (selectedData: TaskTrackDetails | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {
      workorder_id: selectedData.workorder_id?._id,
      contractor_status: selectedData.contractor_status,
      supervisor_status: selectedData.supervisor_status,
      work_completion_time: selectedData.work_completion_time,
      status: selectedData.status,
    }
  }, [selectedData])
}
