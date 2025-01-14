import React, {useContext} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {CleanerDetails} from 'sr/utils/api/fetchCleaner'
import {UserContext} from 'sr/context/UserContext'

interface Props {
  data?: CleanerDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<CleanerDetails | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CleanerTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const handleCleanerDetail = (cleaner: CleanerDetails) => {
    navigate(`/cleaner/details/${cleaner.id}`)
  }
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            {/* <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Full Name
                </th> */}
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Username
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Mobile Number
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Date of Birth
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
          {data?.map((cleaner) => (
            <tr key={cleaner?.id} className='odd:bg-white even:bg-gray-50'>
              {/* <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {cleaner?.first_name} {cleaner?.last_name}
                    </p>
                  </td> */}
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner?.username}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner?.mobile_number}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner?.email}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(cleaner?.date_of_birth).toLocaleDateString()}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p
                  className={`whitespace-no-wrap ${
                    cleaner?.status === 'active'
                      ? 'text-green-500'
                      : cleaner?.status === 'pending_otp'
                      ? 'text-orange-500'
                      : cleaner?.status === 'inactive'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {cleaner?.status}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(cleaner)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setUser(cleaner.id)
                      handleCleanerDetail(cleaner)
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CleanerTable
