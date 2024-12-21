import React, {useCallback, useEffect, useState} from 'react'
import {FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

interface ProposalDetailsResponse {
  cleaner_id: string
  descrption: string
  expected_rate: string
  createdAt: string
  updatedAt: string
  id: string
}

interface Props {
  data?: ProposalDetailsResponse[]
}

const ProposalDetailsTable: React.FC<Props> = ({data}) => {
  const cleanerMap = useSelector((state: RootState) => state.cleaner.idNameMap)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const {fetchCleanerData} = useActions()
  const fetchDataIfNeeded = useCallback(() => {
    if (cleanerStatus !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStatus, fetchCleanerData])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Description
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Cleaner ID
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Expected Rate
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Created At
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Updated At
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900'>{item.descrption}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <Link
                    to={`/cleaner/${item.cleaner_id}`}
                    className='text-blue-500 hover:font-medium'
                  >
                    {cleanerMap[item.cleaner_id]}
                  </Link>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>${item.expected_rate}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <Link
                    to={`/proposaldetails/${item.id}`}
                    className='text-blue-500 hover:font-medium'
                  >
                    <FaEye
                      className='cursor-pointer text-blue-500 hover:text-gray-700'
                      style={{fontSize: '1.1rem'}}
                    />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProposalDetailsTable
