import React from 'react'
import {FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'

interface Address {
  address_line_1: string
  address_line_2?: string
  country: string
  city: string
  state: string
  postal: string
  lat: number
  lng: number
  _id: string
}

interface Cleaner {
  _id: string
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
  __v: number
  address: Address
}

interface Company {
  _id: string
  username: string
  email: string
  mobile_number: string
  company_name: string
  business_type: string[]
  intent: string[]
  candidate_msg: boolean
  user_id: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface Contractor {
  cleaner_id: Cleaner
  first_name: string
  last_name: string
  mobile_number: string
  email?: string
  date_of_birth: string
  address: Address
  customer_location_ids: string[]
  company_id: Company
  status: string
  createdAt: string
  updatedAt: string
  id: string
}
interface Props {
  data?: Contractor[]
}

const ContractorTable: React.FC<Props> = ({data}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Cleaner Id
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Id
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              DOB
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
          {data?.map((contractor) => (
            <tr key={contractor.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{`${contractor.first_name} ${contractor.last_name}`}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/cleaner/${contractor.cleaner_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {contractor.cleaner_id?.username}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${contractor.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {contractor.company_id?.company_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{contractor.email}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(contractor.date_of_birth).toLocaleDateString()}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p
                  className={`whitespace-no-wrap ${
                    contractor.status === 'active'
                      ? 'text-green-500'
                      : contractor?.status === 'pending'
                      ? 'text-orange-500'
                      : contractor?.status === 'inactive'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {contractor.status}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/contractor/${contractor.id}`}
                  className='text-blue-500 hover:font-medium'
                >
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

export default ContractorTable
