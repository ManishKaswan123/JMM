import React from 'react'
import {Button} from 'sr/helpers'
import {CleanerEmployment} from 'sr/utils/api/cleanerEmploymentApi'
interface CleanerEmploymentDetailsProps {
  data: CleanerEmployment
  onGoBack: () => void
}
export const CleanerEmploymentDetailsCard: React.FC<CleanerEmploymentDetailsProps> = ({
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
      <h2 className='text-4xl font-bold mb-6 text-center'>Cleaner Employment Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Currently Employed:</strong>
            <p>{data.currently_employed}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company Name:</strong>
            <p>{data.company_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Job Title:</strong>
            <p>{data.job_title}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company Location:</strong>
            <p>{data.company_location}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Working Since Start:</strong>
            <p>{data.working_since_start}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Working Since End:</strong>
            <p>{data.working_since_end}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{data.updatedAt}</p>
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
