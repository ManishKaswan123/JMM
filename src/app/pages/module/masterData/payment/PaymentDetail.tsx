import React from 'react'

interface PaymentDetails {
  id?: string
  amount?: number
  status?: string
  paymentMethod?: number
  transactionId?: string
  createdAt?: string
  updatedAt?: string
  transactionDetails?: {
    bankName?: string
    Type?: string
  }
  userId?: {
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

interface PaymentDetailCardProps {
  payment: PaymentDetails
}

const PaymentDetailCard: React.FC<PaymentDetailCardProps> = ({payment}) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
      <h2 className='text-2xl font-bold mb-6'>Payment Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <p className='mb-4'>
            <strong className='font-medium'>Payment ID:</strong> {payment.id ?? 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Amount:</strong> ${payment.amount?.toFixed(2) ?? 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Status:</strong> {payment.status ?? 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Payment Method:</strong>{' '}
            {payment.paymentMethod === 1
              ? 'Credit Card'
              : payment.paymentMethod === 2
              ? 'Mobile Wallet'
              : 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Transaction ID:</strong>{' '}
            {payment.transactionId ?? 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Created At:</strong>{' '}
            {payment.createdAt ? new Date(payment.createdAt).toLocaleString() : 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Updated At:</strong>{' '}
            {payment.updatedAt ? new Date(payment.updatedAt).toLocaleString() : 'N/A'}
          </p>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-4'>Transaction Details</h3>
          <p className='mb-4'>
            <strong className='font-medium'>Bank Name:</strong>{' '}
            {payment.transactionDetails?.bankName ?? 'N/A'}
          </p>
          <p className='mb-4'>
            <strong className='font-medium'>Type:</strong>{' '}
            {payment.transactionDetails?.Type ?? 'N/A'}
          </p>
          {payment.userId && (
            <>
              <h3 className='text-xl font-bold mt-4 mb-4'>User Details</h3>
              <p className='mb-4'>
                <strong className='font-medium'>Name:</strong>{' '}
                {`${payment.userId.firstName ?? ''} ${payment.userId.lastName ?? ''}`.trim() ||
                  'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Email:</strong> {payment.userId.email ?? 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Phone:</strong> {payment.userId.phone ?? 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Email Verified:</strong>{' '}
                {payment.userId.isEmailVerified ? 'Yes' : 'No'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>Phone Verified:</strong>{' '}
                {payment.userId.isPhoneVerified ? 'Yes' : 'No'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>User Created At:</strong>{' '}
                {payment.userId.createdAt
                  ? new Date(payment.userId.createdAt).toLocaleString()
                  : 'N/A'}
              </p>
              <p className='mb-4'>
                <strong className='font-medium'>User Updated At:</strong>{' '}
                {payment.userId.updatedAt
                  ? new Date(payment.userId.updatedAt).toLocaleString()
                  : 'N/A'}
              </p>
              {payment.userId.location && (
                <>
                  <h3 className='text-xl font-bold mb-4'>Location</h3>
                  <p className='mb-4'>
                    <strong className='font-medium'>Type:</strong>{' '}
                    {payment.userId.location.type ?? 'N/A'}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Coordinates:</strong>{' '}
                    {payment.userId.location.coordinates
                      ? payment.userId.location.coordinates.join(', ')
                      : 'N/A'}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentDetailCard
