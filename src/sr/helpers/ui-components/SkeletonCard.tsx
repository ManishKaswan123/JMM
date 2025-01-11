import React from 'react'
interface SkeletonCardProps {
  label: string
  col1: string[]
  col2: string[]
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({label, col1, col2}) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>{label}</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          {col1.map((item, index) => {
            return (
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>{item}</strong>
                <div className='skeleton-row w-28'></div>
              </div>
            )
          })}
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          {col2.map((item, index) => {
            return (
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>{item}</strong>
                <div className='skeleton-row w-28'></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
