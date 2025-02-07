import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {
  ContractorDetails,
  fetchSingleContractor,
  useUpdateContractor,
} from 'sr/utils/api/contractorApi'
import {Link} from 'react-router-dom'
import {FieldsArray} from 'sr/constants/fields'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {UserContext} from 'sr/context/UserContext'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {getStatusName} from 'sr/helpers/globalHelpers'

interface ContractorFormPayload {
  address_line_1: string
  address_line_2: string
  city: string
  country: string
  lat: number
  lng: number
  postal: number
}
const ContractorDetailsCard: React.FC<any> = () => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const {contractor_id} = useParams<{contractor_id: string}>()
  const [data, setData] = useState<ContractorDetails>()
  const [isError, setIsError] = useState(false)
  const [refetch, setRefetch] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const updateMutation = useUpdateContractor()
  const addressFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Address Line 1',
        name: 'address_line_1',
        placeholder: 'Address Line 1',
        required: true,
      },
      {
        type: 'text',
        label: 'Address Line 2',
        name: 'address_line_2',
        placeholder: 'Address Line 2',
        required: true,
      },
      {
        type: 'text',
        label: 'Country',
        name: 'country',
        placeholder: 'country',
        required: true,
      },
      {
        type: 'text',
        label: 'City',
        name: 'city',
        placeholder: 'City',
        required: true,
      },
      {
        type: 'text',
        label: 'State',
        name: 'state',
        placeholder: 'State',
        required: true,
      },
      {
        type: 'text',
        label: 'Postal Code',
        name: 'postal',
        placeholder: 'Postal Code',
        required: true,
      },
      {
        type: 'text',
        label: 'Latitude',
        name: 'lat',
        placeholder: 'Latitude',
        required: true,
      },
      {
        type: 'text',
        label: 'Longitude',
        name: 'lng',
        placeholder: 'Longitude',
        required: true,
      },
    ],
    []
  )
  const onSuccess = (action: string) => {
    if (action === 'update') setIsUpdateModalOpen(false)
    setRefetch((prev) => !prev)
  }

  useEffect(() => {
    fetchSingleContractor(contractor_id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
    setUser(contractor_id)
  }, [contractor_id, refetch])

  const onGoBack = () => {
    navigate('/contractor')
  }
  const handleEditAddress = async (payload: ContractorFormPayload) => {
    const payload_data = {
      address: payload,
    }

    updateMutation.mutate({payload: {...data, ...payload_data}, onSuccess})
  }
  const defaultValuesAddress: ContractorFormPayload | undefined = useMemo(() => {
    if (!data || !data.address) return undefined
    return {
      address_line_1: data.address?.address_line_1,
      address_line_2: data.address?.address_line_2,
      country: data.address?.country || '',
      city: data.address?.city,
      state: data.address?.state,
      postal: data.address?.postal,
      lat: data.address?.lat,
      lng: data.address?.lng,
    }
  }, [data])

  if (data === undefined)
    return (
      <SkeletonCard
        label='Contractor Details'
        col1={'Id,Name,Mobile,Company,Cleaner'.split(',')}
        col2={'Email,Date of Birth,Status,Created At,Updated At'.split(',')}
      />
    )
  if (isError) return <div>Error loading contractor details.</div>

  return (
    <>
      <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
        {/* Go Back Button */}
        <Button
          onClick={onGoBack}
          label='Go Back 🡸'
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
        />

        {/* Title */}
        <h2 className='text-4xl font-bold mb-6 text-center'>Contractor Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          {/* Column 1 */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Id:</strong>
              <p>{data.id}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Name:</strong>
              <p>{data.first_name + ' ' + data.last_name} </p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Mobile:</strong>
              <p>{data.mobile_number} </p>
            </div>

            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Company:</strong>
              <Link
                to={`/company/details/${data.company_id?._id}`}
                className='text-blue-500 hover:font-medium'
              >
                {data.company_id?.company_name}
              </Link>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Cleaner:</strong>
              <Link
                to={`/cleaner/details/${data.cleaner_id?._id}`}
                className='text-blue-500 hover:font-medium'
              >
                {data.cleaner_id?.username}
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Email:</strong>
              <p>{data.email} </p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Date of Birth:</strong>
              <p>{data.date_of_birth || 'Not Available'}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Status:</strong>
              <p>{getStatusName(data.status)} </p>
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
        {/* Address */}
        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl font-semibold'>Address</h3>
            <Button
              onClick={() => setIsUpdateModalOpen(true)}
              label={defaultValuesAddress ? 'Edit Address' : 'Add Address'}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            <div className='space-y-4'>
              <p>
                <strong className='font-medium text-lg'>Address Line 1:</strong>{' '}
                {data?.address?.address_line_1}
              </p>
              <p>
                <strong className='font-medium text-lg'>Country:</strong> {data?.address?.country}
              </p>
              <p>
                <strong className='font-medium text-lg'>State:</strong> {data?.address?.state}
              </p>
              <p>
                <strong className='font-medium text-lg'>Latitude:</strong> {data?.address?.lat}
              </p>
            </div>
            <div className='space-y-4'>
              <p>
                <strong className='font-medium text-lg'>Address Line 2:</strong>{' '}
                {data?.address?.address_line_2}
              </p>
              <p>
                <strong className='font-medium text-lg'>City:</strong> {data?.address?.city}
              </p>
              <p>
                <strong className='font-medium text-lg'>Postal Code:</strong>{' '}
                {data?.address?.postal}
              </p>
              <p>
                <strong className='font-medium text-lg'>Longitude:</strong> {data?.address?.lng}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modals */}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Address'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={addressFields}
          defaultValues={defaultValuesAddress}
          onSubmit={handleEditAddress}
        />
      )}
    </>
  )
}

export default ContractorDetailsCard
