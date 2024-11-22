interface Location {
  type: 'Point'
  coordinates: [number, number]
}

interface Address {
  label: string
  countryCode: string
  countryName: string
  streetAddress: string
  position: {
    lat: number
    lng: number
  }
  province: {
    id: number
    name: string
    abbreviation: string
  }[]
  city: string
  postalCode: string
  title: string
  type: string
  state: string
  stateCode: string
}

export interface VerifySellerTokenResponseType {
  location: Location
  email: string
  phone: string
  role: string
  source: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  sellerStatus: string
  sellerInvitationCodeId: string
  address: Address
  businessType: string[]
  category: string[]
  interest: any[] // Assuming interest is an array of unknown type
  country: string
  firstName: string
  lastName: string
  createdAt: string // ISO 8601 date format
  updatedAt: string // ISO 8601 date format
  id: string
}
