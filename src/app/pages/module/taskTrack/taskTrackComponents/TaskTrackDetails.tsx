import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleTaskTrack} from '../taskTrackHooks'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {Status} from 'sr/utils/api/globalInterface'

const TaskTrackDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleTaskTrack()

  if (isError)
    return <div className='text-red-500 text-center'>Error loading task Track details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='TaskTrack Details'
        col1={['ID', 'Supervisor Status', 'Contractor Status', 'Status']}
        col2={['Workorder', 'Work Completion Time', 'Created At', 'Updated At']}
      />
    )

  const details = [
    [
      {label: 'ID', value: data.id},
      {label: 'Supervisor Status', value: data.supervisor_status, isStatus: true},
      {label: 'Contractor Status', value: data.contractor_status, isStatus: true},
      {label: 'Status', value: data.status, isStatus: true},
    ],
    [
      {
        label: 'Workorder',
        value: data.workorder_id?.title,
        link: `/workorder/${data.workorder_id?._id}`,
      },
      {label: 'Work Completion Time', value: data.work_completion_time},

      {label: 'Created At', value: new Date(data.createdAt).toLocaleString()},
      {label: 'Updated At', value: new Date(data.updatedAt).toLocaleString()},
    ],
  ]

  return (
    <DetailCard
      title='Task Track Details'
      details={details}
      onGoBack={() => navigate('/tasktrack')}
    />
  )
}

export default TaskTrackDetailsCard
