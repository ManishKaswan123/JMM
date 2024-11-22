type Centeroid = {type: string; coordinates: [number, number]}

interface Block extends CommonAddress {
  block: number
}

interface CommonAddress {
  id: number
  created_at: string
  updated_at: string
  name: string
  centroid: Centeroid
}

export default interface User {
  id: number
  last_login?: string
  first_name?: string
  last_name?: string
  date_joined?: string
  phone_number: string
  created_at?: string
  updated_at?: string
  full_name?: string
  username?: string
  auth_id?: string
  data?: {
    photo_s3_path: string
    profile_photo: {
      large: string
      small: string
      medium: string
      original: string
    }
    photo_s3_url: string
    profile_photo_s3_url: {
      large: string
      small: string
      medium: string
      original: string
    }
  }
  is_blocked?: boolean
  is_dummy?: boolean
  email?: null | string
  groups?: []
  user_permissions?: []
}

export interface UserList {
  userId: number
  name: string
  email: string
  userCategory: string
  isEmailVerified: boolean
  isActive: boolean
}
