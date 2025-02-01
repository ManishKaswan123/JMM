import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {ContractorHiredetailsDetails} from 'sr/utils/api/contractorHiredetailsApi'
interface HiredetailsTableProps {
  data: ContractorHiredetailsDetails | undefined
  onSelectHiredetails: React.Dispatch<
    React.SetStateAction<ContractorHiredetailsDetails | undefined>
  >
  setSelectedData: React.Dispatch<React.SetStateAction<ContractorHiredetailsDetails | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const HiredetailsTable: React.FC<HiredetailsTableProps> = ({
  data,
  onSelectHiredetails,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Contractor
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Employment Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Rate
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        {data && (
          <tbody>
            <tr key={data.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/contractor/details/${data.contractor_id._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {data.contractor_id.first_name} {data.contractor_id.last_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/details/${data.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {data.company_id?.company_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{data.employment_type}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{data.rate}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(data)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      onSelectHiredetails(data)
                    }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}

export default HiredetailsTable
