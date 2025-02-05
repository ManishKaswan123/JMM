import {statusColors} from 'sr/constants/common'
import {TaskMgmtDetails} from './taskMgmtInterfaces'
import {getStatusName} from 'sr/helpers/globalHelpers'

export const taskMgmtTableColumns = [
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
    statusColors: statusColors,
    getStatusName,
  },
  {
    label: 'Supervisor Status',
    key: 'supervisor_status' as keyof TaskMgmtDetails,
    statusColors: statusColors,
    getStatusName,
  },
  {
    label: 'Status',
    key: 'status' as keyof TaskMgmtDetails,
    statusColors: statusColors,
    getStatusName,
  },
]
export const taskMgmtSkeletonTableColumns = [
  'Contractor',
  'Workorder',
  'Task',
  'Contractor Status',
  'Supervisor Status',
  'Status',
  'Actions',
]
