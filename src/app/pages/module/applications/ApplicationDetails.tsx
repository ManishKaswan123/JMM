import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {fetchSingleApplication, JobApplication} from 'sr/utils/api/fetchApplications'

const ApplicationDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<JobApplication>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleApplication(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/application')
  }

  if (!data) return <div>Loading...</div>
  if (isError) return <div>Error loading application details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Application Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Application ID:</strong>
            <p>{data._id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Job Details:</strong>
            <p>{data.job_id.job_title || 'N/A'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Cleaner Details:</strong>
            <p>{`${data.cleaner_id.first_name} ${data.cleaner_id.last_name}`}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Version:</strong>
            <p>{data.__v}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Answers:</strong>
            <p>{data.answers.length > 0 ? data.answers.join(', ') : 'No answers provided'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetailsCard
