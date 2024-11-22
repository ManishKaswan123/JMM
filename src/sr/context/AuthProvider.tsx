/* eslint-disable @typescript-eslint/no-shadow */
import {useRoutes} from 'react-router-dom'
import {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {ACCESS_TOKEN_KEY, MIN_TOKEN_VALIDITY_MINUTE, REFRESH_TOKEN_KEY} from 'sr/constants/common'
import fetchTokenFromRefreshToken from 'sr/utils/api/fetchTokenFromRefreshToken'
import logoutUser from 'sr/utils/api/logoutUser'
import {getCookieValue, persistToken, removeLocalStorageKey} from 'sr/utils/helper'
import parseJWT from 'sr/utils/parseToken'

interface AuthContextProps {
  isAuthenticated: boolean
  isAuthReady: boolean
  persistTokens: VoidFunction
  logout: VoidFunction
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isAuthReady: false,
  logout: () => undefined,
  persistTokens: () => undefined,
})

// use auth context
const useAuth = () => {
  return useContext(AuthContext)
}

interface Props {
  children: ReactNode
}

const getTokenExpiryTime = (token: string | null) => {
  if (token) {
    const {exp} = parseJWT(token)
    return new Date(exp * 1000).getTime()
  }
  return null
}

const checkTokenExpiry = (tokenExpiryTime: number | null, minValidity = 60000) => {
  if (tokenExpiryTime != null) {
    const currentTime = new Date().getTime()
    return tokenExpiryTime - currentTime <= minValidity
  }
  return false
}

const minValidity = MIN_TOKEN_VALIDITY_MINUTE * 60 * 1000

const AuthProvider = ({children}: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)

  const accessTokenExpiryTime = useMemo(() => getTokenExpiryTime(accessToken), [accessToken])

  const refreshTokenExpiryTime = useMemo(() => getTokenExpiryTime(refreshToken), [refreshToken])

  const logout = useCallback(async () => {
    if (refreshToken) {
      const response = await logoutUser(refreshToken)
      setAccessToken(null)
      setRefreshToken(null)
      persistToken(ACCESS_TOKEN_KEY, '', -1)
      persistToken(REFRESH_TOKEN_KEY, '', -1)
      window.location.reload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken])

  const refreshTokenHandler = useCallback(
    async (token: string) => {
      if (
        checkTokenExpiry(accessTokenExpiryTime, minValidity) ||
        checkTokenExpiry(refreshTokenExpiryTime, minValidity)
      ) {
        const response = await fetchTokenFromRefreshToken(token)
        if (response) {
          persistToken(ACCESS_TOKEN_KEY, response.accessToken, response.accessExpiresIn)
          persistToken(REFRESH_TOKEN_KEY, response.refreshToken, response.refreshExpiresIn)
          setAccessToken(response.accessToken || null)
          setRefreshToken(response.refreshToken || null)
        } else {
          logout()
        }
      }
    },
    [accessTokenExpiryTime, refreshTokenExpiryTime, logout]
  )

  const persistTokens = useCallback(() => {
    setIsAuthReady(false)
    const accessToken = getCookieValue(ACCESS_TOKEN_KEY) || null
    const refreshToken = getCookieValue(REFRESH_TOKEN_KEY) || null
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setIsAuthReady(true)
  }, [])

  useEffect(() => {
    persistTokens()
  }, [persistTokens])

  useEffect(() => {
    let timer: any
    if (refreshToken) {
      refreshTokenHandler(refreshToken)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      timer = window.setInterval(async () => refreshTokenHandler(refreshToken), 60000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [refreshToken, refreshTokenHandler])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken && !!refreshToken,
        isAuthReady,
        logout,
        persistTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {useAuth, AuthProvider}
