import React, {useCallback, useEffect} from 'react'
import {FaEye, FaTrash} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {statusColors} from 'sr/constants/common'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {RootState} from 'sr/redux/store'
import {Status} from 'sr/utils/api/globalInterface'
import {useActions} from 'sr/utils/helpers/useActions'

interface Props<T> {
  type: 'jobs' | 'favjobs'
  data?: T[]
  handleDelete?: (job_id: string) => void
}

const JobsTable = <T,>({type, data, handleDelete}: Props<T>) => {
  const navigate = useNavigate()
  const handleJobDetails = (job: any) => {
    navigate(`/job/${type === 'jobs' ? job.id : job._id}`)
  }
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore.status, fetchCompanyData])
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Job Title
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Start Date
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Max Amount
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Min Amount
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Rate
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((job: any) => (
            <tr key={job.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/details/${type === 'jobs' ? job.company_id?._id : job.company_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {companyStore.idNameMap[type === 'jobs' ? job.company_id?._id : job.company_id]}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{job.job_title}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(job?.start_date).toLocaleDateString()}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${job?.max_amount}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${job?.min_amount}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{job?.rate}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className={`${statusColors[job.status as Status]} font-semibold text-sm`}>
                  {getStatusName(job.status)}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                      handleJobDetails(job)
                    }}
                  />
                  {handleDelete && (
                    <FaTrash
                      className='text-rose-600 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                        handleDelete(type === 'jobs' ? job.id : job._id)
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobsTable
