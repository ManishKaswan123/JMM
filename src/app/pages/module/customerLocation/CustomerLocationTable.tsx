import React, {useCallback, useEffect} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {CustomerLocation} from 'sr/utils/api/customerLocationApi'
import {useActions} from 'sr/utils/helpers/useActions'
interface CustomerLocationTableProps {
  data: CustomerLocation[] | undefined
  onSelectCustomerLocation: React.Dispatch<React.SetStateAction<CustomerLocation | undefined>>
  setSelectedData: React.Dispatch<React.SetStateAction<CustomerLocation | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const CustomerLocationTable: React.FC<CustomerLocationTableProps> = ({
  data,
  onSelectCustomerLocation,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  const customerStore = useSelector((state: RootState) => state.customer)
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCustomersData, fetchCompanyData} = useActions()
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (customerStore.status !== 'succeeded') {
      fetchCustomersData({})
    }
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [customerStore.status, fetchCustomersData, companyStore.status, fetchCompanyData])
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Customer
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((location) => (
            <tr key={location.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{location.name}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/customer/details/${location.customer_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {customerStore.idNameMap[location.customer_id]}
                </Link>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/details/${location.company_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {companyStore.idNameMap[location.company_id]}
                </Link>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 text-ellipsis'>{location.type}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(location)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      onSelectCustomerLocation(location)
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

export default CustomerLocationTable
