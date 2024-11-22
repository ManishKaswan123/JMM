export interface UserInterface {
  location?: {
    type: string
    coordinates: [number, number]
  }
  email?: string
  phone?: string
  role?: string
  source?: string
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  isBecomeVerified?: boolean
  sellerStatus?: string
  sellerInvitationCodeId?: string
  address?: {
    label?: string
    countryCode?: string
    countryName?: string
    stateCode?: string
    state?: string
    county?: string
    city?: string
    district?: string
    street?: string
    postalCode?: string
    houseNumber?: string
    province?: {
      id: number
      name: string
      abbreviation: string
    }[]
    streetAddress?: string
    position?: {
      lat: number
      lng: number
    }
    title?: string
    type?: string
    apt?: string
  }
  businessType?: string[]
  category?: string[]
  interest?: string[]
  country?: string
  firstName?: string
  lastName?: string
  image?: string
  createdAt?: string
  updatedAt?: string
  avalaraCustomerId?: string
  sellerPaymentPlanId?: string
  rewardPointPlanId?: string
  id: string // `id` is required
}
