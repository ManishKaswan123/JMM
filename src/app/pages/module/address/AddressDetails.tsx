import React from 'react'
import {Address} from 'sr/utils/api/addressApi'
import {Button} from 'sr/helpers'
interface AddressDetailsProps {
  address: Address
  onGoBack: () => void
}
export const AddressDetailsCard: React.FC<AddressDetailsProps> = ({address, onGoBack}) => {
  return (
    <>
      {address && (
        <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
          <h2 className='text-2xl font-bold mb-6'>Address Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className='mb-4'>
                <strong className='font-medium'>Address Line 1:</strong>{' '}
                {address.address_line_1 || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Address Line 2:</strong>{' '}
                {address.address_line_2 || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Country:</strong> {address.country || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>City:</strong> {address.city || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>State:</strong> {address.state || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Postal Code:</strong> {address.postal || 'N/A'}
              </p>
            </div>
            <div>
              <p className='mb-4'>
                <strong className='font-medium'>Latitude:</strong> {address.lat || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Longitude:</strong> {address.lng || 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Address ID:</strong> {address._id || 'N/A'}
              </p>
            </div>
          </div>

          <div className='mt-8 items-center'>
            <div className='flex justify-between'>
              <Button
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                onClick={onGoBack}
                label={'Go Back 🡸'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
