import {TaskMgmtStatus, TaskMgmtSubStatus} from './taskMgmtInterfaces'

export const taskMgmtstatuses: {name: string; id: TaskMgmtStatus}[] = [
  {name: 'Active', id: 'active'},
  {name: 'In Progress', id: 'in progress'},
  {name: 'Publish', id: 'publish'},
]

export const taskMgmtsubStatuses: {name: string; id: TaskMgmtSubStatus}[] = [
  {name: 'Completed', id: 'completed'},
  {name: 'Pending', id: 'pending'},
]
export const taskMgmtStatusColors: Record<TaskMgmtStatus, string> = {
  active: 'text-green-700',
  'in progress': 'text-yellow-700 ',
  publish: 'text-blue-700 ',
}
export const taskMgmtSubStatusColors: Record<TaskMgmtSubStatus, string> = {
  completed: 'text-green-700 ',
  pending: 'text-yellow-700 ',
}
