import {UserInterface} from 'sr/constants/User'

interface AddressDetails {
  label?: string
  countryCode?: string
  countryName?: string
  stateCode?: string
  state?: string
  county?: string
  city?: string
  district?: string
  subdistrict?: string
  postalCode?: string
  building?: string
}

interface AccessPoint {
  lat?: number
  lng?: number
}

interface MapView {
  west?: number
  south?: number
  east?: number
  north?: number
}

interface Address {
  countryCode?: string
  title?: string
  id?: string
  resultType?: string
  houseNumberType?: string
  address?: AddressDetails
  position?: {lat: number; lng: number}
  access?: AccessPoint[]
  distance?: number
  mapView?: MapView
}

export interface EightySix {
  location?: Location
  userId?: string
  title?: string
  description?: string
  hashtags?: string[]
  images?: string[]
  category?: string[]
  businessType?: string[]
  address?: Address
  timeframe?: string
  delivery?: number
  radius?: number
  status?: string
  createdAt?: string
  updatedAt?: string
  id: string
}

export default interface ApiResponse {
  senderIsRead?: boolean
  receiverIsRead?: boolean
  cartStatus?: string
  type?: string
  eightySix?: EightySix
  senderId?: UserInterface
  receiverId?: UserInterface
  message?: string
  offerAmount?: number
  status?: number
  createdAt?: string
  updatedAt?: string
  deliveryType?: number
  id: string
}
