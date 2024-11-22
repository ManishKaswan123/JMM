import React from 'react'

interface SkeletonChatTableProps {
  rowCount?: number
}

const SkeletonChatTable: React.FC<SkeletonChatTableProps> = ({rowCount = 8}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
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
              Message
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Images
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              86 Response
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Source Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Msg Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Created At
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SkeletonChatTable
