import React, {useState, useEffect, useRef} from 'react'
import {AiOutlineCalendar, AiOutlineDollarCircle, AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
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

interface User {
  id: string | null
  email: string | null
  phone: string | null
  role: string | null
  source: string | null
  isEmailVerified: boolean | null
  address: Address | null
  firstName: string | null
  lastName: string | null
  createdAt: string | null
  updatedAt: string | null
  sellerStatus: string | null
  isPhoneVerified: boolean | null
}

interface TransactionDetails {
  created: string | null
  confirmationMethod: string | null
  amount: number | null
  clientSecret: string | null
  receiptEmail: string | null
  shipping: string | null
  livemode: boolean | null
  lastPaymentError: string | null
  currency: string | null
  captureMethod: string | null
  paymentMethodId: string | null
  canceledAt: string | null
  id: string
  nextAction: string | null
  paymentMethod: string | null
  status: string | null
  description: string | null
}

interface Transaction {
  amount: number | null
  transactionType: string | null
  transactionMode: string | null
  userId: User | null
  status: string | null
  createdAt: string | null
  updatedAt: string | null
  transactionDetails: TransactionDetails | null
  transactionNo: string | null
  id: string
}

interface TransactionCardProps {
  transaction: Transaction
  expandedId: string | null
  setSelectedData: any
  setIsUpdateModalOpen?: any
  setExpandedId: React.Dispatch<React.SetStateAction<string | null>>
  onDelete: (id: string) => void
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  expandedId,
  setSelectedData,
  setIsUpdateModalOpen,
  setExpandedId,
  onDelete,
}) => {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const {
    amount,
    transactionNo,
    transactionType,
    transactionMode,
    status,
    createdAt,
    updatedAt,
    userId,
    transactionDetails,
    id,
  } = transaction

  useEffect(() => {
    setIsExpanded(expandedId === id)
  }, [expandedId, id])
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const cardTop = cardRef.current.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({top: cardTop - 100, behavior: 'smooth'})
    }
  }, [isExpanded])

  const toggleExpand = () => {
    if (isExpanded) {
      setExpandedId(null) // Collapse if already expanded
    } else {
      setExpandedId(id) // Expand current card
    }
  }

  const handleDelete = () => {
    // Implement delete functionality
    onDelete(id)
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
                Transaction No: {transactionNo ?? 'N/A'}
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
                      status === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    Status: {status ?? 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineCalendar className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Created At: {createdAt ? new Date(parseInt(createdAt)).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineCalendar className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Updated At: {updatedAt ? new Date(parseInt(updatedAt)).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <p className='text-xl font-bold text-gray-800 mb-2'>
                    Amount: ${amount ? amount.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineDollarCircle className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Transaction Type: {transactionType ?? 'N/A'}
                  </p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineDollarCircle className='mr-2' />
                  <p className='text-sm text-gray-600'>
                    Transaction Mode: {transactionMode ?? 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <FaEdit
          className='text-blue-500 cursor-pointer mr-4 h-4 w-4 inline'
          onClick={() => {
            setSelectedData(transaction)
            setIsUpdateModalOpen(true)
          }}
        />
        <FaTrash className='text-red-500 cursor-pointer h-4 w-4 inline' onClick={handleDelete} />
      </div>
      {isExpanded && (
        <div className='mt-4 overflow-auto max-h-96'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Transaction and User Details
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* Transaction Details */}
              <div className='col-span-1'>
                <h4 className='text-md font-semibold text-gray-700 mb-2'>Transaction Details</h4>
                <p className='text-sm font-semibold text-gray-600'>Confirmation Method:</p>
                <p className='text-sm text-gray-800'>
                  {transactionDetails?.confirmationMethod ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Payment Method ID:</p>
                <p className='text-sm text-gray-800'>
                  {transactionDetails?.paymentMethodId ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Currency:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.currency ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Description:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.description ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Status:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.status ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Amount:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.amount ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Client Secret:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.clientSecret ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Receipt Email:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.receiptEmail ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Shipping:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.shipping ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Live Mode:</p>
                <p className='text-sm text-gray-800'>
                  {transactionDetails?.livemode ? 'Yes' : 'No'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Last Payment Error:</p>
                <p className='text-sm text-gray-800'>
                  {transactionDetails?.lastPaymentError ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Capture Method:</p>
                <p className='text-sm text-gray-800'>
                  {transactionDetails?.captureMethod ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Canceled At:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.canceledAt ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Next Action:</p>
                <p className='text-sm text-gray-800'>{transactionDetails?.nextAction ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Payment Method:</p>
                <p className='text-sm text-gray-800'>
                  {transactionDetails?.paymentMethod ?? 'N/A'}
                </p>
              </div>

              {/* User Details */}
              <div className='col-span-1'>
                <h4 className='text-md font-semibold text-gray-700 mb-2'>User Details</h4>
                <p className='text-sm font-semibold text-gray-600'>Name:</p>
                <p className='text-sm text-gray-800'>
                  {userId?.firstName ?? 'N/A'} {userId?.lastName ?? 'N/A'}
                </p>
                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                <p className='text-sm text-gray-800'>{userId?.email ?? 'N/A'}</p>
                <p className='text-sm font-semibold text-gray-600'>Phone:</p>
                <p className='text-sm text-gray-800'>{userId?.phone ?? 'N/A'}</p>
                <button
                  onClick={() => handleShowDetails(userId?.id)}
                  className='text-blue-500 hover:underline'
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionCard
