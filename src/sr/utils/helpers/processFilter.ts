interface PayloadType {
  [key: string]: any
}

export const transformPayloadToFilter = (payload: PayloadType): PayloadType => {
  const {page, limit, ...filters} = payload // Extract page and limit

  const filterConditions: {[key: string]: any}[] = []

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      // Include array fields in the filter and extract only the `value` property
      const extractedValues = value.map((item: any) => item.value)
      filterConditions.push({[key]: {$in: extractedValues}})
    }
  })

  // Prepare the final payload
  const result: PayloadType = {
    page,
    limit,
  }

  if (filterConditions.length > 0) {
    result.filter = {$and: filterConditions}
  }

  // Add non-array fields directly to the result
  Object.entries(filters).forEach(([key, value]) => {
    if (!Array.isArray(value)) {
      result[key] = value
    }
  })

  return result
}
