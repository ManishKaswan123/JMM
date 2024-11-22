import React from 'react'

interface SkeletonEightySixTableProps {
  rowCount?: number
}

const SkeletonEightySixTable: React.FC<SkeletonEightySixTableProps> = ({rowCount = 8}) => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Title
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Quantity
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Willing To Pay
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Delivery
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Published
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length: rowCount}).map((_, index) => (
              <tr key={index} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='p-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SkeletonEightySixTable
