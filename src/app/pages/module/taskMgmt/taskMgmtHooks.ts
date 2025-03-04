import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {
  fetchSingleTaskMgmt,
  fetchTaskMgmt,
  useCreateTaskMgmt,
  useUpdateTaskMgmt,
} from './taskMgmtApi'
import {useActions} from 'sr/utils/helpers/useActions'
import {useCallback, useEffect, useMemo} from 'react'
import {generateTaskMgmtFields} from './taskMgmtHelpers'
import {
  FetchSingleTaskMgmtResponse,
  FetchTaskMgmtResponse,
  TaskMgmtDetails,
  UseTaskMgmtQueryProps,
} from './taskMgmtInterfaces'
import {useApiQuery, useFetchSingleItem} from 'sr/utils/api/apiService'
import {useGenerateFields} from 'sr/helpers/globalHelpers'

export const useTaskMgmtMutations = () => {
  const createMutation = useCreateTaskMgmt()
  const updateMutation = useUpdateTaskMgmt()

  return useMemo(() => ({createMutation, updateMutation}), [createMutation, updateMutation])
}

export const useTaskMgmtStoreData = () => {
  // Fetch the stores using useSelector
  const workorderStore = useSelector((state: RootState) => state.workorder)
  const taskStore = useSelector((state: RootState) => state.task)

  // Actions to fetch data
  const {fetchWorkorderData, fetchTaskData} = useActions()

  // Function to fetch data if it's not already loaded
  const fetchTaskMgmtDataIfNeeded = useCallback(() => {
    if (workorderStore.status !== 'succeeded') fetchWorkorderData({})
    if (taskStore.status !== 'succeeded') fetchTaskData({})
  }, [workorderStore.status, fetchWorkorderData, taskStore.status, fetchTaskData])

  // Run the fetch logic when needed
  useEffect(() => {
    fetchTaskMgmtDataIfNeeded()
  }, [fetchTaskMgmtDataIfNeeded])

  // Return the workorderStore, taskStore, and the fetch function
  return {workorderStore, taskStore}
}

export const useTaskMgmtFields = () => {
  const stores = useTaskMgmtStoreData() // Fetch workorder and task store data

  return useGenerateFields({
    stores,
    generateFieldsFunction: useCallback(generateTaskMgmtFields, []),
  })
}
export const useTaskMgmtQuery = (props: UseTaskMgmtQueryProps) =>
  useApiQuery<FetchTaskMgmtResponse>({
    queryKey: 'taskMgmt',
    fetchFunction: fetchTaskMgmt,
    pagination: props.pagination,
    filters: props.filters,
  })

export const useFetchSingleTaskMgmt = () =>
  useFetchSingleItem<TaskMgmtDetails, FetchSingleTaskMgmtResponse>({
    fetchFunction: fetchSingleTaskMgmt,
  })

export const useTaskMgmtDefaultValues = (selectedData: TaskMgmtDetails | null) => {
  return useMemo(() => {
    if (selectedData === null) return undefined

    return {
      contractor_id: selectedData.contractor_id?._id,
      workorder_id: selectedData.workorder_id?._id,
      task_id: selectedData.task_id?._id,
      contractor_status: selectedData.contractor_status,
      supervisor_status: selectedData.supervisor_status,
      status: selectedData.status,
    }
  }, [selectedData])
}
