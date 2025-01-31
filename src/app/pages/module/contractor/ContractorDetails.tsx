import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {ContractorDetails, fetchSingleContractor} from 'sr/utils/api/contractorApi'
import {Link} from 'react-router-dom'

const ContractorDetailsCard: React.FC<any> = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<ContractorDetails>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleContractor(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/contractor')
  }

  if (data === undefined) return <div>Loading...</div>
  if (isError) return <div>Error loading contractor details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Contractor Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Id:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>First Name:</strong>
            <p>{data.first_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Last Name:</strong>
            <p>{data.last_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Mobile Number:</strong>
            <p>{data.mobile_number}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Email:</strong>
            <p>{data.email}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>DOB:</strong>
            <p>{new Date(data.date_of_birth).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Cleaner:</strong>
            <Link
              to={`/cleaner/${data.cleaner_id?._id}`}
              className='text-blue-500 hover:font-medium'
            >
              {data.cleaner_id?.username}
            </Link>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company:</strong>
            <Link
              to={`/company/${data.company_id?._id}`}
              className='text-blue-500 hover:font-medium'
            >
              {data.company_id.company_name}
            </Link>
          </div>
        </div>
      </div>

      <h3 className='text-2xl font-bold mt-8 mb-4'>Address</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 1:</strong>
            <p>{data.address?.address_line_1}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 2:</strong>
            <p>{data.address?.address_line_2}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Country:</strong>
            <p>{data.address?.country}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>City:</strong>
            <p>{data.address?.city}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>State:</strong>
            <p>{data.address?.state}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Postal Code:</strong>
            <p>{data.address?.postal}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Latitude:</strong>
            <p>{data.address?.lat}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Longitute:</strong>
            <p>{data.address?.lng}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractorDetailsCard
