const clientParseToken = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload) as {
    exp: number
    iat: number
    name: string
    mobile_number: string
    given_name: string
  }
}

const serverParseToken = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()) as {
    exp: number
    iat: number
    name: string
    mobile_number: string
    given_name: string
  }
}

const parseJWT = (token: string) => {
  return typeof window === 'undefined' ? serverParseToken(token) : clientParseToken(token)
}

export default parseJWT
