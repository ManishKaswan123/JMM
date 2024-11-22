import React, {useEffect, useState} from 'react'
import {FaCheckCircle, FaEye, FaTimesCircle} from 'react-icons/fa'
import {Button} from 'sr/helpers/ui-components/Button'
import {fetchSellerDetails, updateSellerStatus} from 'sr/utils/api/fetchSellerDetails'
import {getPreSignedURL} from 'sr/utils/api/media'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import {fetchPaymentPlan} from 'sr/utils/api/fetchSellerPaymentPlan'
import {stateData} from 'sr/constants/sellerOnboarding'
import {keepPreviousData, QueryObserverResult, useQuery} from '@tanstack/react-query'
import {UserInterface} from 'sr/constants/User'
import SellerDetailsSkeleton from './SellerDetailsSkeleton'
import {toast} from 'react-toastify'
import {set} from 'react-hook-form'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'

export interface SellerDetailsApiResponse {
  accountNumber?: string
  routingNumber?: string
  storeName?: string
  street?: string
  city?: string
  state: string
  zip?: string
  country?: string
  storeHours?: string
  legalBusinessName?: string
  ein?: string
  businessOwnerName?: string
  businessStreet?: string
  businessCity?: string
  businessState: string
  businessZip?: string
  businessCountry?: string
  businessOwnerDOB?: string
  eSignatureConsent?: string
  smsAuthorization?: string
  feeConsent?: string
  attachment1?: string
  attachment2?: string
  attachment3?: string
  userId: string
  createdAt: string
  updatedAt: string
  id: string // `id` is required
}
interface paymentPlanApiResponse {
  settlementDays?: number
  convenienceFee?: number
  planName?: string
  planDetails?: string
  createdBy?: UserInterface
  isActive?: boolean
  createdAt: string
  updatedAt: string
  id: string
}

interface sellerDetailsCardProps {
  onGoBack: () => void
  selectedUser: UserInterface | undefined
  setSelectedUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
  setReRender: () => Promise<QueryObserverResult<any, Error>>
}

