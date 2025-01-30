import React, {useCallback, useEffect} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {NotesResponse} from 'sr/utils/api/notesApi'
import {useActions} from 'sr/utils/helpers/useActions'

interface Props {
  data?: NotesResponse[]
  setSelectedData: React.Dispatch<React.SetStateAction<NotesResponse | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
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
  const navigate = useNavigate()
  const handleNoteDetails = (note: NotesResponse) => {
    navigate(`/notes/${note.id}`)
  }
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
                  to={`/company/details/${notes.company_id}`}
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
                <div className='flex'>
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                      handleNoteDetails(notes)
                    }}
                  />
                  {/* <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                      setSelectedData(notes)
                      setIsUpdateModalOpen(true)
                    }}
                  /> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotesTable
