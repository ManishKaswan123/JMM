import React from 'react'

interface SkeletonJobsTableProps {
  rowCount?: number
}

const SkeletonWorkOrderTable: React.FC<SkeletonJobsTableProps> = ({rowCount = 8}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Title
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Description
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Contractor Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Checklist Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Customer Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SkeletonWorkOrderTable
