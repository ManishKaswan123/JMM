import {JmmApiResponse} from 'sr/utils/api/globalInterface'

interface StripeData {
  id: string
  object: string
  address: any
  balance: string
  created: string
  currency: string
  default_source: string
  deliquent: boolean
  description: string
  discount: any
  email: string
  invoice_prefix: string
  invoice_settings: {
    custom_feilds: any
    default_payment_method: string
    footer: string
    rendering_options: any
  }
  livemode: boolean
  metadata: any
  name: string
  next_invoice_sequence: number
  phone: string
  preferred_locales: any
  shipping: any
  tax_exempt: string
  test_clock: string
}
export interface StripeCustomerDetails {
  _id: string
  // name: string
  // email: string
  cleanpig_id: string
  type: string
  stripe_customer_id: string
  createdAt: string
  updatedAt: string
  __v: number
  stripe_data: StripeData
}
export interface StripCustomerFormData {
  name: string
  email: string
  cleanpig_id: string
  type: string
}
// API Response Types
export type FetchStripeCustomerResponse = JmmApiResponse<StripeCustomerDetails[]>
export type FetchSingleStripeCustomerResponse = JmmApiResponse<StripeCustomerDetails>

export interface StripeCustomerFilters {
  limit?: number
  page?: number
  sortBy?: string
  cleanpig_id?: string
  type?: string
  stripe_customer_id?: string
}

export interface UseStripeCustomerQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
