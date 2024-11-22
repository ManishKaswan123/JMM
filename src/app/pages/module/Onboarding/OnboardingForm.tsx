import React, {useEffect, useState} from 'react'
import axios from 'axios'
import companyLogo from '../../../../sr/img/company_logo.jpeg'

interface FormState {
  storeName: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  storeHours: string
  legalBusinessName: string
  ein: string
  businessOwnerName: string
  // businessAddressSameAsStore: boolean
  businessStreet: string
  businessCity: string
  businessState: string
  businessZip: string
  businessCountry: string
  businessOwnerDOB: string
  routingNumber: string
  accountNumber: string
  eSignatureConsent: boolean
  smsAuthorization: boolean
  feeConsent: boolean
  attachment1: FileList | null
  attachment2: FileList | null
  attachment3: FileList | null
  userId: string
  // acceptTerms: boolean
}

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    storeName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    storeHours: '',
    legalBusinessName: '',
    ein: '',
    businessOwnerName: '',
    // businessAddressSameAsStore: false,
    businessStreet: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessCountry: '',
    businessOwnerDOB: '',
    routingNumber: '',
    accountNumber: '',
    eSignatureConsent: false,
    smsAuthorization: false,
    feeConsent: false,
    attachment1: null,
    attachment2: null,
    attachment3: null,
    userId: '',
    // acceptTerms: false,
  })

  const [userData, setUserData] = useState<any>(null)
  const [checkbox, setCheckbox] = useState<any>({
    businessAddressSameAsStore: false,
    acceptTerms: false,
  })

  // Get token from URL
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  // verify token
  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const header = {
          'Content-Type': 'application/json',
        }
        const response = await axios.post(
          `https://api.86deadstock.com/v1/auth/verify-seller-token?token=${token}`,
          {header}
        )
        if (response?.data) {
          setUserData(response?.data)
          setFormData((prev) => ({...prev, userId: response?.data?.id}))
        }
      } catch (error) {
        console.error('Error Verifying Token:', error)
      }
      return null
    }

    verifyToken(token || '')

    console.log('inside hook')
  }, [])
  console.log('user data', userData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name
    let value = event.target.value
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleFormCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name
    let checked = event.target.checked
    setFormData((prev: any) => ({...prev, [name]: checked}))
  }

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name
    let checked = event.target.checked
    setCheckbox((prev: any) => ({...prev, [name]: checked}))
    if (checkbox.businessAddressSameAsStore) {
      setFormData((prev) => ({
        ...prev,
        businessStreet: formData.street,
        businessCity: formData.city,
        businessState: formData.state,
        businessZip: formData.zip,
        businessCountry: formData.country,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        businessStreet: '',
        businessCity: '',
        businessState: '',
        businessZip: '',
        businessCountry: '',
      }))
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]
    let name = e.target.name
    if (file) {
      try {
        const fileData = new FormData()
        fileData.append('file', file)

        const response = await axios.post(
          'https://api.86deadstock.com/v1/media/upload-file',
          fileData
        )
        console.log('Response :- ', response)
        if (response.data) {
          setFormData((prev) => ({...prev, [name]: response.data.results.fileName}))
          console.log('File uploaded successfully')
        } else {
          console.error('Failed to upload file')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form Data:', formData)
    console.log('Token:', token)
    const submitData = await axios.post(`https://api.86deadstock.com/v1/seller/${token}`, formData)
    console.log('Submit Data:', submitData)
  }

  return (
    <div>
      {userData ? (
        <div className='max-w-4xl mx-auto p-4'>
          <div className='image-container w-40'>
            <img src={companyLogo} alt='Company Logo' className='image' />
          </div>
          <h1 className='text-2xl text-gray-700 font-md my-4 border-b-2 border-gray-200 pb-2'>
            Welcome {userData.firstName}. Please fill below details for onboarding.
          </h1>
          <form onSubmit={handleSubmit} className='p-4 max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 gap-6'>
              <label className='block'>
                <span className='text-gray-700'>First Name:</span>
                <input
                  type='text'
                  name='firstName'
                  value={userData.firstName}
                  onChange={handleChange}
                  disabled={true}
                  placeholder={userData?.firstName}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Last Name:</span>
                <input
                  type='text'
                  name='lastName'
                  value={userData.lastName}
                  onChange={handleChange}
                  disabled={true}
                  placeholder={userData?.lastName}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Mobile Phone Number:</span>
                <input
                  type='tel'
                  name='mobilePhone'
                  value={userData.mobilePhone}
                  onChange={handleChange}
                  disabled={true}
                  placeholder={userData?.phone}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Your Email Address:</span>
                <input
                  type='email'
                  name='email'
                  value={userData.email}
                  onChange={handleChange}
                  disabled={true}
                  placeholder={userData?.email}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Business Owner Name:</span>
                <input
                  type='text'
                  name='businessOwnerName'
                  value={formData.businessOwnerName}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Business Owner DOB:</span>
                <input
                  type='date'
                  name='businessOwnerDOB'
                  value={formData.businessOwnerDOB}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Store Name:</span>
                <input
                  type='text'
                  name='storeName'
                  value={formData.storeName}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Legal Business Name:</span>
                <input
                  type='text'
                  name='legalBusinessName'
                  value={formData.legalBusinessName}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>EIN:</span>
                <input
                  type='text'
                  name='ein'
                  value={formData.ein}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Store Hours:</span>
                <input
                  type='text'
                  name='storeHours'
                  value={formData.storeHours}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>

              <label className='block'>
                <span className='text-gray-700'>Street:</span>
                <input
                  type='text'
                  name='street'
                  value={formData.street}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>City:</span>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>State:</span>
                <input
                  type='text'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Zip:</span>
                <input
                  type='text'
                  name='zip'
                  value={formData.zip}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Country:</span>
                <input
                  type='text'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='businessAddressSameAsStore'
                  checked={checkbox.businessAddressSameAsStore}
                  onChange={handleCheckbox}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='businessAddressSameAsStore'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Business Address Same as Store Address
                </label>
              </div>
              {!checkbox.businessAddressSameAsStore && (
                <>
                  <label className='block'>
                    <span className='text-gray-700'>Business Street:</span>
                    <input
                      type='text'
                      name='businessStreet'
                      value={formData.businessStreet}
                      onChange={handleChange}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </label>
                  <label className='block'>
                    <span className='text-gray-700'>Business City:</span>
                    <input
                      type='text'
                      name='businessCity'
                      value={formData.businessCity}
                      onChange={handleChange}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </label>
                  <label className='block'>
                    <span className='text-gray-700'>Business State:</span>
                    <input
                      type='text'
                      name='businessState'
                      value={formData.businessState}
                      onChange={handleChange}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </label>
                  <label className='block'>
                    <span className='text-gray-700'>Business Zip:</span>
                    <input
                      type='text'
                      name='businessZip'
                      value={formData.businessZip}
                      onChange={handleChange}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </label>
                  <label className='block'>
                    <span className='text-gray-700'>Business Country:</span>
                    <input
                      type='text'
                      name='businessCountry'
                      value={formData.businessCountry}
                      onChange={handleChange}
                      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </label>
                </>
              )}

              <label className='block'>
                <span className='text-gray-700'>Routing Number:</span>
                <input
                  type='text'
                  name='routingNumber'
                  value={formData.routingNumber}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <label className='block'>
                <span className='text-gray-700'>Account Number:</span>
                <input
                  type='text'
                  name='accountNumber'
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </label>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='eSignatureConsent'
                  checked={formData.eSignatureConsent}
                  onChange={handleFormCheckbox}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='eSignatureConsent' className='ml-2 block text-sm text-gray-900'>
                  E-Signature Consent
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='smsAuthorization'
                  checked={formData.smsAuthorization}
                  onChange={handleFormCheckbox}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='smsAuthorization' className='ml-2 block text-sm text-gray-900'>
                  SMS Authorization
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='feeConsent'
                  checked={formData.feeConsent}
                  onChange={handleFormCheckbox}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='feeConsent' className='ml-2 block text-sm text-gray-900'>
                  Fee Consent
                </label>
              </div>
              <div className='block'>
                <span className='text-gray-700'>Attachment1:</span>
                <input
                  type='file'
                  name='attachment1'
                  onChange={handleFileChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='block'>
                <span className='text-gray-700'>Attachment2:</span>
                <input
                  type='file'
                  name='attachment2'
                  onChange={handleFileChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='block'>
                <span className='text-gray-700'>Attachment3:</span>
                <input
                  type='file'
                  name='attachment3'
                  onChange={handleFileChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='acceptTerms'
                  checked={checkbox.acceptTerms}
                  onChange={handleCheckbox}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='acceptTerms' className='ml-2 block text-sm text-gray-900'>
                  Accept Terms
                </label>
              </div>
              <button
                type='submit'
                disabled={!checkbox.acceptTerms}
                onClick={handleSubmit}
                className='mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className='flex justify-center text-center m-[20%]'>Token is Incorrect</p>
      )}
    </div>
  )
}

export default OnboardingForm
