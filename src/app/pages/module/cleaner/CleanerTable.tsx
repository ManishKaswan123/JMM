import React from 'react'
import {FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'

interface Address {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  lat: number | null
  lng: number | null
  _id: string
}

interface CleanerResponse {
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  date_of_birth: string
  user_id: string
  status: string
  createdAt: string
  updatedAt: string
  address: Address
  id: string
}

interface Props {
  data?: CleanerResponse[]
}

const CleanerTable: React.FC<Props> = ({data}) => {
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
                <Link to={`/cleaner/${cleaner?.id}`} className='text-blue-500 hover:font-medium'>
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

export default CleanerTable
