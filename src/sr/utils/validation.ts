const digitRegex = /^\d*$/

export const validateDigitOnly = (value: string): boolean => {
  return digitRegex.test(value)
}
