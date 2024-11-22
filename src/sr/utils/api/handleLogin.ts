import axios from 'axios'
import {useCallback} from 'react'
import {AuthModel, setAuth} from 'app/pages/module/auth'
import {setCookieValue} from '../helper'
import {toast} from 'react-toastify'
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from 'sr/constants/common'
import {post} from '../axios'

const handleSignIn = async (payload: any) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  try {
    const response = await post<any>('/auth/login', payload, {
      headers,
    })
    setCookieValue(ACCESS_TOKEN_KEY, response.tokens.access.token)
    setCookieValue(REFRESH_TOKEN_KEY, response.tokens.refresh.token)
    const tokens: AuthModel = {
      api_token: response.tokens.access.token,
      refreshToken: response.tokens.refresh.token,
    }
    setAuth(tokens)
    console.log('running', response)
    localStorage.setItem('user', JSON.stringify(response.user))
    // setInterval(fetchTokenFromRefreshToken(getCookieValue(REFRESH_TOKEN_KEY) , '/auth'), (25 * 60 * 1000))
    // if (response.user) {
    //   window.location.href = '/dashboard'
    // }
    return response
  } catch (error: any) {
    if (error.response && error.response && error.response.message) {
      // If the error has a response with a message, set it in displayMessage
      // setDisplayMessage(error.response.data.message)
      toast.error(error.response.message)
    } else {
      // Default error message for unexpected errors
      toast.error('Error while logging in. Please try again')
    }
  } finally {
  }
}

export default handleSignIn
