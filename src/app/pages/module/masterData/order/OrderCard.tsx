import React, {useEffect, useRef, useState} from 'react'
import {AiOutlineCalendar, AiOutlineDollarCircle, AiOutlineUp, AiOutlineDown} from 'react-icons/ai'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

interface Address {
  label: string | null
  countryName: string | null
  state: string | null
  city: string | null
  street: string | null
  postalCode: string | null
}

interface Location {
  type?: string
  coordinates?: [number, number]
}

interface User {
  id?: string | null
  location?: Location | null
  isPhoneVerified?: boolean
  email?: string
  phone?: string
  role?: string
  source?: string
  isEmailVerified?: boolean
  sellerStatus?: string
  address?: Address
  businessType?: any
  category?: any
  interest?: any
  country?: string
  firstName?: string
  lastName?: string
  createdAt?: string
  updatedAt?: string
  sellerPaymentPlanId?: string
}

interface Order {
  paymentStatus?: string
  cartDetails?: any
  deliveryDateTime?: string
  payedUserId?: User | null
  receiverUserId?: User | null
  userId?: User | null
  deliveryType?: string
  shipmentId?: any
  paymentMethod?: number
  totalAmount?: number
  cardAmount?: number
  walletAmount?: number
  tax?: number
  currency?: string
  orderType?: number
  walletPaymentId?: string
  status?: string
  title?: string
  createdAt?: string
  updatedAt?: string
  id?: string
}

