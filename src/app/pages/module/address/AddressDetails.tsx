import React from 'react'
import {AddressData} from 'sr/utils/api/addressApi'
import {Button} from 'sr/helpers'
import {Link} from 'react-router-dom'
interface AddressDetailsProps {
  address: AddressData
  onGoBack: () => void
}
export const AddressDetailsCard: React.FC<AddressDetailsProps> = ({address: data, onGoBack}) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Address Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Individual ID:</strong>
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
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 1:</strong>
            <p>{data.address.address_line_1}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 2:</strong>
            <p>{data.address.address_line_2}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Country:</strong>
            <p>{data.address.country}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>City:</strong>
            <p>{data.address.city}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>State:</strong>
            <p>{data.address.state}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Postal Code:</strong>
            <p>{data.address.postal}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Latitude:</strong>
            <p>{data.address.lat}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Longitude:</strong>
            <p>{data.address.lng}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
