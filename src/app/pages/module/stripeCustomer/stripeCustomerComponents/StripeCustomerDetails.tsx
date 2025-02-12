import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleStripeCustomer} from '../stripeCustomerHooks'

const StripeCustomerDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleStripeCustomer()

  if (isError)
    return <div className='text-red-500 text-center'>Error loading stripe customer details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='Stripe Customer Details'
        col1={['ID', 'CleanPig Id', 'Type']}
        col2={['Strip Customer Id', 'Created At', 'Updated At']}
      />
    )

  const details =
    data && data.length > 0
      ? [
          [
            {label: 'ID', value: data[0]._id},
            {label: 'CleanPig Id', value: data[0].cleanpig_id},
            {label: 'Type', value: data[0].type},
          ],
          [
            {label: 'Stripe Customer Id', value: data[0].stripe_customer_id},
            {label: 'Created At', value: new Date(data[0].createdAt).toLocaleString()},
            {label: 'Updated At', value: new Date(data[0].updatedAt).toLocaleString()},
          ],
        ]
      : []

  return (
    <DetailCard
      title='Strip Customer Details'
      details={details}
      onGoBack={() => navigate('/stripecustomer')}
    />
  )
}

export default StripeCustomerDetailsCard
