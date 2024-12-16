import React from 'react'
import {FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {Customer} from 'sr/utils/api/customerApi'
interface CustomerTableProps {
  data: Customer[] | undefined
}
const CustomerTable: React.FC<CustomerTableProps> = ({data}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Mobile
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Remarks
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((customer) => (
            <tr key={customer.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{customer.name}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${customer.company_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {customer.company_id}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{customer.email}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-nowrap'>{customer.mobile_number}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{customer.type}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p
                  className={`whitespace-no-wrap ${
                    customer.status === 'active'
                      ? 'text-green-500'
                      : customer?.status === 'pending_otp'
                      ? 'text-orange-500'
                      : customer?.status === 'closed'
                      ? 'text-red-500'
                      : 'text-gray-500' // Default color for unknown statuses
                  }`}
                >
                  {customer.status}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{customer.remarks}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link to={`/customer/${customer.id}`} className='text-blue-500 hover:font-medium'>
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

export default CustomerTable
