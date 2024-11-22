interface ProductDetails {
  product?: string
  createdAt?: string
  updatedAt?: string
  id: string
}

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
  houseNumber?: string
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

interface Location {
  id: string
  title?: string
  resultType?: string
  houseNumberType?: string
  address?: AddressDetails
  position?: AccessPoint
  access?: AccessPoint[]
  distance?: number
  mapView?: MapView
}
export default interface ProductType {
  id: string
  title?: string
  skuCode?: string
  description?: string
  countryCode?: string
  type?: number
  condition?: number
  isPublished?: boolean
  originalPrice?: number
  listingPrice?: number
  quantity?: number
  unit?: string
  hashtags?: string[]
  category?: string[]
  businessType?: string[]
  images?: string[]
  location?: Location
  userId?: string
  createdAt: string
  updatedAt: string
  productDetails?: ProductDetails
  status?: string
}
