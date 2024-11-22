export default interface AuthToken {
  accessExpiresIn: number
  accessToken: string
  districtCode: string
  districtName: string
  isActive: boolean
  isVerified: boolean
  mobileNumber: string
  name: string
  refreshExpiresIn: number
  refreshToken: string
  stateCode: string
  stateName: string
  userId: string
  agentAuthId: string
  userCategory: string
  category: string
  logo: string
}
