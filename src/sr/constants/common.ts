import {Status} from 'sr/utils/api/globalInterface'

export const COMMON = {
  TOKEN_CHECK_INTERVAL: 30000,
  MIN_VALIDITY_BEFORE_EXPIRY: 60,
}

export enum DEFAULT_LANG_NAME {
  'hi' = 'हिन्दी',
  'en' = 'English',
  'mr' = 'मराठी',
  'bn' = 'বাংলা',
  'or' = 'ઓડિયા',
  'gu' = 'ગુજરાતી',
  'ta' = 'தமிழ்',
  'te' = 'తెలుగు',
  'kn' = 'கன்னடம்',
  'ml' = 'மலையாளம்',
}

export const COOKIE_MAX_AGE_1YEAR = 31536000
const EIGHTYSIX_WHATSAPP_SUPPORT_NUMBER = '8506909095'
export const DEFAULT_LANG = 'en'
export const REDIRECT_URI_KEY = 'redirect_uri'

export const ACCESS_TOKEN_KEY = 'EightySixUI_token'
export const REFRESH_TOKEN_KEY = 'EightySixUI_refresh_token'

export const MIN_TOKEN_VALIDITY_MINUTE = 1

export const GET_WHATSAPPHANDLER_API = (message: string) => {
  const url = `https://api.whatsapp.com/send/?phone=+91${EIGHTYSIX_WHATSAPP_SUPPORT_NUMBER}&text=${encodeURI(
    message
  )}`
  return url
}

export const WEBSITE_NAME = 'EightySixUI'
export const WEBSITE_URL = 'https://abc.com'
export const statuses: {name: string; id: Status}[] = [
  {name: 'Active', id: 'active'},
  {name: 'In Progress', id: 'in progress'},
  {name: 'Publish', id: 'publish'},
  {name: 'Draft', id: 'draft'},
  {name: 'Completed', id: 'completed'},
  {name: 'Pending', id: 'pending'},
  {name: 'Approved', id: 'approved'},
  {name: 'Rejected', id: 'rejected'},
]
export const statusColors: Record<Status, string> = {
  active: 'text-green-700',
  'in progress': 'text-yellow-700 ',
  publish: 'text-blue-700 ',
  completed: 'text-green-700 ',
  pending: 'text-yellow-700 ',
  approved: 'text-blue-700',
  rejected: 'text-red-700',
  draft: 'text-gray-700',
}