interface OrderCardProps {
  order: Order
}

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  const navigate = useNavigate()
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

  const handleShowDetails = (id: any) => {
    navigate(`/user/${id}`)
  }

  return (
    <div ref={cardRef} className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-4 relative'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='flex-1'>
            <div className='mb-4 flex justify-between items-center'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Delivery Date: {order?.deliveryDateTime ?? 'N/A'}
              </h2>
              <button onClick={toggleExpand} className='focus:outline-none'>
                {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
            <div className='flex justify-between'>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <p className='text-xl font-bold text-gray-800 mb-2'>
                    Title: {order?.title ?? 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <p
                    className={`text-xl font-bold mb-2 ${
                      order?.status !== 'pending' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    Status: {order?.status ?? 'N/A'}
                  </p>
                </div>

                <div className='flex items-center'>
                  <AiOutlineCalendar className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Created At:{' '}
                    {order?.createdAt
                      ? new Date(parseInt(order?.createdAt)).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineCalendar className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Updated At:{' '}
                    {order?.updatedAt
                      ? new Date(parseInt(order?.updatedAt)).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <p className='text-xl font-bold text-gray-800 mb-2'>
                    Amount: ${order?.totalAmount ? order?.totalAmount.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <p
                    className={`text-xl font-bold mb-2 ${
                      order?.paymentStatus !== 'pending' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    PaymentStatus: {order?.paymentStatus ?? 'N/A'}
                  </p>
                </div>

                <div className='flex items-center'>
                  <AiOutlineDollarCircle className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    OrderMethod: {order?.paymentMethod ?? 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineDollarCircle className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    WalletPaymentId: {order?.walletPaymentId ?? 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex justify-end'>
        <FaEdit className='text-blue-500 cursor-pointer mr-4 h-4 w-4 inline' onClick={handleEdit} />
        <FaTrash className='text-red-500 cursor-pointer h-4 w-4 inline' onClick={handleDelete} />
      </div> */}
      <div className='flex justify-end'>
        <FaTrash className='text-red-500 cursor-pointer h-4 w-4 inline' onClick={handleDelete} />
      </div>
      {isExpanded && (
        <div className='mt-4 overflow-auto max-h-96'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Order and User Details</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* User and Order Details */}
              <div className='col-span-1'>
                {/* Order Details */}
                <h4 className='text-md font-bold text-gray-900 mb-2 mt-2'>Order Details</h4>
                <p className='text-sm font-semibold text-gray-600'>Delivery Type:</p>
                <p className='text-sm text-gray-800'>{order?.deliveryType ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>ShipmentId:</p>
                <p className='text-sm text-gray-800'>{order?.shipmentId ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Payment Method:</p>
                <p className='text-sm text-gray-800'>{order?.paymentMethod ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Card Amount:</p>
                <p className='text-sm text-gray-800'>{order?.cardAmount ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Wallet Amount:</p>
                <p className='text-sm text-gray-800'>{order?.walletAmount ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Tax:</p>
                <p className='text-sm text-gray-800'>{order?.tax ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Currency:</p>
                <p className='text-sm text-gray-800'>{order?.currency ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Order Type:</p>
                <p className='text-sm text-gray-800'>{order?.orderType ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Order Id:</p>
                <p className='text-sm text-gray-800'>{order?.id ?? 'N/A'}</p>
                {/* User Details */}
                <h4 className='text-md font-bold text-gray-900 mb-2'>User Details</h4>
                <p className='text-sm font-semibold text-gray-600'>First Name:</p>
                <p className='text-sm text-gray-800'>
                  {order?.userId?.firstName ?? 'N/A'} {order?.userId?.lastName ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.email ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Phone:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.phone ?? 'N/A'}</p>
                <button
                  onClick={() => handleShowDetails(order?.userId?.id)}
                  className='text-blue-500 hover:underline'
                >
                  Show Details
                </button>
                {/* <p className='text-sm font-semibold text-gray-600'>Email Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    order?.userId?.isEmailVerified === true ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {order?.userId?.isEmailVerified ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Phone Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    order?.userId?.isPhoneVerified === true ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {order?.userId?.isPhoneVerified ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>role:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.role ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Seller Status:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.sellerStatus ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Seller Payment PlanId:</p>
                <p className='text-sm text-gray-800'>
                  {order?.userId?.sellerPaymentPlanId ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Country:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.country ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Source:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.source ?? 'N/A'}</p>
                {/* {order?.userId?.interest && order?.userId?.interest.length > 0 ? () : <p>} */}
                {/* <p className='text-sm font-semibold text-gray-600'>Interest:</p>
                {order?.userId?.interest && order?.userId?.interest.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.userId?.interest?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}
                <p className='text-sm font-semibold text-gray-600'>Category:</p>
                {order?.userId?.category && order?.userId?.category.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.userId?.category?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}
                {/* <p className='text-sm font-semibold text-gray-600'>Business Type:</p>
                {order?.userId?.businessType && order?.userId?.businessType.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.userId?.businessType?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}
                {/* <p className='text-sm font-semibold text-gray-600'>Created At:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.createdAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Updated At:</p>
                <p className='text-sm text-gray-800'>{order?.userId?.updatedAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Location:</p> */}
                {/* {order?.userId?.location ? (
                  <div className='text-sm text-gray-800'>
                    <p>Type :- {order?.userId?.location?.type ?? 'N/A'}</p>
                    <p>
                      Coordinates :-
                      {order?.userId?.location?.coordinates &&
                      order?.userId?.location?.coordinates?.length > 0 ? (
                        <>
                          {order?.userId?.location?.coordinates[0] ?? 'N/A'} ,
                          {order?.userId?.location?.coordinates[1] ?? 'N/A'}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}
              </div>
              {/* Payed and Receiver Details */}
              <div className='col-span-1'>
                {/* Payed Details */}
                <h4 className='text-md font-bold text-gray-900 mb-2 mt-2'>Payed User Details</h4>
                <p className='text-sm font-semibold text-gray-600'>First Name:</p>
                <p className='text-sm text-gray-800'>
                  {order?.payedUserId?.firstName ?? 'N/A'} {order?.payedUserId?.lastName ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.email ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Phone:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.phone ?? 'N/A'}</p>
                <button
                  onClick={() => handleShowDetails(order?.payedUserId?.id)}
                  className='text-blue-500 hover:underline'
                >
                  Show Details
                </button>
                {/* <p className='text-sm font-semibold text-gray-600'>Email Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    order?.payedUserId?.isEmailVerified === true ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {order?.payedUserId?.isEmailVerified ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Phone Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    order?.payedUserId?.isPhoneVerified === true ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {order?.payedUserId?.isPhoneVerified ? 'Yes' : 'No'}
                </p> */}

                {/* <p className='text-sm font-semibold text-gray-600'>role:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.role ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Seller Status:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.sellerStatus ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Seller Payment PlanId:</p>

                <p className='text-sm text-gray-800'>
                  {order?.payedUserId?.sellerPaymentPlanId ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Country:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.country ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Source:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.source ?? 'N/A'}</p> */}

                {/* {order?.payedUserId?.interest && order?.payedUserId?.interest.length > 0 ? () : <p>} */}
                {/* <p className='text-sm font-semibold text-gray-600'>Interest:</p>
                {order?.payedUserId?.interest && order?.payedUserId?.interest.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.payedUserId?.interest?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Category:</p> */}
                {/* {order?.payedUserId?.category && order?.payedUserId?.category.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.payedUserId?.category?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Business Type:</p> */}
                {/* {order?.payedUserId?.businessType && order?.payedUserId?.businessType.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.payedUserId?.businessType?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}

                {/* <p className='text-sm font-semibold text-gray-600'>Created At:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.createdAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Updated At:</p>
                <p className='text-sm text-gray-800'>{order?.payedUserId?.updatedAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Location:</p> */}
                {/* {order?.payedUserId?.location ? (
                  <div className='text-sm text-gray-800'>
                    <p>Type :- {order?.payedUserId?.location?.type ?? 'N/A'}</p>
                    <p>
                      Coordinates :-
                      {order?.payedUserId?.location?.coordinates &&
                      order?.payedUserId?.location?.coordinates?.length > 0 ? (
                        <>
                          {order?.payedUserId?.location?.coordinates[0] ?? 'N/A'} ,
                          {order?.payedUserId?.location?.coordinates[1] ?? 'N/A'}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}
                {/* Receiver Details */}
                <h4 className='text-md font-bold text-gray-900 mb-2 mt-2'>Receiver User Details</h4>
                <p className='text-sm font-semibold text-gray-600'>First Name:</p>
                <p className='text-sm text-gray-800'>
                  {order?.receiverUserId?.firstName ?? 'N/A'}{' '}
                  {order?.receiverUserId?.lastName ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.email ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Phone:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.phone ?? 'N/A'}</p>
                <button
                  onClick={() => handleShowDetails(order?.receiverUserId?.id)}
                  className='text-blue-500 hover:underline'
                >
                  Show Details
                </button>
                {/* <p className='text-sm font-semibold text-gray-600'>Email Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    order?.receiverUserId?.isEmailVerified === true
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {order?.receiverUserId?.isEmailVerified ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Phone Verified:</p>
                <p
                  className={`text-sm text-gray-800 ${
                    order?.receiverUserId?.isPhoneVerified === true
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {order?.receiverUserId?.isPhoneVerified ? 'Yes' : 'No'}
                </p> */}

                {/* <p className='text-sm font-semibold text-gray-600'>role:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.role ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Seller Status:</p>
                <p className='text-sm text-gray-800'>
                  {order?.receiverUserId?.sellerStatus ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Seller Payment PlanId:</p>

                <p className='text-sm text-gray-800'>
                  {order?.receiverUserId?.sellerPaymentPlanId ?? 'N/A'}
                </p>

                <p className='text-sm font-semibold text-gray-600'>Country:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.country ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Source:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.source ?? 'N/A'}</p> */}

                {/* {order?.receiverUserId?.interest && order?.receiverUserId?.interest.length > 0 ? () : <p>} */}
                {/* <p className='text-sm font-semibold text-gray-600'>Interest:</p>
                {order?.receiverUserId?.interest && order?.receiverUserId?.interest.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.receiverUserId?.interest?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Category:</p>
                {order?.receiverUserId?.category && order?.receiverUserId?.category.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.receiverUserId?.category?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                <p className='text-sm font-semibold text-gray-600'>Business Type:</p>
                {order?.receiverUserId?.businessType &&
                order?.receiverUserId?.businessType.length > 0 ? (
                  <div className='text-sm text-gray-800'>
                    {order?.receiverUserId?.businessType?.map((item: any, index: number) => (
                      <p key={index}>{item ?? 'N/A'}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}

                {/* <p className='text-sm font-semibold text-gray-600'>Created At:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.createdAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Updated At:</p>
                <p className='text-sm text-gray-800'>{order?.receiverUserId?.updatedAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Location:</p> */}
                {/* {order?.receiverUserId?.location ? (
                  <div className='text-sm text-gray-800'>
                    <p>Type :- {order?.receiverUserId?.location?.type ?? 'N/A'}</p>
                    <p>
                      Coordinates :-
                      {order?.receiverUserId?.location?.coordinates &&
                      order?.receiverUserId?.location?.coordinates?.length > 0 ? (
                        <>
                          {order?.receiverUserId?.location?.coordinates[0] ?? 'N/A'} ,
                          {order?.receiverUserId?.location?.coordinates[1] ?? 'N/A'}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCard
