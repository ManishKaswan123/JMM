import React, {useCallback, useEffect} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {statusColors} from 'sr/constants/common'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {RootState} from 'sr/redux/store'
import {Customer} from 'sr/utils/api/customerApi'
import {useActions} from 'sr/utils/helpers/useActions'
interface CustomerTableProps {
  data: Customer[] | undefined
  setSelectedData: React.Dispatch<React.SetStateAction<Customer | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  const navigate = useNavigate()
  const handleCustomerDetail = (customer: Customer) => {
    navigate(`/customer/details/${customer.id}`)
  }
  const companyMap = useSelector((state: RootState) => state.company.idNameMap)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const {fetchCompanyData} = useActions()
  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])
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
            {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Remarks
            </th> */}

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
                  {companyMap[customer.company_id]}
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
                <p className={`${statusColors[customer.status]} font-semibold text-sm`}>
                  {getStatusName(customer.status)}
                </p>
              </td>
              {/* <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{customer.remarks}</p>
              </td> */}
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(customer)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                      handleCustomerDetail(customer)
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

export default CustomerTable
