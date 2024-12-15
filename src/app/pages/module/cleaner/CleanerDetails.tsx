import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {CleanerDetails, fetchSingleCleaner} from 'sr/utils/api/fetchCleaner'

const Custom: React.FC<any> = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<CleanerDetails>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleCleaner(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/cleaner')
  }

  if (data === undefined) return <div>Loading...</div>
  if (isError) return <div>Error loading cleaner details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Cleaner Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Username:</strong>
            <p>{data?.username || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>First Name:</strong>
            <p>{data?.first_name || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Last Name:</strong>
            <p>{data?.last_name || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Mobile Number:</strong>
            <p>{data?.mobile_number || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Email:</strong>
            <p>{data?.email || 'Not Available'}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Date of Birth:</strong>
            <p>{data?.date_of_birth || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>User ID:</strong>
            <p>{data?.user_id || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data?.status || 'Not Available'}</p>
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

      <div className='mt-8'>
        <h3 className='text-2xl font-bold mb-4'>Address</h3>
        <div className='space-y-2'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Street:</strong>
            <p>{data?.address?.street || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>City:</strong>
            <p>{data?.address?.city || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>State:</strong>
            <p>{data?.address?.state || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Country:</strong>
            <p>{data?.address?.country || 'Not Available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CleanerDetailsCard: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/cleaner-details' />
}

export default CleanerDetailsCard
