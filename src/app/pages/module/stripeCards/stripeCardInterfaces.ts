import {JmmApiResponse} from 'sr/utils/api/globalInterface'

export interface StripeCardDetails {
  id: string
  object: string
  allow_redisplay: string
  billing_details: BillingDetails
  card: CardDetails
  created: number
  customer: string
  livemode: boolean
  metadata: Record<string, any>
  type: string
}

interface BillingDetails {
  address: Address
  email: string | null
  name: string | null
  phone: string | null
}

interface Address {
  city: string | null
  country: string | null
  line1: string | null
  line2: string | null
  postal_code: string | null
  state: string | null
}

interface CardDetails {
  brand: string
  checks: CardChecks
  country: string
  display_brand: string
  exp_month: number
  exp_year: number
  fingerprint: string
  funding: string
  generated_from: any | null
  last4: string
  networks: CardNetworks
  regulated_status: string
  three_d_secure_usage: ThreeDSecureUsage
  wallet: any | null
}

interface CardChecks {
  address_line1_check: string | null
  address_postal_code_check: string | null
  cvc_check: string | null
}

interface CardNetworks {
  available: string[]
  preferred: string | null
}

interface ThreeDSecureUsage {
  supported: boolean
}

// API Response Types
export type FetchStripeCardResponse = JmmApiResponse<{
  object: string
  data: StripeCardDetails[]
}>
export type FetchSingleStripeCardResponse = JmmApiResponse<{
  object: string
  data: StripeCardDetails[]
}>

export interface StripeCardFilters {
  limit?: number
  page?: number
  sortBy?: string
  stripe_customer_id?: string
}

export interface UseStripeCardQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
