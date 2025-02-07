import {statusColors} from 'sr/constants/common'
import {FeedbackDetails} from './feedbackInterfaces'
import {getStatusName} from 'sr/helpers/globalHelpers'

export const FeedbackTableColumns = [
  // {
  //   label: 'Contractor',
  //   key: 'contractor_id' as keyof FeedbackDetails,
  //   linkProps: {
  //     isLink: true,
  //     linkPrefix: '/contractor/details',
  //     linkValueKey: 'first_name',
  //   },
  // },
  // {
  //   label: 'Workorder',
  //   key: 'workorder_id' as keyof FeedbackDetails,
  //   linkProps: {
  //     isLink: true,
  //     linkPrefix: '/workorder',
  //     linkValueKey: 'title',
  //   },
  // },
  // {
  //   label: 'Task',
  //   key: 'task_id' as keyof FeedbackDetails,
  //   linkProps: {
  //     isLink: true,
  //     linkPrefix: '/task',
  //     linkValueKey: 'name',
  //   },
  // },
  {
    label: 'Contractor Rating',
    key: 'contractor_rating' as keyof FeedbackDetails,
  },
  {
    label: 'Contractor Feedback',
    key: 'contractor_feedback' as keyof FeedbackDetails,
  },
  {
    label: 'External Supervisor Rating',
    key: 'external_supervisor_rating' as keyof FeedbackDetails,
  },
  {
    label: 'External Supervisor Feedback',
    key: 'external_supervisor_feedback' as keyof FeedbackDetails,
  },
  {
    label: 'Internal Supervisor Rating',
    key: 'internal_supervisor_rating' as keyof FeedbackDetails,
  },
  {
    label: 'Internal Supervisor Feedback',
    key: 'internal_supervisor_feedback' as keyof FeedbackDetails,
  },
  {
    label: 'Status',
    key: 'status' as keyof FeedbackDetails,
    statusColors: statusColors,
    getStatusName,
  },
]
export const FeedbackSkeletonTableColumns = [
  'Contractor Rating',
  'Contractor Feedback',
  'Supervisor Rating',
  'Supervisor Feedback',
  'Status',
  'Actions',
]
