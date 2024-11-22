import {useEffect, useState} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import {set, useForm} from 'react-hook-form'
import {verifySellerToken} from 'sr/utils/api/verifySellerToken'
import {toast} from 'react-toastify'
import {Button, Spinner} from 'sr/helpers'
import moment from 'moment'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import companyLogo from 'sr/img/company_logo.jpeg'
import FileField from 'sr/partials/widgets/widgets-components/form/FileField'
import {uploadMedia, getPreSignedURL} from 'sr/utils/api/media'
import getSignedURL from 'sr/utils/helpers/getSignedURL'
import {submitSellerOnBoardingForm} from 'sr/utils/api/submitSellerOnBoardingForm'
import {stateData} from 'sr/constants/sellerOnboarding'
import {VerifySellerTokenResponseType} from './verifyTokenResponseType'
import {FaEye, FaTrashAlt} from 'react-icons/fa'

// const stateList: any = stateData
// const formattedStateData = Object.keys(stateList).map((stateId: any) => ({
//   name: stateList[stateId],
const formattedStateData = Object.keys(stateData).map((stateId: any) => ({
  name: stateData[stateId],
  id: stateId,
}))

export default function SellerOnBoarding() {
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token') || ''
  const [loader, setLoader] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [res, setRes] = useState<VerifySellerTokenResponseType>()
  const [formValues, setFormValues] = useState({
    storeName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    storeHours: '',
    legalBusinessName: '',
    ein: '',
    businessOwnerName: '',
    businessAddressSameAsStore: false,
    businessStreet: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessCountry: '',
    businessOwnerDOB: '',
    // routingNumber: '',
    // accountNumber: '',
    eSignatureConsent: false,
    smsAuthorization: false,
    feeConsent: false,
    attachment1: '',
    attachment2: '',
    attachment3: '',
    signedUrlAttachment1: '',
    signedUrlAttachment2: '',
    signedUrlAttachment3: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: '',
  })
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm({mode: 'onBlur', reValidateMode: 'onChange', defaultValues: formValues})

  const getUserDetails = async () => {
    setLoader(true)

    const res: VerifySellerTokenResponseType = await verifySellerToken(token)
    if (res) {
      setRes(res)
      reset({
        ...formValues,
        email: res?.email || '',
        phone: res?.phone || '',
        street: res?.address?.streetAddress || '',
        state: res?.address?.stateCode || '',
        city: res?.address?.city || '',
        zip: res?.address?.postalCode || '',
        firstName: res?.firstName || '',
        lastName: res?.lastName || '',
        id: res?.id || '',
      })
    }

    // setIsOpen(true)
    // navigate('/auth')

    setLoader(false)
  }

  useEffect(() => {
    if (token != '') getUserDetails()
  }, [token])

  const handleSubmitForm = async (formData: any, e: any) => {
    e.preventDefault()
    setLoader(true)
    const payload = {
      ...formData,
      userId: formValues.id,
      eSignatureConsent: formData.eSignatureConsent === 'Yes' ? true : false,
      smsAuthorization: formData.smsAuthorization === 'Yes' ? true : false,
      feeConsent: formData.feeConsent === 'Yes' ? true : false,
      // attachment1: formValues.attachment1,
      // attachment2: formValues.attachment2,
      // attachment3: formValues.attachment3,
      businessOwnerDOB:
        formData.businessOwnerDOB && moment(formData.businessOwnerDOB).format('MM/DD/YYYY'),
    }

    // console.log('payload handleSubmitForm :- ', payload)
    const res = await submitSellerOnBoardingForm(token, payload)
    if (res) {
      setLoader(false)
      navigate('/auth')
    }
    setLoader(false)
  }

  const handleFileSelect = async (e: any) => {
    // e.preventDefault()
    const file: File | null = e.target.files?.[0] || null
    const formData = new FormData()
    if (file) {
      // Check if file size is greater than 1MB (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        toast.error('File size should not exceed 1MB')
        return false
      }
      setLoader(true)
      let fileType = ''
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const validDocumentTypes = ['application/pdf', 'text/plain']
      if (validImageTypes.includes(file.type)) {
        fileType = 'image'
      } else if (validDocumentTypes.includes(file.type)) {
        fileType = 'document'
      } else {
        toast.error('File type should be jpeg, jpg, png, txt, or pdf')
        setLoader(false)
        return false
      }
      let fileName = file.name
      fileName = fileName.replace(/[^a-zA-Z0-9. ]/g, '').replace(/ /g, '-')
      formData.append('file', file, fileName)
      formData.append('file_type', fileType)
      // formData.append('userAuthId', userData.agentAuthId)
      const res: any = await uploadMedia(formData)
      console.log('upload res is : ', res)
      if (res && res.status) {
        const photoRes = await getSignedURL(res.results.fileName)
        console.log('photoRes is : ', photoRes)
        if (e.target.name === 'attachment1') {
          // setFormValues({
          //   ...formValues,
          //   attachment1: res.results.fileName,
          //   signedUrlAttachment1: photoRes,
          // })
          setValue('attachment1', res.results.fileName)
          setValue('signedUrlAttachment1', photoRes)
          console.log('formValues', formValues)
        } else if (e.target.name === 'attachment2') {
          // setFormValues({
          //   ...formValues,
          //   attachment2: res.results.fileName,
          //   signedUrlAttachment2: photoRes,
          // })
          setValue('attachment2', res.results.fileName)
          setValue('signedUrlAttachment2', photoRes)
        } else if (e.target.name === 'attachment3') {
          // setFormValues({
          //   ...formValues,
          //   attachment3: res.results.fileName,
          //   signedUrlAttachment3: photoRes,
          // })
          setValue('attachment3', res.results.fileName)
          setValue('signedUrlAttachment3', photoRes)
        }
      } else {
        toast.error(res?.error)
      }
      setLoader(false)
    }
  }

  const handleAddressCheckbox = async (e: any) => {
    // e.preventDefault()
    const val: any = e.target.value
    // console.log('val', val)
    if (val) {
      let data = getValues()
      setValue('businessStreet', data.street)
      setValue('businessCity', data.city)
      setValue('businessState', data.state)
      setValue('businessZip', data.zip)
      setValue('businessCountry', data.country)
    }
  }
  console.log('attachemtn1', watch('signedUrlAttachment1'))
  console.log('attachemtn 1 is', watch('attachment1'))

  return (
    <section className='section'>
      {loader && <Spinner />}
      <div className='bg-gray-300 h-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full  lg:p-4 xl:p-4'>
          <div className='rounded-lg bg-[#F7F7F7] px-4 py-2 w-[85%]'>
            <div className='image-container flex justify-center items-center'>
              <img src={companyLogo} alt='Company Logo' className='image h-16 ' />
            </div>
            <div className='flex justify-center font-ubuntu-bold text-xl md:text-2xl pt-1 text-[#16c993]'>
              Seller Onboarding Form
            </div>
            <form action='' onSubmit={handleSubmit(handleSubmitForm)} className='mx-[9%] mt-[2%] '>
              <div className='flex flex-wrap w-full justify-between items-center '>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    disabled={!!res?.firstName}
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    type='text'
                    label='First Name'
                    required={true}
                    id='firstName'
                    name='firstName'
                    register={register('firstName', {
                      required: true,
                    })}
                    placeholder='First Name'
                    error={errors.firstName && !watch('firstName')}
                    errorText='Please enter First Name'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    disabled={!!res?.lastName}
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    type='text'
                    label='Last Name'
                    required={true}
                    id='lastName'
                    name='lastName'
                    register={register('lastName', {
                      required: true,
                    })}
                    placeholder='Last Name'
                    error={errors.lastName && !watch('lastName')}
                    errorText='Please enter Last Name'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    disabled={res?.email ? true : false}
                    type='text'
                    label='Email'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='email'
                    name='email'
                    register={register('email', {
                      required: true,
                    })}
                    placeholder='Email'
                    error={errors.email && !watch('email')}
                    errorText='Please enter Email'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    disabled={res?.phone ? true : false}
                    type='text'
                    label='Mobile'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='phone'
                    name='phone'
                    register={register('phone', {
                      required: true,
                    })}
                    placeholder='Mobile'
                    error={errors.phone && !watch('phone')}
                    errorText='Please enter Mobile'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Store Name'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='storeName'
                    name='storeName'
                    register={register('storeName', {
                      required: true,
                    })}
                    placeholder='Store Name'
                    error={errors.storeName && !watch('storeName')}
                    errorText='Please enter Store Name'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    disabled={true}
                    type='text'
                    label='Country'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='country'
                    name='country'
                    register={register('country', {
                      required: true,
                    })}
                    placeholder='Country'
                    error={errors.country && !watch('country')}
                    errorText='Please enter Country'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    // disabled={res?.address.streetAddress ? true : false}
                    type='text'
                    label='Street'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='street'
                    name='street'
                    register={register('street', {
                      required: true,
                    })}
                    placeholder='Street'
                    error={errors.street && !watch('street')}
                    errorText='Please enter Street'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    // disabled={res?.address.city ? true : false}
                    type='text'
                    label='City'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='city'
                    name='city'
                    register={register('city', {
                      required: true,
                    })}
                    placeholder='City'
                    error={errors.city && !watch('city')}
                    errorText='Please enter City'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <DropdownField
                    // disabled={res?.address?.province?.[0].abbreviation ? true : false}
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    labelStyle='style2'
                    data={formattedStateData}
                    labelKey='name'
                    label={'State'}
                    placeholder={'Select state'}
                    valueKey='id'
                    name='state'
                    required={true}
                    // onChange={handleCategoryChange}
                    register={register('state', {
                      required: true,
                    })}
                    error={errors.state && !watch('state')}
                    errorText='Please select State'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    // disabled={res?.address.postalCode ? true : false}
                    type='text'
                    label='Zip'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='zip'
                    name='zip'
                    register={register('zip', {
                      required: true,
                    })}
                    placeholder='Zip'
                    error={errors.zip && !watch('zip')}
                    errorText='Please enter Zip'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Store Hours'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='storeHours'
                    name='storeHours'
                    register={register('storeHours', {
                      required: true,
                    })}
                    placeholder='Store Hours'
                    error={errors.storeHours && !watch('storeHours')}
                    errorText='Please enter Store Hours'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Legal Business Name'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='legalBusinessName'
                    name='legalBusinessName'
                    register={register('legalBusinessName', {
                      required: true,
                    })}
                    placeholder='Legal Business Name'
                    error={errors.legalBusinessName && !watch('legalBusinessName')}
                    errorText='Please enter Legal Business Name'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='EIN'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='ein'
                    name='ein'
                    register={register('ein', {
                      required: true,
                    })}
                    placeholder='EIN'
                    error={errors.ein && !watch('ein')}
                    errorText='Please enter EIN'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Business Owner Name'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='businessOwnerName'
                    name='businessOwnerName'
                    register={register('businessOwnerName', {
                      required: true,
                    })}
                    placeholder='Business Owner Name'
                    error={errors.businessOwnerName && !watch('businessOwnerName')}
                    errorText='Please enter Business Owner Name'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-start items-center my-2'>
                <div className='flex items-center'>
                  <TextField
                    type='checkbox'
                    label='Business Address Same as Store Address'
                    className='form-checkbox w-4 h-4 m-1'
                    wrapperClassName='flex flex-row items-center' // Ensure the wrapper is flex with row direction
                    required={false}
                    id='businessAddressSameAsStore'
                    name='businessAddressSameAsStore'
                    value='Yes'
                    register={register('businessAddressSameAsStore', {
                      required: false,
                      onChange: (e) => {
                        handleAddressCheckbox(e)
                      },
                    })}
                  />
                </div>
              </div>

              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Business Street'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='businessStreet'
                    name='businessStreet'
                    register={register('businessStreet', {
                      required: true,
                    })}
                    placeholder='Business Street'
                    error={errors.businessStreet && !watch('businessStreet')}
                    errorText='Please enter Business Street'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Business City'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='businessCity'
                    name='businessCity'
                    register={register('businessCity', {
                      required: true,
                    })}
                    placeholder='Business City'
                    error={errors.businessCity && !watch('businessCity')}
                    errorText='Please enter Business City'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <DropdownField
                    // disabled={res?.address?.province?.[0].abbreviation ? true : false}
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    labelStyle='style2'
                    data={formattedStateData}
                    labelKey='name'
                    label={'Business State'}
                    placeholder={'Select Business State'}
                    valueKey='id'
                    name='state'
                    required={true}
                    // onChange={handleCategoryChange}
                    register={register('businessState', {
                      required: true,
                    })}
                    error={errors.state && !watch('businessState')}
                    errorText='Please select State'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Business Zip'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='businessZip'
                    name='businessZip'
                    register={register('businessZip', {
                      required: true,
                    })}
                    placeholder='Business Zip'
                    error={errors.businessZip && !watch('businessZip')}
                    errorText='Please enter Business Zip'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='text'
                    label='Business Country'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='businessCountry'
                    name='businessCountry'
                    register={register('businessCountry', {
                      required: true,
                    })}
                    placeholder='Business Country'
                    error={errors.businessCountry && !watch('businessCountry')}
                    errorText='Please enter Business Country'
                  />
                </div>
                <div className='w-full md:w-2/5 mb-4 md:mb-0'>
                  <TextField
                    type='date'
                    label='Business Owner DOB'
                    className=' px-4 py-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // className='px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    // wrapperClassName='text-sm font-medium text-left py-2 seller'
                    required={true}
                    id='businessOwnerDOB'
                    name='businessOwnerDOB'
                    register={register('businessOwnerDOB', {
                      required: true,
                    })}
                    placeholder='Business Owner DOB'
                    error={errors.businessOwnerDOB && !watch('businessOwnerDOB')}
                    errorText='Please enter Business Owner DOB'
                  />
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center my-2'>
                <div className='flex items-center'>
                  <TextField
                    type='checkbox'
                    label='Please enter E-Signature Consent'
                    className='form-checkbox w-4 h-4 m-1'
                    wrapperClassName='flex items-center'
                    required={true}
                    id='eSignatureConsent'
                    name='eSignatureConsent'
                    value='Yes'
                    register={register('eSignatureConsent', {
                      required: true,
                    })}
                    // placeholder='E-Signature Consent'
                    error={errors.eSignatureConsent && !watch('eSignatureConsent')}
                    errorText='Please enter E-Signature Consent'
                  />
                  {/* <label htmlFor='businessAddressSameAsStore' className='ml-5'>
                    E-Signature Consent
                  </label> */}
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-start items-center my-2'>
                <div className='flex items-center'>
                  <TextField
                    type='checkbox'
                    label='SMS Authorization'
                    className='form-checkbox w-4 h-4 m-1'
                    wrapperClassName='flex items-start'
                    required={true}
                    id='smsAuthorization'
                    name='smsAuthorization'
                    value='Yes'
                    register={register('smsAuthorization', {
                      required: true,
                    })}
                    // placeholder='SMS Authorization'
                    error={errors.smsAuthorization && !watch('smsAuthorization')}
                    errorText='Please enter SMS Authorization'
                  />
                  {/* <label htmlFor='businessAddressSameAsStore' className='ml-5'>
                    SMS Authorization
                  </label> */}
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-start items-center my-2'>
                <div className='flex items-center'>
                  <TextField
                    type='checkbox'
                    label='Fee Consent'
                    className='form-checkbox w-4 h-4 m-1 '
                    wrapperClassName='flex items-start'
                    required={true}
                    id='feeConsent'
                    name='feeConsent'
                    value='Yes'
                    register={register('feeConsent', {
                      required: true,
                    })}
                    // placeholder='Fee Consent'
                    error={errors.feeConsent && !watch('feeConsent')}
                    errorText='Please enter Fee Consent'
                  />
                  {/* <label htmlFor='businessAddressSameAsStore' className='ml-5'>
                    Fee Consent
                  </label> */}
                </div>
              </div>
              <div className='flex flex-wrap w-full justify-between items-center'>
                <div>
                  <FileField
                    label='Upload Attachment 1'
                    labelStyle='style2'
                    wrapperLabel='Upload Attachment 1'
                    // className='border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    wrapperClassName='mx-2'
                    signedPhoto={formValues.signedUrlAttachment1}
                    id='attachment1'
                    onChange={(e: any) => {
                      handleFileSelect(e)
                    }}
                    name='attachment1'
                  />
                  {watch('signedUrlAttachment1') != '' && (
                    <div className='flex justify-around items-center'>
                      <a
                        href={watch('signedUrlAttachment1')}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 underline hover:text-blue-700'
                      >
                        <FaEye
                          className='cursor-pointer text-blue-500 hover:text-gray-700'
                          style={{fontSize: '1.1rem'}}
                        />
                      </a>
                      <FaTrashAlt
                        className='text-red-500 cursor-pointer ml-4 h-4 w-4'
                        onClick={() => {
                          setValue('signedUrlAttachment1', '') // Clear the attachment value
                          setValue('attachment1', '')
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <FileField
                    label='Upload Attachment 2'
                    labelStyle='style2'
                    wrapperLabel='Upload Attachment 2'
                    // className='border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 '
                    wrapperClassName='mx-2'
                    signedPhoto={formValues.signedUrlAttachment2}
                    id='attachment2'
                    onChange={(e: any) => {
                      handleFileSelect(e)
                    }}
                    name='attachment2'
                  />
                  {watch('signedUrlAttachment2') != '' && (
                    <div className='flex justify-around items-center '>
                      <a
                        href={watch('signedUrlAttachment2')}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500  hover:text-blue-700'
                      >
                        <FaEye
                          className='cursor-pointer text-blue-500 hover:text-gray-700'
                          style={{fontSize: '1.1rem'}}
                        />
                      </a>
                      <FaTrashAlt
                        className='text-red-500 cursor-pointer ml-4 h-4 w-4'
                        onClick={() => {
                          setValue('signedUrlAttachment2', '') // Clear the attachment value
                          setValue('attachment2', '')
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <FileField
                    label='Upload Attachment 3'
                    labelStyle='style2'
                    wrapperLabel='Upload Attachment 3'
                    // className='border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    wrapperClassName='mx-2'
                    signedPhoto={formValues.signedUrlAttachment3}
                    id='attachment3'
                    onChange={(e: any) => {
                      handleFileSelect(e)
                    }}
                    name='attachment3'
                  />

                  {watch('signedUrlAttachment3') != '' && (
                    <div className='flex justify-around items-center'>
                      <a
                        href={watch('signedUrlAttachment3')}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 underline hover:text-blue-700'
                      >
                        <FaEye
                          className='cursor-pointer text-blue-500 hover:text-gray-700'
                          style={{fontSize: '1.1rem'}}
                        />
                      </a>
                      <FaTrashAlt
                        className='text-red-500 cursor-pointer ml-4 h-4 w-4'
                        onClick={() => {
                          setValue('signedUrlAttachment3', '') // Clear the attachment value
                          setValue('attachment3', '')
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex justify-center items-center my-[2%]'>
                <Button
                  type='submit'
                  className='mt-2 h-[12%] flex justify-center items-center w-[30%] md:w-[16%] lg:w-[16%] py-3 save-btn rounded-lg text-white font-semibold text-center text-sm md:text-base lg:text-lg'
                  label={isSubmitting ? 'Submitting...' : 'Submit'}
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
