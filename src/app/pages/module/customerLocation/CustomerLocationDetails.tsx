import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Button} from 'sr/helpers'
import {Link} from 'react-router-dom'
import {
  createLocationGeoFence,
  CustomerLocation,
  useUpdateCustomerLocation,
} from 'sr/utils/api/customerLocationApi'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {Address} from 'sr/utils/api/addressApi'
import {FieldsArray} from 'sr/constants/fields'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
interface CustomerLocationDetailsProps {
  // refetch: () => void
  setSelectedCustomerLocation: React.Dispatch<React.SetStateAction<CustomerLocation | undefined>>
  data: CustomerLocation
  onGoBack: () => void
}
interface CustomerLocationAddressFormPayload extends Omit<Address, '_id'> {}
interface GeofenceFormPaylod {
  customer_loacation_id: string
  name: string
  lat: number
  lng: number
}
export const CustomerLocationDetailsCard: React.FC<CustomerLocationDetailsProps> = ({
  data,
  onGoBack,
  setSelectedCustomerLocation,
  // refetch,
}) => {
  const [isUpdateAddressOpen, setIsUpdateAddressOpen] = useState<boolean>(false)
  const [isUpdateGeoOpen, setIsUpdateGeoOpen] = useState<boolean>(false)
  const customerStore = useSelector((state: RootState) => state.customer)
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCustomersData, fetchCompanyData} = useActions()
  const updateMutation = useUpdateCustomerLocation()
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
        type: 'number',
        label: 'Postal Code',
        name: 'postal',
        placeholder: 'Postal Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Latitude',
        name: 'lat',
        placeholder: 'Latitude',
        required: true,
      },
      {
        type: 'number',
        label: 'Longitude',
        name: 'lng',
        placeholder: 'Longitude',
        required: true,
      },
    ],
    []
  )
  const geofenceFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        required: true,
      },
      {
        type: 'number',
        label: 'Latitude',
        name: 'lat',
        placeholder: 'Latitude',
        required: true,
      },
      {
        type: 'number',
        label: 'Longitude',
        name: 'lng',
        placeholder: 'Longitude',
        required: true,
      },
    ],
    []
  )
  const onSuccess = (action: string, data?: any) => {
    setIsUpdateAddressOpen(false)
    setIsUpdateGeoOpen(false)
    setSelectedCustomerLocation(data)
    // refetch()
  }
  const handleEditAddress = async (payload: CustomerLocationAddressFormPayload) => {
    const payload_data = {
      address: payload,
    }

    updateMutation.mutate({payload: {...data, ...payload_data}, onSuccess})
  }
  const handleAddGeoFence = async (payload: GeofenceFormPaylod) => {
    const updatedPayload = {
      customer_location_id: data.id,
      name: payload.name,
      coordinates: [{lat: payload.lat, lng: payload.lng}],
    }
    const res = await createLocationGeoFence(updatedPayload)
    if (!res) {
      setIsUpdateGeoOpen(false)
      return
    }
    const geoFenceId = [...data.geofence_ids, res.id]
    updateMutation.mutate({
      payload: {
        ...data,
        ...{
          geofence_ids: geoFenceId,
        },
      },
      onSuccess,
    })
  }
  const defaultValuesAddress: CustomerLocationAddressFormPayload | undefined = useMemo(() => {
    if (!data || !data.address) return undefined
    return {
      address_line_1: data.address?.address_line_1,
      address_line_2: data.address?.address_line_2,
      country: data.address?.country,
      city: data.address?.city,
      state: data.address?.state,
      postal: data.address?.postal,
      lat: data.address?.lat,
      lng: data.address?.lng,
    }
  }, [data])

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
    <>
      <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
        {/* Go Back Button */}
        <Button
          onClick={onGoBack}
          label='Go Back 🡸'
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
        />

        {/* Title */}
        <h2 className='text-4xl font-bold mb-6 text-center'>Customer Location Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
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
          </div>

          {/* Column 2 */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Type:</strong>
              <p>{data.type}</p>
            </div>
            <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Checklist Ids:</strong>
              <p>{data.checklist_ids.join(', ')}</p>
            </div>
            {/* <div className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>Geofence Ids:</strong>
              <p>{data.geofence_ids.join(', ')}</p>
            </div> */}

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
              onClick={() => setIsUpdateAddressOpen(true)}
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
        {/* Geofence */}
        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl font-semibold'>Geofence</h3>
            <Button
              onClick={() => setIsUpdateGeoOpen(true)}
              label='Add New Geofence'
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            <div className='space-y-4'>
              <p>
                {/* <strong className='font-medium text-lg'>Address Line 1:</strong>{' '} */}
                {data.geofence_ids?.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modals */}
      {isUpdateAddressOpen && (
        <DynamicModal
          label='Update Address'
          isOpen={isUpdateAddressOpen}
          onClose={() => setIsUpdateAddressOpen(false)}
          fields={addressFields}
          defaultValues={defaultValuesAddress}
          onSubmit={handleEditAddress}
        />
      )}
      {isUpdateGeoOpen && (
        <DynamicModal
          label='Add Geofence'
          isOpen={isUpdateGeoOpen}
          onClose={() => setIsUpdateGeoOpen(false)}
          fields={geofenceFields}
          onSubmit={handleAddGeoFence}
        />
      )}
    </>
  )
}
