import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {SupervisorDetails} from 'sr/utils/api/supervisorApi'

interface Props {
  data?: SupervisorDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<SupervisorDetails | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SupervisorTable: React.FC<Props> = ({data, setIsUpdateModalOpen, setSelectedData}) => {
  const navigate = useNavigate()
  const handleSupervisorDetails = (supervisor: SupervisorDetails) => {
    navigate(`/supervisor/${supervisor.id}`)
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
              Company
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Mobile
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Email
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
          {data?.map((supervisor) => (
            <tr key={supervisor?.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                {supervisor.first_name} {supervisor.last_name}
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/details${supervisor.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {supervisor.company_id?.company_name}
                </Link>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                {supervisor.mobile_number}
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>{supervisor.email}</td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p
                  className={`whitespace-no-wrap ${
                    supervisor.status === 'active'
                      ? 'text-green-500'
                      : supervisor.status === 'deleted'
                      ? 'text-red-600'
                      : supervisor.status === 'pending'
                      ? 'text-yellow-500'
                      : 'text-gray-500' // Default for unknown or undefined statuses
                  }`}
                >
                  {supervisor.status || 'Unknown'} {/* Fallback text for undefined statuses */}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      handleSupervisorDetails(supervisor)
                    }}
                  />
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                      setSelectedData(supervisor)
                      setIsUpdateModalOpen(true)
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

export default SupervisorTable
