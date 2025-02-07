import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleFeedback} from '../feedbackHooks'

const FeedbackDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleFeedback()

  if (isError)
    return <div className='text-red-500 text-center'>Error loading task mgmt details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='Feedback Details'
        col1={[
          'ID',
          'Contractor Rating',
          'Contractor Feedback',
          'External Supervisor Rating',
          'External Supervisor Feedback',
          'Internal Supervisor Rating',
          'Internal Supervisor Feedback',
        ]}
        col2={['Status', 'Workorder', 'Contractor', 'Supervisor', 'Created At', 'Updated At']}
      />
    )

  const details = [
    [
      {label: 'ID', value: data.id},
      {label: 'Contractor Rating', value: data.contractor_rating},
      {label: 'Contractor Feedback', value: data.contractor_feedback},
      {label: 'External Supervisor Rating', value: data.external_supervisor_rating},
      {label: 'External Supervisor Feedback', value: data.external_supervisor_feedback},
      {label: 'Internal Supervisor Rating', value: data.internal_supervisor_rating},
      {label: 'Internal Supervisor Feedback', value: data.internal_supervisor_feedback},
    ],
    [
      {label: 'Status', value: data.status, isStatus: true},
      {
        label: 'Workorder',
        value: data.workorder_id,
        link: `/workorder/${data.workorder_id}`,
      },
      {
        label: 'Contractor',
        value: data.contractor_id,
        link: `/contractor/details/${data.contractor_id}`,
      },
      {
        label: 'Supervisor',
        value: data.supervisor_id,
        link: `/supervisor/${data.supervisor_id}`,
      },
      {label: 'Created At', value: new Date(data.createdAt).toLocaleString()},
      {label: 'Updated At', value: new Date(data.updatedAt).toLocaleString()},
    ],
  ]

  return (
    <DetailCard title='Feedback Details' details={details} onGoBack={() => navigate('/Feedback')} />
  )
}

export default FeedbackDetailsCard
