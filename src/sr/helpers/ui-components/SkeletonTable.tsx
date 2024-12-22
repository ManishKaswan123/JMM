import React from 'react'

interface SkeletonTableProps {
  columns: string[] // List of column headers
  rowCount?: number // Number of skeleton rows to render (default: 8)
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({columns, rowCount = 8}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({length: rowCount}).map((_, rowIndex) => (
            <tr key={rowIndex} className='odd:bg-white even:bg-gray-50'>
              {columns.map((_, colIndex) => (
                <td key={colIndex} className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='skeleton-row'></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SkeletonTable
