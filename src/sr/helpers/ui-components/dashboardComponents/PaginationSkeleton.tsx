import React from 'react'

const PaginationSkeleton: React.FC = () => {
  return (
    <div className='px-2 py-2 bg-white shadow-sm '>
      <div className='flex items-center justify-between'>
        {/* Left side - Showing entries skeleton */}
        <div className='h-4 w-1/4 bg-gray-300 rounded animate-pulse'></div>

        {/* Right side - Pagination buttons skeleton */}
        <div className='flex items-center space-x-2'>
          {/* Previous button skeleton */}
          <div className='h-8 w-20 bg-gray-300 rounded animate-pulse'></div>

          {/* Pagination numbers skeleton */}
          {Array.from({length: 5}).map((_, index) => (
            <div key={index} className='h-8 w-8 bg-gray-300 rounded animate-pulse'></div>
          ))}

          {/* Next button skeleton */}
          <div className='h-8 w-20 bg-gray-300 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default PaginationSkeleton
