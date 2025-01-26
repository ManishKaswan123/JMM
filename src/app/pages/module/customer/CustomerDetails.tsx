import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {Customer, fetchSingleCustomer} from 'sr/utils/api/customerApi'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {UserContext} from 'sr/context/UserContext'

const CustomerDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {customer_id} = useParams<{customer_id: string}>()
  const {setUser} = useContext(UserContext)
  const [data, setData] = useState<Customer>()
  const [isError, setIsError] = useState(false)
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

  useEffect(() => {
    fetchSingleCustomer(customer_id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
    setUser(customer_id)
  }, [customer_id])

  const onGoBack = () => {
    navigate('/customer')
  }

  if (!data)
    return (
      <SkeletonCard
        label='Customer Details'
        col1={'Customer ID,Company ID,Name,Email,Mobile Number,Type'.split(',')}
        col2={'Status,Remarks,Created At,Updated At,Location IDs,Checklist IDs'.split(',')}
      />
    )
  if (isError) return <div>Error loading customer details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Customer Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Customer ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company ID:</strong>
            <p>{companyMap[data.company_id]}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Name:</strong>
            <p>{data.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Email:</strong>
            <p>{data.email}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Mobile Number:</strong>
            <p>{data.mobile_number}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Type:</strong>
            <p>{data.type}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Remarks:</strong>
            <p>{data.remarks || 'No remarks provided'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Location IDs:</strong>
            <p>{data.location_ids.join(', ') || 'No locations'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Checklist IDs:</strong>
            <p>{data.checklist_ids.join(', ') || 'No checklists'}</p>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {/* <div className='mt-6'>
        <div className='flex items-center'>
          <strong className='font-medium text-lg mr-2'>Contacts:</strong>
          <p>{data.contacts?.join(', ') || 'No contacts available'}</p>
        </div>
      </div> */}
    </div>
  )
}

export default CustomerDetailsCard
