import React from 'react'

const InvitationCouponsSkeleton: React.FC = () => {
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
                Invitation Code
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                No. of Max Usage
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                No. of Times Used
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Exp Date
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created By
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length: 8}).map((_, index) => (
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
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
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

export default InvitationCouponsSkeleton
