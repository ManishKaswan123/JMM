import React from 'react'

interface SkeletonEightySixResponseTableProps {
  rowCount?: number
}

const SkeletonEightySixResponseTable: React.FC<SkeletonEightySixResponseTableProps> = ({
  rowCount = 8,
}) => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Sender
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Receiver
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Eighty Six
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Cart Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Read By Sender
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Read By Receiver
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Offer Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Delivery Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length: rowCount}).map((_, index) => (
              <tr key={index} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
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

export default SkeletonEightySixResponseTable
