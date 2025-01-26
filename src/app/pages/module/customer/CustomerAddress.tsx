import React, {useEffect, useMemo, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {FieldsArray} from 'sr/constants/fields'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {Address} from 'sr/utils/api/addressApi'
import {Customer, fetchSingleCustomer, useUpdateCustomer} from 'sr/utils/api/customerApi'

interface CustomerAddressFormPayload extends Omit<Address, '_id'> {}

const CustomerAddressCard: React.FC<any> = () => {
  const [data, setData] = useState<Customer>()
  const [refetch, setRefetch] = useState<boolean>(false)
  const [isUpdateModalOpenHO, setIsUpdateModalOpenHO] = useState<boolean>(false)
  const [isUpdateModalOpenBilling, setIsUpdateModalOpenBilling] = useState<boolean>(false)
  const navigate = useNavigate()
  const {customer_id} = useParams<{customer_id: string}>()
  const updateMutation = useUpdateCustomer()

  const createFields: FieldsArray = useMemo(
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
  const onSuccess = (action: string) => {
    setIsUpdateModalOpenHO(false)
    setIsUpdateModalOpenBilling(false)
    setRefetch((prev) => !prev)
  }

  useEffect(() => {
    fetchSingleCustomer(customer_id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        // setIsError(true)
      })
  }, [customer_id, refetch])

  const onGoBack = () => {
    navigate('/customer')
  }

  const handleAddHeadOfficeAddress = async (payload: CustomerAddressFormPayload) => {
    if (!data) {
      setIsUpdateModalOpenHO(false)
      return
    }
    const payload_data = {
      head_office_address: payload,
    }
    updateMutation.mutate({payload: {...data, ...payload_data}, onSuccess})
  }
  const handleAddBillingAddress = async (payload: CustomerAddressFormPayload) => {
    if (!data) {
      setIsUpdateModalOpenBilling(false)
      return
    }
    const payload_data = {
      billing_address: payload,
    }
    updateMutation.mutate({payload: {...data, ...payload_data}, onSuccess})
  }
  const defaultValuesHO: CustomerAddressFormPayload | undefined = useMemo(() => {
    if (!data || !data.head_office_address) return undefined
    return {
      address_line_1: data.head_office_address?.address_line_1,
      address_line_2: data.head_office_address?.address_line_2,
      country: data.head_office_address?.country,
      city: data.head_office_address?.city,
      state: data.head_office_address?.state,
      postal: data.head_office_address?.postal,
      lat: data.head_office_address?.lat,
      lng: data.head_office_address?.lng,
    }
  }, [data])
  const defaultValuesBilling: CustomerAddressFormPayload | undefined = useMemo(() => {
    if (!data || !data.billing_address) return undefined
    return {
      address_line_1: data.billing_address?.address_line_1,
      address_line_2: data.billing_address?.address_line_2,
      country: data.billing_address?.country,
      city: data.billing_address?.city,
      state: data.billing_address?.state,
      postal: data.billing_address?.postal,
      lat: data.billing_address?.lat,
      lng: data.billing_address?.lng,
    }
  }, [data])
  if (!data)
    return (
      <SkeletonCard
        label='Customer Address'
        col1={'Address Line 1,Country,State,Latitide'.split(',')}
        col2={'Adddress Line 2,City,Postal Code,Longitude'.split(',')}
      />
    )

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
        <h2 className='text-4xl font-bold mb-6 text-center'>Customer Address</h2>

        {/* Head Office Address */}
        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl font-semibold'>Head Office Address</h3>
            <Button
              onClick={() => setIsUpdateModalOpenHO(true)}
              label={defaultValuesHO ? 'Edit Address' : 'Add Address'}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            <div className='space-y-4'>
              <p>
                <strong className='font-medium text-lg'>Address Line 1:</strong>{' '}
                {data?.head_office_address?.address_line_1}
              </p>
              <p>
                <strong className='font-medium text-lg'>Country:</strong>{' '}
                {data?.head_office_address?.country}
              </p>
              <p>
                <strong className='font-medium text-lg'>State:</strong>{' '}
                {data?.head_office_address?.state}
              </p>
              <p>
                <strong className='font-medium text-lg'>Latitude:</strong>{' '}
                {data?.head_office_address?.lat}
              </p>
            </div>
            <div className='space-y-4'>
              <p>
                <strong className='font-medium text-lg'>Address Line 2:</strong>{' '}
                {data?.head_office_address?.address_line_2}
              </p>
              <p>
                <strong className='font-medium text-lg'>City:</strong>{' '}
                {data?.head_office_address?.city}
              </p>
              <p>
                <strong className='font-medium text-lg'>Postal Code:</strong>{' '}
                {data?.head_office_address?.postal}
              </p>
              <p>
                <strong className='font-medium text-lg'>Longitude:</strong>{' '}
                {data?.head_office_address?.lng}
              </p>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl font-semibold'>Billing Address</h3>
            <Button
              onClick={() => setIsUpdateModalOpenBilling(true)}
              label={defaultValuesBilling ? 'Edit Address' : 'Add Address'}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            <div className='space-y-4'>
              <p>
                <strong className='font-medium text-lg'>Address Line 1:</strong>{' '}
                {data?.billing_address?.address_line_1}
              </p>
              <p>
                <strong className='font-medium text-lg'>Country:</strong>{' '}
                {data?.billing_address?.country}
              </p>
              <p>
                <strong className='font-medium text-lg'>State:</strong>{' '}
                {data?.billing_address?.state}
              </p>
              <p>
                <strong className='font-medium text-lg'>Latitude:</strong>{' '}
                {data?.billing_address?.lat}
              </p>
            </div>
            <div className='space-y-4'>
              <p>
                <strong className='font-medium text-lg'>Address Line 2:</strong>{' '}
                {data?.billing_address?.address_line_2}
              </p>
              <p>
                <strong className='font-medium text-lg'>City:</strong> {data?.billing_address?.city}
              </p>
              <p>
                <strong className='font-medium text-lg'>Postal Code:</strong>{' '}
                {data?.billing_address?.postal}
              </p>
              <p>
                <strong className='font-medium text-lg'>Longitude:</strong>{' '}
                {data?.billing_address?.lng}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modals */}
      {isUpdateModalOpenBilling && (
        <DynamicModal
          label='Update Billing Address'
          isOpen={isUpdateModalOpenBilling}
          onClose={() => setIsUpdateModalOpenBilling(false)}
          fields={createFields}
          defaultValues={defaultValuesBilling}
          onSubmit={handleAddBillingAddress}
        />
      )}
      {isUpdateModalOpenHO && (
        <DynamicModal
          label='Update HO Address'
          isOpen={isUpdateModalOpenHO}
          onClose={() => setIsUpdateModalOpenHO(false)}
          fields={createFields}
          defaultValues={defaultValuesHO}
          onSubmit={handleAddHeadOfficeAddress}
        />
      )}
    </>
  )
}

export default CustomerAddressCard
