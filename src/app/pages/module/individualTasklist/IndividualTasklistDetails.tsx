import React from 'react'
import {Button} from 'sr/helpers'
import {Link} from 'react-router-dom'
import {IndividualTasklist} from 'sr/utils/api/individualTasklistApi'
interface IndividualTasklistDetailsProps {
  data: IndividualTasklist
  onGoBack: () => void
}
export const IndividualTasklistDetailsCard: React.FC<IndividualTasklistDetailsProps> = ({
  data,
  onGoBack,
}) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Individual Tasklist Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Name:</strong>
            <p>{data.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Type:</strong>
            <p>{data.type}</p>
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
            <strong className='font-medium text-lg mr-2'>Checklist:</strong>
            <Link
              to={`/checklist/${data.checklist_id?._id}`}
              className='text-blue-500 hover:font-medium'
            >
              <p>{data.checklist_id?.name}</p>
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Description:</strong>
            <p>{data.description}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
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
