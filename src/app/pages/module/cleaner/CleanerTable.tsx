import {FaEdit, FaEye, FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {CleanerDetails} from 'sr/utils/api/fetchCleaner'

interface Props<T> {
  type: 'cleaner' | 'favcleaner'
  data?: T[]
  handleDelete?: (cleaner_id: string) => void
  setSelectedData?: React.Dispatch<React.SetStateAction<CleanerDetails | undefined>>
  setIsUpdateModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const CleanerTable = <T,>({
  type,
  data,
  setSelectedData,
  setIsUpdateModalOpen,
  handleDelete,
}: Props<T>) => {
  const navigate = useNavigate()
  const handleCleanerDetail = (cleaner: any) => {
    navigate(`/cleaner/details/${type === 'cleaner' ? cleaner.id : cleaner._id}`)
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
          {data?.map((cleaner: any) => (
            <tr
              key={type === 'cleaner' ? cleaner.id : cleaner._id}
              className='odd:bg-white even:bg-gray-50'
            >
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
                  {type === 'cleaner' && (
                    <FaEdit
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        setSelectedData && setSelectedData(cleaner)
                        setIsUpdateModalOpen && setIsUpdateModalOpen(true)
                      }}
                    />
                  )}

                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                      handleCleanerDetail(cleaner)
                    }}
                  />
                  {handleDelete && (
                    <FaTrash
                      className='text-rose-600 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                        handleDelete(type === 'cleaner' ? cleaner.id : cleaner._id)
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

export default CleanerTable
