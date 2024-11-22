import React from 'react'

const UserTableSkeleton: React.FC = () => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>User Name</div>
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>Role</div>
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>Email</div>
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>phone</div>
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>Seller Status</div>
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>User Detail</div>
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>Seller Detail</div>
              </th>
            </tr>
          </thead>

          {/* Table body */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTableSkeleton
