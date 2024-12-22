import React, {useCallback, useEffect} from 'react'
import {FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

interface NotesResponse {
  _id: string
  company_id: string
  applicant_id: string
  notes: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

interface Props {
  data?: NotesResponse[]
}

const NotesTable: React.FC<Props> = ({data}) => {
  const companyMap = useSelector((state: RootState) => state.company.idNameMap)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const {fetchCompanyData} = useActions()
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company ID
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Applicant ID
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Notes
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
          {data?.map((notes) => (
            <tr key={notes?._id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${notes.company_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {companyMap[notes.company_id]}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{notes?.applicant_id}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{notes?.notes}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(notes?.createdAt).toLocaleDateString()}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(notes?.updatedAt).toLocaleDateString()}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link to={`/notes/${notes?.id}`} className='text-blue-500 hover:font-medium'>
                  <FaEye
                    className='cursor-pointer text-blue-500 hover:text-gray-700'
                    style={{fontSize: '1.1rem'}}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotesTable
