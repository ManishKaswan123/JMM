import React from 'react'

const UserDetailCardSkeleton: React.FC = () => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
      <h2 className='text-2xl font-bold mb-6'>
        User Details
        {/* Skeleton header placeholder */}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>User Name:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Name:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Email:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Phone:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Status:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
        </div>
        <div>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Created At:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Updated At:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>ID:</strong>
            <div className='skeleton-row w-28'></div>
          </p>
        </div>
      </div>

      {/* Skeleton for the button */}
      <div className='mt-8 flex justify-between items-center'>
        <div className='flex justify-center'>
          <div className='skeleton-button w-28'></div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailCardSkeleton
