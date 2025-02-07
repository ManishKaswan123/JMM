import {statusColors} from 'sr/constants/common'
import {TaskTrackDetails} from './taskTrackInterfaces'
import {getStatusName} from 'sr/helpers/globalHelpers'

export const taskTrackTableColumns = [
  {
    label: 'Workorder',
    key: 'workorder_id' as keyof TaskTrackDetails,
    linkProps: {
      isLink: true,
      linkPrefix: '/workorder',
      linkValueKey: 'title',
    },
  },
  {
    label: 'Work Completion Time',
    key: 'work_completion_time' as keyof TaskTrackDetails,
  },

  {
    label: 'Contractor Status',
    key: 'contractor_status' as keyof TaskTrackDetails,
    statusColors: statusColors,
    getStatusName,
  },
  {
    label: 'Supervisor Status',
    key: 'supervisor_status' as keyof TaskTrackDetails,
    statusColors: statusColors,
    getStatusName,
  },

  {
    label: 'Status',
    key: 'status' as keyof TaskTrackDetails,
    statusColors: statusColors,
    getStatusName,
  },
]
export const taskTrackSkeletonTableColumns = [
  'Workorder',
  'Work Completion Time',
  'Contractor Status',
  'Supervisor Status',

  'Status',
  'Actions',
]
