import {createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../store/index'
import {clearTokens, setTokens} from '../slice/authSlice'
import axios from 'axios'

let config = {
  headers: {
    Authorization: process.env.REACT_APP_AUTH_KEY ?? '',
    'Content-Type': 'application/json',
  },
}

const refreshToken = localStorage.getItem('refreshToken') ?? '' // Explicitly cast getState to RootState
const payload = {
  refreshToken: refreshToken,
}
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, {dispatch, getState}) => {
    try {
      // Make a request to your server to refresh the access token
      const response = await axios.post(
        `${process.env.REACT_APP_API_DEV}/refresh-token`,
        JSON.stringify(payload),
        config
      )

      if (!response) {
        // Handle error if refresh fails
        throw new Error('Refresh token request failed')
      }

      const data = response.data

      // Update the tokens in the Redux store
      dispatch(setTokens(data))

      // Update local storage with the new tokens
      if (data.accessToken) localStorage.setItem('token', data.accessToken)
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
      if (data.accessExpiresIn) localStorage.setItem('accessExpiresIn', data.accessExpiresIn)
      if (data.refreshExpiresIn) localStorage.setItem('refreshExpiresIn', data.refreshExpiresIn)
    } catch (error) {
      // Handle error here (e.g., logout the user)
      console.error('Refresh token error:', error)
      dispatch(clearTokens())
    }
  }
)
