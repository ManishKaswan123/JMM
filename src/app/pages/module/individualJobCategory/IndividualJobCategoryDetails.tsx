import React from 'react'
import {Button} from 'sr/helpers'
import {IndividualJobCategory} from 'sr/utils/api/individualJobCategoryApi'
interface IndividualJobCategoryDetailsProps {
  data: IndividualJobCategory
  onGoBack: () => void
}
export const IndividualJobCategoryDetailsCard: React.FC<IndividualJobCategoryDetailsProps> = ({
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
      <h2 className='text-4xl font-bold mb-6 text-center'>Individual JobCategory Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Name:</strong>
            <p>{data.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Icon Path:</strong>
            <p>{data.icon_path}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
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
