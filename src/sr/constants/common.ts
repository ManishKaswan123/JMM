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
  {name: 'Hired', id: 'hired'},
  {name: 'Withdrawn', id: 'withdrawn'},
  {name: 'Shortlist', id: 'shortlist'},
  {name: 'Awaiting Reviews', id: 'awaiting-reviews'},
  {name: 'Pause', id: 'pause'},
  {name: 'Contacting', id: 'contacting'},
  {name: 'Inactive', id: 'inactive'},
  {name: 'Deleted', id: 'deleted'},
  {name: 'Open', id: 'open'},
  {name: 'Closed', id: 'closed'},
  {name: 'Accept', id: 'accept'},
  {name: 'Pending OTP', id: 'pending_otp'},
]
export const statusColors: Record<Status, string> = {
  active: 'text-green-600', // Indicates an active state (green for success/active)
  'in progress': 'text-yellow-600', // Ongoing process (yellow for progress)
  publish: 'text-blue-600', // Published state (blue for information)
  draft: 'text-gray-500', // Draft state (gray for neutral/incomplete)
  completed: 'text-green-700', // Successfully completed (dark green for confirmation)
  pending: 'text-orange-600', // Waiting for approval/action (orange for warning)
  approved: 'text-blue-700', // Approved state (blue for confirmation)
  rejected: 'text-red-600', // Rejected state (red for errors/denial)
  hired: 'text-green-700', // Hired status (green for success)
  withdrawn: 'text-gray-600', // Withdrawn applications (gray for inactivity)
  shortlist: 'text-purple-600', // Shortlisted (purple for consideration)
  'awaiting-reviews': 'text-indigo-600', // Awaiting reviews (indigo for moderation)
  pause: 'text-yellow-700', // Paused state (yellow for pending attention)
  contacting: 'text-cyan-600', // Contacting status (cyan for communication)
  inactive: 'text-gray-600', // Inactive state (gray for inactivity)
  deleted: 'text-red-600', // Deleted state (red for errors)
  open: 'text-green-600', // Open status (green for active)
  closed: 'text-red-600', // Closed status (red for inactive)
  accept: 'text-green-600', // Accept state (green for success)
  pending_otp: 'text-yellow-600', // Pending OTP (yellow for pending)
}
