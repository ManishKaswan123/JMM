import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {CompanyResponse, fetchSingleCompany} from 'sr/utils/api/fetchCompany'

const CompanyDetailCard: React.FC<any> = () => {
  const navigate = useNavigate()
  const {company_id} = useParams<{company_id: string}>()
  const [data, setData] = useState<CompanyResponse>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleCompany(company_id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [company_id])

  const onGoBack = () => {
    navigate('/company')
  }

  if (data === undefined)
    return (
      <SkeletonCard
        label='Company Details'
        col1={'Id,Company Name,User Name,Mobile Number,Email,Status'.split(',')}
        col2={'Business Type,Intent,Candidate Message,User Id,Created At,Updated At'.split(',')}
      />
    )
  if (isError) return <div>Error loading Company details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Company Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Id:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company Name:</strong>
            <p>{data.company_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>User Name:</strong>
            <p>{data.company_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Mobile Number:</strong>
            <p>{data?.mobile_number || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Email:</strong>
            <p>{data?.email || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Business Type:</strong>
            <p>{data.business_type?.join(', ')}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Intent:</strong>
            <p>{data.intent?.join(', ')}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Candidate Message:</strong>
            <p>{data.candidate_msg === true ? 'Yes' : 'No'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>User ID:</strong>
            <p>{data?.user_id || 'Not Available'}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data?.createdAt).toLocaleString() || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data?.updatedAt).toLocaleString() || 'Not Available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetailCard
