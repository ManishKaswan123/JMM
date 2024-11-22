import React from 'react'
interface SkeletonTableProps {
  title: string
}

const SkeletonTable: React.FC<SkeletonTableProps> = (props) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              <div>Name</div>
            </th>
            {props.title != 'Sub Category' && (
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                <div>Attachments</div>
              </th>
            )}

            <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              <div>Created At</div>
            </th>
            <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              <div>Updated At</div>
            </th>
            <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              <div> Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({length: 8}).map((_, index) => (
            <tr key={index} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='skeleton-row'></div>
              </td>
              {props.title != 'Sub Category' && (
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
              )}

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

export default SkeletonTable
