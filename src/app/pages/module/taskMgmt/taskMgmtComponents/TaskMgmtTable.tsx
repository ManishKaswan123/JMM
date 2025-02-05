import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {TaskMgmtDetails} from '../taskMgmtInterfaces'
import {getTaskMgmtStatusName, getTaskMgmtSubStatusName} from '../taskMgmtHelpers'
import {taskMgmtStatusColors, taskMgmtSubStatusColors} from '../taskMgmtConstants'
import GlobalTable from 'sr/helpers/ui-components/Table'

interface Props {
  data?: TaskMgmtDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<TaskMgmtDetails | null>>
  setIsUpdateModalOpen: (value: boolean) => void
}

const TaskMgmtTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const columns = [
    {
      label: 'Contractor',
      key: 'contractor_id' as keyof TaskMgmtDetails,
      linkProps: {
        isLink: true,
        linkPrefix: '/contractor/details',
        linkValueKey: 'first_name',
      },
    },
    {
      label: 'Workorder',
      key: 'workorder_id' as keyof TaskMgmtDetails,
      linkProps: {
        isLink: true,
        linkPrefix: '/workorder',
        linkValueKey: 'title',
      },
    },
    {
      label: 'Task',
      key: 'task_id' as keyof TaskMgmtDetails,
      linkProps: {
        isLink: true,
        linkPrefix: '/task',
        linkValueKey: 'name',
      },
    },
    {
      label: 'Contractor Status',
      key: 'contractor_status' as keyof TaskMgmtDetails,
      statusColors: taskMgmtSubStatusColors,
      getStatusName: getTaskMgmtSubStatusName,
    },
    {
      label: 'Supervisor Status',
      key: 'supervisor_status' as keyof TaskMgmtDetails,
      statusColors: taskMgmtSubStatusColors,
      getStatusName: getTaskMgmtSubStatusName,
    },
    {
      label: 'Status',
      key: 'status' as keyof TaskMgmtDetails,
      statusColors: taskMgmtStatusColors,
      getStatusName: getTaskMgmtStatusName,
    },
    {
      label: 'Actions',
      key: 'actions' as keyof TaskMgmtDetails,
      actions: [
        {
          icon: FaEdit,
          onClick: (item: TaskMgmtDetails) => {
            setSelectedData(item)
            setIsUpdateModalOpen(true)
          },
          tooltip: 'Edit Task',
        },
        {
          icon: FaEye,
          linkPrefix: '/taskmgmt',
          tooltip: 'View Task',
        },
      ],
    },
  ]

  return <GlobalTable<TaskMgmtDetails> data={data} columns={columns} />
}

export default TaskMgmtTable
