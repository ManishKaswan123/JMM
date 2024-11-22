import React from 'react'

const UserDetailsSkeleton: React.FC = () => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-3/4 h-1/2'>
      <h2 className='text-2xl font-bold mb-6'>
        User Details
        {/* <div className='skeleton-header'></div> */}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Name:</strong> <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Email:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Phone:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Role:</strong> <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Source:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Country:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Email Verified:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Phone Verified:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Become Verified:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Seller Status:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
        </div>
        <div>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Location:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Business Type:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Category:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Created At:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Updated At:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Seller Payment Plan ID:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>ID:</strong> <div className='skeleton-row w-28'></div>
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

export default UserDetailsSkeleton
