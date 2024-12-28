import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'

interface CompanyResponse {
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
  id: string
}

interface Props {
  data?: CompanyResponse[]
  setSelectedData: React.Dispatch<React.SetStateAction<CompanyResponse | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CompanyTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Username
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Mobile Number
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Business Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Intent
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
          {data?.map((company) => (
            <tr key={company?.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{company.company_name}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{company.username}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{company.email}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-nowrap'>{company.mobile_number}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {company.business_type?.join(', ')}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{company.intent?.join(', ')}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p
                  className={`whitespace-no-wrap ${
                    company.status === 'active'
                      ? 'text-green-500'
                      : company?.status === 'pending_otp'
                      ? 'text-orange-500'
                      : company?.status === 'closed'
                      ? 'text-red-500'
                      : 'text-gray-500' // Default color for unknown statuses
                  }`}
                >
                  {company.status}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(company)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <Link to={`/company/${company.id}`} className='text-blue-500 hover:font-medium'>
                    <FaEye
                      className='cursor-pointer text-blue-500 hover:text-gray-700'
                      style={{fontSize: '1.1rem'}}
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompanyTable
