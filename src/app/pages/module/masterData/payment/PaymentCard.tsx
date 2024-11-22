import React, {useState, useEffect, useRef} from 'react'
import {AiOutlineCalendar, AiOutlineDollarCircle, AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import {FaEdit, FaTrash} from 'react-icons/fa'

interface PaymentCardProps {
  payment: {
    id?: string
    amount?: number
    status?: string
    paymentMethod?: number
    transactionId?: string
    createdAt?: string
    updatedAt?: string
    transactionDetails?: {
      nextAction?: any
      canceledAt?: string
      clientSecret?: string
      paymentMethod?: any
      livemode?: boolean
      receiptEmail?: any
      created?: string
      currency?: string
      description?: any
      captureMethod?: string
      status?: string
      paymentMethodId?: string
      lastPaymentError?: string
      confirmationMethod?: string
      amount?: number
      shipping?: any
      bankName?: string
      Type?: string
      id?: string
    }
    userId?: {
      sellerPaymentPlanId?: string
      avalaraCustomerId?: string
      stripeCustomerId?: string
      image?: any
      country?: string
      source?: string
      businessType?: any
      category?: any
      interest?: any
      firstName?: string
      lastName?: string
      email?: string
      phone?: string
      isPhoneVerified?: boolean
      isEmailVerified?: boolean
      createdAt?: string
      updatedAt?: string
      location?: {
        type?: string
        coordinates?: [number, number]
      }
    }
  }
}

const PaymentCard: React.FC<PaymentCardProps> = ({payment}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const cardTop = cardRef.current.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({top: cardTop - 90, behavior: 'smooth'})
    }
  }, [isExpanded])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const handleEdit = () => {
    // Implement edit functionality
  }

  const handleDelete = () => {
    // Implement delete functionality
  }

  return (
    <div ref={cardRef} className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-4 relative'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='flex-1'>
            <div className='mb-4 flex justify-between items-center'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Transaction No: {payment?.transactionId ?? 'N/A'}
              </h2>
              <button onClick={toggleExpand} className='focus:outline-none'>
                {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
            <div className='flex justify-between'>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <p
                    className={`text-xl font-bold mb-2 ${
                      payment?.status === 'received' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    Status: {payment?.status ?? 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineCalendar className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Created At:{' '}
                    {payment?.createdAt
                      ? new Date(parseInt(payment?.createdAt)).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineCalendar className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Updated At:{' '}
                    {payment?.updatedAt
                      ? new Date(parseInt(payment?.updatedAt)).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <p className='text-xl font-bold text-gray-800 mb-2'>
                    Amount: ${payment?.amount ? payment?.amount.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineDollarCircle className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    PaymentMethod: {payment?.paymentMethod ?? 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineDollarCircle className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    TransactionId: {payment?.transactionId ?? 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className='mt-4 overflow-auto max-h-96'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Payment and User Details</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* User Details */}
              <div className='col-span-1'>
                <h4 className='text-md font-semibold text-gray-700 mb-2'>User Details</h4>
                <p className='text-sm font-semibold text-gray-600'>First Name:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.firstName ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Last Name:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.lastName ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.email ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Phone:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.phone ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Email Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    payment?.userId?.isEmailVerified === true ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {payment?.userId?.isEmailVerified ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Phone Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    payment?.userId?.isPhoneVerified === true ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {payment?.userId?.isPhoneVerified ? 'Yes' : 'No'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Seller PaymentPlanId:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.userId?.sellerPaymentPlanId ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Avalara CustomerId:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.userId?.avalaraCustomerId ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Stripe CustomerId:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.userId?.stripeCustomerId ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Country:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.country ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Source:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.source ?? 'N/A'}</p>

                {/* {payment?.userId?.interest && payment?.userId?.interest.length > 0 ? () : <p>} */}
                <p className='text-sm font-semibold text-gray-600'>Interest:</p>
                {payment?.userId?.interest && payment?.userId?.interest.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {payment?.userId?.interest?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Category:</p>
                {payment?.userId?.category && payment?.userId?.category.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {payment?.userId?.category?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Business Type:</p>
                {payment?.userId?.businessType && payment?.userId?.businessType.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {payment?.userId?.businessType?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Created At:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.createdAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Updated At:</p>
                <p className='text-sm text-gray-800'>{payment?.userId?.updatedAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Location:</p>
                {payment?.userId?.location ? (
                  <div className='text-sm text-gray-800'>
                    <p>Type :- {payment?.userId?.location?.type ?? 'N/A'}</p>
                    <p>
                      Coordinates :-
                      {payment?.userId?.location?.coordinates &&
                      payment?.userId?.location?.coordinates?.length > 0 ? (
                        <>
                          {payment?.userId?.location?.coordinates[0] ?? 'N/A'} ,
                          {payment?.userId?.location?.coordinates[1] ?? 'N/A'}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <div className='flex flex-wrap'>
                  <img
                    key={1}
                    src={payment?.userId?.image}
                    alt={`image`}
                    className='w-12 h-12 object-cover m-1'
                  />
                </div>
              </div>
              {/* Transaction Details */}
              <div className='col-span-1'>
                <h4 className='text-md font-semibold text-gray-700 mb-2'>Transaction Details</h4>
                <p className='text-sm font-semibold text-gray-600'>Bank Name:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.bankName ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>CanceledAt:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.canceledAt ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Client Secret:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.clientSecret ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Live Mode:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    payment?.transactionDetails?.livemode === true
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {payment?.transactionDetails?.livemode ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Created:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.created ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Currency:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.currency ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Capture Method:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.captureMethod ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Status:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.status ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Type:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.Type ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Confirmation Method:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.confirmationMethod ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Amount:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.amount ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Payment Method:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.paymentMethod ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Payment MethodId:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.paymentMethodId ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Last Payment Error:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.lastPaymentError ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Receipt Email:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.receiptEmail ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Next Action:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.nextAction ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Shipping:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.shipping ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Description:</p>
                <p className='text-sm text-gray-800'>
                  {payment?.transactionDetails?.description ?? 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentCard
