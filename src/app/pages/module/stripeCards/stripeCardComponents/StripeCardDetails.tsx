import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleStripeCard} from '../stripeCardHooks'

const StripeCardDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleStripeCard()

  if (isError)
    return <div className='text-red-500 text-center'>Error loading Stripe Card details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='StripeCard Details'
        col1={[
          'ID',
          'Name',
          'Email',
          'Phone',
          'Card Brand',
          'Card Country',
          'Card Exp Month',
          'Card Exp Year',
        ]}
        col2={[
          'Last 4',
          'Object',
          'Fingerprint',
          'Funding',
          'Regulated Status',
          'Wallet',
          'Card Type',
          'Created At',
        ]}
      />
    )

  const details = [
    [
      {label: 'ID', value: data.id},

      {label: 'Name', value: data.billing_details?.name},
      {label: 'Email', value: data.billing_details?.email},
      {label: 'Phone', value: data.billing_details?.phone},
      {label: 'Card Brand', value: data.card?.brand},
      {label: 'Card Country', value: data.card?.country},
      {label: 'Card Exp Month', value: data.card?.exp_month},
      {label: 'Card Exp Year', value: data.card?.exp_year},
    ],
    [
      {label: 'Last 4', value: data.card?.last4},
      {label: 'Object', value: data.object},
      {label: 'Fingerprint', value: data.card?.fingerprint},
      {label: 'Funding', value: data.card?.funding},

      {label: 'Regulated Status', value: data.card?.regulated_status},
      {label: 'Wallet', value: data.card?.wallet},
      {label: 'Card Type', value: data.type},

      {label: 'Created At', value: new Date(data.created).toLocaleString()},
    ],
  ]

  return (
    <DetailCard
      title='Stripe Card Details'
      details={details}
      onGoBack={() => navigate('/stripecard')}
    />
  )
}

export default StripeCardDetailsCard
