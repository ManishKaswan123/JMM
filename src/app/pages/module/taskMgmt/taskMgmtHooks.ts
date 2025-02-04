import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {fetchTaskMgmt, useCreateTaskMgmt, useUpdateTaskMgmt} from './taskMgmtApi'
import {useActions} from 'sr/utils/helpers/useActions'
import {useCallback, useEffect, useMemo} from 'react'
import {generateTaskMgmtFields} from './taskMgmtHelpers'
import {useQuery} from '@tanstack/react-query'
import {TaskMgmtDetails, UseTaskMgmtQueryProps} from './taskMgmtInterfaces'
import {fetchTaskList} from 'sr/utils/api/fetchTaskList'

export const useTaskMgmtMutations = () => {
  const createMutation = useCreateTaskMgmt()
  const updateMutation = useUpdateTaskMgmt()
  return {createMutation, updateMutation}
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
  const {workorderStore, taskStore} = useTaskMgmtStoreData()

  const createAndUpdateFields = useMemo(
    () => generateTaskMgmtFields({workorderData: workorderStore.data, taskData: taskStore.data}),
    [workorderStore.data, taskStore.data]
  )

  const filterFields = useMemo(
    () =>
      generateTaskMgmtFields({
        workorderData: workorderStore.data,
        taskData: taskStore.data,
        isFilter: true,
      }),
    [workorderStore.data, taskStore.data]
  )

  return {createAndUpdateFields, filterFields}
}
export const useTaskMgmtQuery = ({pagination, filters}: UseTaskMgmtQueryProps) => {
  const {data, isLoading} = useQuery({
    queryKey: [
      'taskMgmt',
      {limit: pagination.itemsPerPage, page: pagination.currentPage, ...filters},
    ],
    queryFn: async () =>
      fetchTaskMgmt({
        limit: pagination.itemsPerPage,
        page: pagination.currentPage,
        ...filters,
      }),
  })

  return {data, isLoading}
}

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