const SellerDetailsCard: React.FC<sellerDetailsCardProps> = ({
  onGoBack,
  selectedUser,
  setSelectedUser,
  setReRender,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [updateType, setUpdateType] = useState<string>('')
  const [selectedValue, setSelectedValue] = useState<string>(
    selectedUser?.sellerPaymentPlanId || ''
  )
  const [paymentPlan, setPaymentPlan] = useState<paymentPlanApiResponse[]>()
  const {data, error, isLoading, isError} = useQuery<SellerDetailsApiResponse>({
    queryKey: ['sellerDetails', {userId: selectedUser?.id}],
    queryFn: async () => fetchSellerDetails(selectedUser?.id || ''),
    placeholderData: keepPreviousData,
    retry: false,
  })
  const renderVerificationStatus = (isVerified: string) => {
    if (isVerified === '') return ''
    return isVerified == 'true' ? (
      <FaCheckCircle className='text-green-500' />
    ) : (
      <FaTimesCircle className='text-red-500' />
    )
  }

  const handleDropdownChange = (event: {target: {value: string}}) => {
    setSelectedValue(event.target.value)
  }

  const changeStatus = async (status: string) => {
    if (!selectedUser) return
    if (updateType === 'approve') {
      if (!selectedValue) {
        toast.error('Please select a payment plan')
        return
      }
      // console.log('status and payment plan is', status, selectedValue)
      const response = await updateSellerStatus(selectedUser?.id, {
        status,
        sellerPaymentPlanId: selectedValue,
      })
      if (!response) return
      setSelectedUser(response)
    } else if (updateType === 'reject') {
      if (!selectedValue) {
        toast.error('Please enter remarks')
        return
      }
      // console.log('status and remarks is', status, selectedValue)
      const response = await updateSellerStatus(selectedUser?.id, {status, message: selectedValue})
      if (!response) return
      setSelectedUser(response)
    }

    setReRender()
  }
  const handleView = async (fileUrl: string) => {
    if (fileUrl === '') return
    const response: any = await getPreSignedURL({fileName: fileUrl})
    window.open(response.results.url.toString(), '_blank')
  }
  useEffect(() => {
    if (!selectedUser) return
    if (isError) onGoBack()
    const fetchData = async () => {
      const res = await fetchPaymentPlan({})

      if (!res) {
        onGoBack()
        return
      }
      setPaymentPlan(res.results)
    }
    fetchData()
  }, [isError])
  // console.log(isError, error?.message)

  return (
    <>
      {!isLoading ? (
        <>
          {data && (
            <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
              <h2 className='text-2xl font-bold mb-6'>Seller Details</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  {data.storeName && (
                    <p className='mb-4'>
                      <strong className='font-medium'>Store Name:</strong> {data.storeName}
                    </p>
                  )}
                  <p className='mb-4'>
                    <strong className='font-medium'>Business Owner:</strong>{' '}
                    {data.businessOwnerName}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Legal Business Name:</strong>{' '}
                    {data.legalBusinessName}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Business Owner DOB:</strong>{' '}
                    {data.businessOwnerDOB}
                  </p>

                  <p className='mb-4'>
                    <strong className='font-medium'>Store Hours:</strong> {data.storeHours}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>EIN:</strong> {data.ein}
                  </p>
                  {/* <p className='mb-4'>
                    <strong className='font-medium'>Routing Number:</strong> {data.routingNumber}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Account Number:</strong> {data.accountNumber}
                  </p> */}
                  <p className='mb-4 flex'>
                    <strong className='font-medium'>E-Signature:</strong>
                    <div className='flex items-center ml-1'>
                      {renderVerificationStatus(data.eSignatureConsent || '')}
                    </div>
                  </p>
                  <p className='mb-4 flex'>
                    <strong className='font-medium'>SMS Authorization: </strong>
                    <div className='flex items-center ml-1'>
                      {renderVerificationStatus(data.smsAuthorization || '')}
                    </div>
                  </p>
                  <p className='mb-4 flex'>
                    <strong className='font-medium'>Fee Consent: </strong>
                    <div className='flex items-center ml-1'>
                      {renderVerificationStatus(data.feeConsent || '')}
                    </div>
                  </p>
                </div>
                <div>
                  <div className='mb-4'>
                    <strong className='font-semibold'>Store Address:</strong>
                    <p>
                      <span className='font-medium'>Street: </span>
                      {data.street}
                    </p>
                    <p>
                      <span className='font-medium'>City: </span>
                      {data.city}
                    </p>
                    <p>
                      <span className='font-medium'>State: </span>
                      {/* {data.state} */}
                      {stateData[data.state]}
                    </p>
                    <p>
                      <span className='font-medium'>Zip: </span>
                      {data.zip}
                    </p>
                    <p>
                      <span className='font-medium'>Country: </span>
                      {data.country}
                    </p>
                  </div>
                  <div className='mb-4'>
                    <strong className='font-semibold'>Business Address:</strong>
                    <p>
                      <span className='font-medium'>Street: </span>
                      {data.businessStreet}
                    </p>
                    <p>
                      <span className='font-medium'>City: </span>
                      {data.businessCity}
                    </p>
                    <p>
                      <span className='font-medium'>State: </span>
                      {/* {data.businessState} */}
                      {stateData[data.businessState]}
                    </p>
                    <p>
                      <span className='font-medium'>Zip: </span>
                      {data.businessZip}
                    </p>
                    <p>
                      <span className='font-medium'>Country: </span>
                      {data.businessCountry}
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <div className='mb-4 flex '>
                      <strong className='font-medium mr-2'>Attachment1:</strong>
                      {/* {data.attachment1 ? data.attachment : 'No attachment'} */}
                      {data.attachment1 ? (
                        <div
                          className='ml-2 flex items-center cursor-pointer hover:text-gray-700'
                          onClick={() => {
                            handleView(data.attachment1 || '')
                          }}
                        >
                          <FaEye style={{fontSize: '1.1rem'}} />
                        </div>
                      ) : (
                        <p className='text-red'>No attachment</p>
                      )}
                    </div>
                    <div className='mb-4 flex'>
                      <strong className='font-medium mr-2'>Attachment2:</strong>
                      {data.attachment2 ? (
                        <div
                          className='ml-2 flex items-center cursor-pointer hover:text-gray-700'
                          onClick={() => {
                            handleView(data.attachment2 || '')
                          }}
                        >
                          <FaEye style={{fontSize: '1.1rem'}} />
                        </div>
                      ) : (
                        <p className='text-red'>No attachment</p>
                      )}
                    </div>
                    <div className='mb-4 flex '>
                      <strong className='font-medium mr-2'>Attachment3:</strong>
                      {data.attachment3 ? (
                        <div
                          className='ml-2 flex items-center cursor-pointer hover:text-gray-700'
                          onClick={() => {
                            handleView(data.attachment3 || '')
                          }}
                        >
                          <FaEye style={{fontSize: '1.1rem'}} />
                        </div>
                      ) : (
                        <p className='text-red'>No attachment</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {!isLoading && !isError && (
                <div className='mt-8 flex justify-between items-center'>
                  <div className='flex justify-center'>
                    <Button
                      className='bg-white text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                      onClick={onGoBack}
                      label={'Go Back 🡸'}
                    />
                  </div>
                  <div className='flex justify-center'>
                    {/* <div className='mx-2'>
                      <Button
                        className='mt-4 w-28 h-10 py-3 rounded-full text-white font-semibold flex justify-center items-center shadow-md'
                        disabled={selectedUser?.sellerStatus === 'approved'}
                        onClick={() => {
                          changeStatus('approved')
                        }}
                        label={'Approve ✔'}
                      />
                    </div> */}
                    <div>
                      <Button
                        className='mt-4 w-28 h-10 py-3 rounded-full text-white font-semibold flex justify-center items-center shadow-md'
                        disabled={selectedUser?.sellerStatus === 'approved'}
                        onClick={() => {
                          setIsModalOpen(true)
                          setUpdateType('approve')
                        }}
                        label={'Approve ✔'}
                      />
                      {isModalOpen && (
                        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
                          <div className='bg-white p-8 rounded shadow-lg w-1/3'>
                            {updateType === 'approve' ? (
                              <DropdownField
                                data={paymentPlan || []}
                                labelKey='planName'
                                label='Payment Plan'
                                placeholder='Select Payment Plan'
                                valueKey='id'
                                onChange={handleDropdownChange}
                                name='PaymentPlan'
                                value={selectedValue}
                              />
                            ) : (
                              updateType == 'reject' && (
                                <TextField
                                  // key={field.name}
                                  type='text'
                                  labelStyle='style1'
                                  label={'Remarks for seller'}
                                  className={`custom-input form-input p-2 border rounded bg-white placeholder:text-[15px]`}
                                  name={'remarks'}
                                  onChange={handleDropdownChange}
                                  placeholder={'remarks for seller'}
                                  required={true}
                                />
                              )
                            )}

                            <div className='flex justify-around mt-4'>
                              <Button
                                className='mt-4 w-28 h-10 py-3 rounded-full text-white font-semibold flex justify-center items-center shadow-md bg-gray'
                                onClick={() => {
                                  setIsModalOpen(false)
                                  setSelectedValue('')
                                  setUpdateType('')
                                }}
                                label={'Cancel'}
                              />

                              <Button
                                className='mt-4 w-28 h-10 py-3 rounded-full text-white font-semibold flex justify-center items-center shadow-md'
                                // disabled={selectedUser?.sellerStatus === 'approved'}
                                onClick={async () => {
                                  if (updateType === 'approve') await changeStatus('approved')
                                  else if (updateType === 'reject') await changeStatus('rejected')

                                  setSelectedValue('')
                                  setUpdateType('')
                                  setIsModalOpen(false)
                                  // setDisabled(true)
                                }}
                                label={'Submit'}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='mx-2'>
                      <Button
                        className='mt-4 w-28 h-10 py-3 rounded-full text-white font-semibold flex justify-center items-center shadow-md'
                        disabled={selectedUser?.sellerStatus === 'rejected'}
                        onClick={async () => {
                          // await changeStatus('rejected')
                          setIsModalOpen(true)
                          setUpdateType('reject')
                          // setDisabled(true)
                        }}
                        label={'Reject ✘'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <SellerDetailsSkeleton />
      )}
    </>
  )
}

export default SellerDetailsCard
