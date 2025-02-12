import {StripeCardDetails} from './stripeCardInterfaces'

export const StripeCardTableColumns = [
  ...[
    {
      label: 'Card Brand',
      key: 'brand',
    },
    {
      label: 'Country',
      key: 'country',
    },
    {
      label: 'Card Exp Month',
      key: 'exp_month',
    },
    {
      label: 'Card Exp Year',
      key: 'exp_year',
    },

    {
      label: 'Card Last 4',
      key: 'last4',
    },
  ].map(({label, key}) => {
    return {
      label,
      key: 'card' as keyof StripeCardDetails,
      nestedKey: key as keyof StripeCardDetails['card'],
    }
  }),
  {
    label: 'Card Type',
    key: 'type' as keyof StripeCardDetails,
  },
]

export const StripeCardSkeletonTableColumns = [
  'Card Brand',
  'Country',
  'Card Exp Month',
  'Card Exp Year',
  'Card Last 4',
  'Card Type',
  // 'Actions',
]
