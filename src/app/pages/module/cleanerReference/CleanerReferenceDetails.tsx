import React from 'react'
import {Button} from 'sr/helpers'
import {CleanerReference} from 'sr/utils/api/cleanerReferenceApi'
interface CleanerReferenceDetailsProps {
  data: CleanerReference
  onGoBack: () => void
}
export const CleanerReferenceDetailsCard: React.FC<CleanerReferenceDetailsProps> = ({
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
      <h2 className='text-4xl font-bold mb-6 text-center'>Cleaner Reference Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>ID:</strong>
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
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Mobile:</strong>
            <p>{data.mobile_number}</p>
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
