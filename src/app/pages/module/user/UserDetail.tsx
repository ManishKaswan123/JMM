import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchSingleIndividual, Individual} from 'sr/utils/api/individualApi'

const Custom: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<Individual>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleIndividual(id || '')
      .then((res) => {
        setData(res)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/user')
  }

  if (!data) return <div>Loading...</div>
  if (isError) return <div>Error loading individual details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Individual Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Individual ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Username:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>First Name:</strong>
            <p>{data.first_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Last Name:</strong>
            <p>{data.last_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Email:</strong>
            <p>{data.email}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Mobile Number:</strong>
            <p>{data.mobile_number}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Rooms Count:</strong>
            <p>{data.no_of_rooms}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Bathrooms Count:</strong>
            <p>{data.no_of_bath}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Total Area:</strong>
            <p>{data.total_area}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Remark:</strong>
            <p>{data.remark}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>User Id:</strong>
            <p>{data.user_id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserDetailCard: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/customer-details' />
}

export default UserDetailCard
