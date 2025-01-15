import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {fetchSingleJob, JobResponse} from 'sr/utils/api/fetchJobs'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'

const JobDetailsCard: React.FC<any> = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<JobResponse>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleJob(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/job')
  }

  if (!data)
    return (
      <SkeletonCard
        label='Job Details'
        col1={'Company Id,Job ID,Job Title,Job Types,Schedule,Employment Type,Start Date,Pay by,Exact Amount & Rate'.split(
          ','
        )}
        col2={'Benefits,Application Call Mobile,Require Resume,Notifications,Email,Status,Created At,Update At'.split(
          ','
        )}
      />
    )
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
            <strong className='font-medium text-lg mr-2'>Company Id:</strong>
            <p>{data.company_id.company_name || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Job ID:</strong>
            <p>{data.id || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Job Title:</strong>
            <p>{data.job_title || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Job Types:</strong>
            <p>{data.job_type?.join(', ') || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Schedule:</strong>
            <p>{data.schedule?.join(', ') || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Employment Type:</strong>
            <p>{data.employment_type?.join(', ') || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Start Date:</strong>
            <p>{new Date(data.start_date).toLocaleString() || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Pay by:</strong>
            <p>{data.show_pay_by || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Exact Amount & Rate:</strong>
            <p>
              {data.exact_amount || 'Not Available'} {data.rate || ''}
            </p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Benefits:</strong>
            <p>{data.benefits?.join(', ') || 'Not Available'}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Application Call Mobile:</strong>
            <p>{data.application_call_mobile_number || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Require Resume:</strong>
            <p>{data.require_resume ? 'Yes' : 'No'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Notifications:</strong>
            <p>{data.notifications ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Email:</strong>
            <p>{data.email || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{data.createdAt || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Update At:</strong>
            <p>{data.updatedAt || 'Not Available'}</p>
          </div>
        </div>
      </div>
      <div className='mt-2'>
        <strong className='font-medium text-lg mr-2'>Job Description:</strong>
        <p>{data.job_description || 'Not Available'}</p>
      </div>
      {/* Associated Entities */}
      <h3 className='text-2xl font-bold mt-8 mb-4'>Job Advanced Details</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Hire Count:</strong>
            <p>{data.job_advanced_id?.hire_count || 'Not Available'}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'> Status:</strong>
            <p>{data.job_advanced_id?.status || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Recruitment Timeline:</strong>
            <p>
              {new Date(data.job_advanced_id?.recruitment_timeline).toLocaleString() ||
                'Not Available'}
            </p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Supplemental Pay:</strong>
            <p>{data.job_advanced_id?.supplemental_pay.join(', ') || 'Not Available'}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Application Deadline:</strong>
            <p>
              {new Date(data.job_advanced_id?.application_deadline).toLocaleString() ||
                'Not Available'}
            </p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.job_advanced_id?.createdAt).toLocaleString() || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.job_advanced_id?.updatedAt).toLocaleString() || 'Not Available'}</p>
          </div>
        </div>
      </div>
      <h3 className='text-2xl font-bold mt-8 mb-4'>Reporting Address</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 1:</strong>
            <p>{data.job_advanced_id?.reporting_address.address_line_1 || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 2:</strong>
            <p>{data.job_advanced_id?.reporting_address.address_line_2 || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Country:</strong>
            <p>{data.job_advanced_id?.reporting_address.country || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>City:</strong>
            <p>{data.job_advanced_id?.reporting_address.city || 'Not Available'}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>State:</strong>
            <p>{data.job_advanced_id?.reporting_address.state || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Postal Code:</strong>
            <p>{data.job_advanced_id?.reporting_address.postal || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Latitude:</strong>
            <p>{data.job_advanced_id?.reporting_address.lat || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Longitute:</strong>
            <p>{data.job_advanced_id?.reporting_address.lng || 'Not Available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsCard
