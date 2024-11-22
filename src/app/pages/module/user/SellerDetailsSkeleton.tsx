import React from 'react'

const SellerDetailsSkeleton: React.FC = () => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-3/4 h-1/2'>
      <h2 className='text-2xl font-bold mb-6'>Seller Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Store Name:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Business Owner:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Legal Business Name:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Business Owner DOB:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Store Hours:</strong>{' '}
            <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>EIN:</strong> <div className='skeleton-row w-28'></div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>E-Signature:</strong>
            <div className='flex items-center ml-1'>
              <div className='skeleton-row w-28'></div>
            </div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>SMS Authorization:</strong>
            <div className='flex items-center ml-1'>
              <div className='skeleton-row w-28'></div>
            </div>
          </p>
          <p className='mb-4 flex space-x-2'>
            <strong className='font-medium'>Fee Consent:</strong>
            <div className='flex items-center ml-1'>
              <div className='skeleton-row w-28'></div>
            </div>
          </p>
        </div>
        <div>
          <div className='mb-4 space-y-2'>
            <strong className='font-semibold'>Store Address:</strong>
            <p className='flex space-x-2'>
              <span className='font-medium'>Street: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>City: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>State: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>Zip: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>Country: </span>
              <div className='skeleton-row w-28'></div>
            </p>
          </div>
          <div className='mb-4 space-y-2'>
            <strong className='font-semibold'>Business Address:</strong>
            <p className='flex space-x-2'>
              <span className='font-medium'>Street: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>City: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>State: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>Zip: </span>
              <div className='skeleton-row w-28'></div>
            </p>
            <p className='flex space-x-2'>
              <span className='font-medium'>Country: </span>
              <div className='skeleton-row w-28'></div>
            </p>
          </div>
          <div className='flex flex-col'>
            <div className='mb-4 flex space-x-2'>
              <strong className='font-medium mr-2'>Attachment1:</strong>
              <div className='skeleton-row w-28'></div>
            </div>
            <div className='mb-4 flex space-x-2'>
              <strong className='font-medium mr-2'>Attachment2:</strong>
              <div className='skeleton-row w-28'></div>
            </div>
            <div className='mb-4 flex space-x-2'>
              <strong className='font-medium mr-2'>Attachment3:</strong>
              <div className='skeleton-row w-28'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 flex justify-between items-center'>
        <div className='flex justify-center'>
          <div className='skeleton-button w-28'></div>
        </div>
        <div className='flex'>
          <div className='mx-2'>
            <div className='skeleton-button w-28'></div>
          </div>
          <div className='mx-2'>
            <div className='skeleton-button w-28'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDetailsSkeleton
