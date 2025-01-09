import React from 'react'
import {Button} from 'sr/helpers'
import {Link} from 'react-router-dom'
import {IndividualJob} from 'sr/utils/api/individualJobApi'
interface IndividualJobDetailsProps {
  data: IndividualJob
  onGoBack: () => void
}
export const IndividualJobDetailsCard: React.FC<IndividualJobDetailsProps> = ({data, onGoBack}) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Individual Job Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Title:</strong>
            <p>{data.title}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Description:</strong>
            <p>{data.description}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Street Address:</strong>
            <p>{data.description}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Individual:</strong>
            <Link
              to={`/user/details/${data.individual_id._id}`}
              className='text-blue-500 hover:font-medium'
            >
              <p>
                {data.individual_id.first_name} {data.individual_id.last_name}
              </p>
            </Link>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Cleaner:</strong>
            <Link
              to={`/cleaner/${data.cleaner_id?._id}`}
              className='text-blue-500 hover:font-medium'
            >
              <p>{data.cleaner_id?.username}</p>
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Unit or Apt:</strong>
            <p>{data.unitorapt}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Schedule Data:</strong>
            <p>{data.schedule_date}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Work Status:</strong>
            <p>{data.work_status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Start Time:</strong>
            <p>{data.start_time}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{data.createdAt}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{data.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
