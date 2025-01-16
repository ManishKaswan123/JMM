import React, {useCallback, useEffect} from 'react'
import {Button} from 'sr/helpers'
import {Link} from 'react-router-dom'
import {CustomerLocation} from 'sr/utils/api/customerLocationApi'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
interface CustomerLocationDetailsProps {
  data: CustomerLocation
  onGoBack: () => void
}
export const CustomerLocationDetailsCard: React.FC<CustomerLocationDetailsProps> = ({
  data,
  onGoBack,
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
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Customer Location Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Id:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Name:</strong>
            <p>{data.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Customer:</strong>
            <Link
              to={`/customer/details/${data.customer_id}`}
              className='text-blue-500 hover:font-medium'
            >
              {customerStore.idNameMap[data.customer_id]}
            </Link>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company:</strong>
            <Link
              to={`/company/details/${data.company_id}`}
              className='text-blue-500 hover:font-medium'
            >
              {companyStore.idNameMap[data.company_id]}
            </Link>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Type:</strong>
            <p>{data.type}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Checklist Ids:</strong>
            <p>{data.checklist_ids.join(', ')}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Geofence Ids:</strong>
            <p>{data.geofence_ids.join(', ')}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{data.createdAt}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{data.updatedAt}</p>
          </div>
        </div>
      </div>

      {/* Associated Entities */}
      <h3 className='text-2xl font-bold mt-8 mb-4'>Address</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 1:</strong>
            <p>{data.address?.address_line_1 || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 2:</strong>
            <p>{data.address?.address_line_2 || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Country:</strong>
            <p>{data.address?.country || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>City:</strong>
            <p>{data.address?.city || 'Not Available'}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>State:</strong>
            <p>{data.address?.state || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Postal Code:</strong>
            <p>{data.address?.postal || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Latitude:</strong>
            <p>{data.address?.lat || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Longitute:</strong>
            <p>{data.address?.lng || 'Not Available'}</p>
          </div>
        </div>
      </div>
      <h3 className='text-2xl font-bold mt-8 mb-4'>Contacts</h3>
      {data.contacts?.map((contact, index) => (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>First Name:</strong>
              <p>{contact.first_name}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Last Name:</strong>
              <p>{contact.last_name}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Phone:</strong>
              <p>{contact.phone}</p>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Email:</strong>
              <p>{contact.email}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Type:</strong>
              <p>{contact.type}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Contact Id:</strong>
              <p>{contact._id}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
