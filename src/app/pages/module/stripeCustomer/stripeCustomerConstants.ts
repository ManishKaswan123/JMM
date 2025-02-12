import {StripeCustomerDetails} from './stripeCustomerInterfaces'

export const StripeCustomerTableColumns = [
  ...['name', 'email'].map((label) => {
    return {
      label: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      key: 'stripe_data' as keyof StripeCustomerDetails,
      nestedKey: label,
    }
  }),
  ...['cleanpig_id', 'type'].map((label) => {
    return {
      label: label.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      key: label as keyof StripeCustomerDetails,
    }
  }),
]
export const StripeCustomerSkeletonTableColumns = [
  'Name',
  'Email',
  'Cleanpig Id',
  'Type',
  'Actions',
]
