import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchJobs, fetchSingleJob, JobAdvancedDetails} from 'sr/utils/api/fetchJobs'

const JobDetails: React.FC<any> = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<JobAdvancedDetails>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleJob(id || '')
      .then((res) => {
        setData(res.data.job_advanced_id)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/jobs')
  }
  console.log(data)
  if (data === undefined) return <div>Loading...</div>
  if (isError) return <div>Error loading job details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Job Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Job ID:</strong>
            <p>{data?.job_id || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Reporting Address:</strong>
            <p>
              {`${data?.reporting_address?.address_line_1}, ` +
                `${data?.reporting_address?.city}, ` +
                `${data?.reporting_address?.state}, ` +
                `${data?.reporting_address?.country} `}
            </p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Postal Code:</strong>
            <p>{data?.reporting_address?.postal || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Latitude:</strong>
            <p>{data?.reporting_address?.lat}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Longitude:</strong>
            <p>{data?.reporting_address?.lng}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Hire Count:</strong>
            <p>{data?.hire_count}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Recruitment Timeline:</strong>
            <p>{new Date(data?.recruitment_timeline).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Application Deadline:</strong>
            <p>{new Date(data?.application_deadline).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data?.status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data?.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* <div className='mt-8'>
        <Button
          onClick={() => console.log('Edit functionality placeholder')}
          label='Edit Details'
          className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full'
        />
      </div> */}
    </div>
  )
}

const JobDetailsCard: React.FC = () => {
  return <DashboardWrapper customComponent={JobDetails} selectedItem='/job-details' />
}

export default JobDetailsCard
