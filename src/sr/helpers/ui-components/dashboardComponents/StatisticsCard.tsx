import React from 'react'
import {FaSync} from 'react-icons/fa'

interface StatisticsProps {
  type: string
  amount: number | string
  percentage: number | string
  barColor: string
}

interface StatisticsCardProps {
  data?: StatisticsProps[]
  title: string
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({data, title}) => {
  const fetching = !data || data.length === 0

  if (fetching)
    return (
      <div className='bg-white shadow rounded-lg p-6 overflow-clip'>
        <div className='animate-pulse'>
          {/* Skeleton Title */}
          <div className='px-4 mb-4 h-6 bg-gray-200 rounded w-1/4'></div>
          {/* Skeleton Table */}
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                <th className='px-4 py-3'>
                  <div className='h-4 bg-gray-200 rounded w-20'></div>
                </th>
                <th className='px-4 py-3'>
                  <div className='h-4 bg-gray-200 rounded w-20'></div>
                </th>
                <th className='px-4 py-3'>
                  <div className='h-4 bg-gray-200 rounded w-20'></div>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {[...Array(4)].map((_, index) => (
                <tr key={index}>
                  <td className='px-4 py-4'>
                    <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                  </td>
                  <td className='px-4 py-4 flex items-center'>
                    <div className='w-16 h-2 bg-gray-200 rounded-full mr-2'></div>
                    {/* <div className='h-4 bg-gray-200 rounded w-10'></div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

  return (
    <div className='bg-white shadow rounded-lg p-6 overflow-clip'>
      <h2 className='px-4 text-xl font-semibold mb-4'>{title}</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Amount
            </th>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Percentage
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map((user, index) => (
            <tr key={index}>
              <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {user.type}
              </td>
              <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>{user.amount}</td>
              <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center'>
                <div className='w-16 mr-1 h-2 bg-gray-200 rounded-full'>
                  <div
                    className={`h-full rounded-full ${user.barColor}`}
                    style={{width: fetching ? '0%' : user.percentage}}
                  ></div>
                </div>
                {user.percentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatisticsCard
