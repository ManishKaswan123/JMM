import React, {useCallback, useEffect, useState} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {ProposalDetails} from 'sr/utils/api/proposalDetailsApi'
import {useActions} from 'sr/utils/helpers/useActions'

interface Props {
  data?: ProposalDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<ProposalDetails | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ProposalDetailsTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
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
  const navigate = useNavigate()
  const handleProposalDetails = (pd: ProposalDetails) => {
    navigate(`/proposaldetails/${pd.id}`)
  }
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
                    to={`/cleaner/details/${item.cleaner_id}`}
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
                  <div className='flex'>
                    <FaEye
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        handleProposalDetails(item)
                      }}
                    />
                    <FaEdit
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                        setSelectedData(item)
                        setIsUpdateModalOpen(true)
                      }}
                    />
                  </div>
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
