const validateMobileNumber = (mobileNumber: string) => {
  const regex = /^\d{10}$/
  return regex.test(mobileNumber)
}

export default validateMobileNumber
