import React, {useContext} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from 'sr/context/UserContext'

interface CompanyResponse {
  username: string
  email: string
  mobile_number: string
  company_name: string
  business_type: string[]
  intent: string[]
  candidate_msg: boolean
  no_of_clients?: number
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
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const handleCompanyDetail = (company: CompanyResponse) => {
    navigate(`/company/details/${company.id}`)
  }
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
              Mobile
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
                <p className='text-gray-900 whitespace-no-wrap'>{company.mobile_number}</p>
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
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setUser(company.id)
                      handleCompanyDetail(company)
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

export default CompanyTable
