import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {statusColors} from 'sr/constants/common'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {Checklist} from 'sr/utils/api/checklistApi'
interface ChecklistTableProps {
  data: Checklist[] | undefined
  setSelectedData: React.Dispatch<React.SetStateAction<Checklist | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ChecklistTable: React.FC<ChecklistTableProps> = ({
  data,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              SubType
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Customer Name
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
          {data?.map((checklist) => (
            <tr key={checklist.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{checklist.name}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{checklist.type}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{checklist.subtype}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/details/${checklist.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {checklist.company_id?.company_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/customer/${checklist.customer_id?.name}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {checklist.customer_id?.name}
                </Link>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className={`${statusColors[checklist.status]} font-semibold text-sm`}>
                  {getStatusName(checklist.status)}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(checklist)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <Link
                    to={`/checklist/${checklist.id}`}
                    className='text-blue-500 hover:font-medium'
                  >
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

export default ChecklistTable
