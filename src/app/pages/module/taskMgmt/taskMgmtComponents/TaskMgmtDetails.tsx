import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleTaskMgmt} from '../taskMgmtHooks'
import {getTaskMgmtStatusName} from '../taskMgmtHelpers'
import {TaskMgmtStatus} from '../taskMgmtInterfaces'

const TaskMgmtDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleTaskMgmt()

  if (isError)
    return <div className='text-red-500 text-center'>Error loading task mgmt details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='TaskMgmt Details'
        col1={['ID', 'Contractor Status', 'Supervisor Status', 'Status', 'Contractor']}
        col2={['Workorder', 'Task', 'Created At', 'Updated At']}
      />
    )

  const details = [
    [
      {label: 'ID', value: data.id},
      {label: 'Contractor Status', value: data.contractor_status},
      {label: 'Supervisor Status', value: data.supervisor_status},
      {label: 'Status', value: getTaskMgmtStatusName(data.status as TaskMgmtStatus)},
      {
        label: 'Contractor',
        value: data.contractor_id?.first_name + ' ' + data.contractor_id?.last_name,
        link: `/contractor/details/${data.contractor_id?._id}`,
      },
    ],
    [
      {
        label: 'Workorder',
        value: data.workorder_id?.title,
        link: `/workorder/${data.workorder_id?._id}`,
      },
      {
        label: 'Task',
        value: data.task_id?.name,
        link: `/task/${data.task_id?._id}`,
      },
      {label: 'Created At', value: new Date(data.createdAt).toLocaleString()},
      {label: 'Updated At', value: new Date(data.updatedAt).toLocaleString()},
    ],
  ]

  return (
    <DetailCard
      title='Task Management Details'
      details={details}
      onGoBack={() => navigate('/taskmgmt')}
    />
  )
}

export default TaskMgmtDetailsCard
