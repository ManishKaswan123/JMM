// This Function formats ISO date format to dd/mm/yyyy format
// eg :- 2023-03-31T18:29:59Z to 31/03/2023

export const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString('es-CL')
}

/**
 * Formats a date string into MM-DD-YYYY format and converts time to Eastern Time (ET).
 * @param dateStr - The date string in ISO format (e.g., 2025-10-09T12:52:00.000Z).
 * @returns The formatted date and time string in MM-DD-YYYY HH:mm AM/PM format in Eastern Time.
 */
export const formatDateToMMDDYYYYWithET = (dateStr: string): string => {
  const date = new Date(dateStr)

  // Convert to Eastern Time (ET) by formatting in UTC and adjusting offset
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  return formattedDate
}
/**
 * Formats an integer amount as a dollar string with two decimal places.
 * @param amount - The amount in cents or as an integer.
 * @returns The formatted dollar amount as a string.
 */
export function formatAmountToDollars(amount: number): string {
  if (amount) return `$ ${amount.toFixed(2)}`
  return ''
}
