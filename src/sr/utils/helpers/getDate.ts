const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const getDate = (date: string | null, isDayRequired = true, isYearRequired = true) => {
  if (date == null) return date
  const d = new Date(date)
  return `${isDayRequired ? days[d.getDay()] + ',' : ''} ${d.getDate()} ${months[d.getMonth()]}${
    isYearRequired ? ', ' + d.getFullYear() : ''
  }`
}

export const getDateForDisplay = (
  date: string | null,
  isDayRequired = false,
  isYearRequired = true,
  isFullMonthNameRequired = false
) => {
  if (date == null) return date
  const arr = date.split('-')
  const d = new Date(arr[1] + '/' + arr[0] + '/' + arr[2])
  return `${isDayRequired ? days[d.getDay()] + ',' : ''} ${d.getDate()} ${
    isFullMonthNameRequired ? months[d.getMonth()] : monthShortNames[d.getMonth()]
  }${isYearRequired ? ' ' + d.getFullYear() : ''}`
}

export const getDateForCalender = (date: string | null) => {
  if (!date) return date
  const arr = date.split('-')
  const d = arr[2] + '-' + arr[1] + '-' + arr[0]
  return d
}

export default getDate
