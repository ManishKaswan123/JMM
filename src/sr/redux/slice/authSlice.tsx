import {createSlice} from '@reduxjs/toolkit'
import {refreshAccessToken} from '../action/authActions'
import {toast} from 'react-toastify'

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  accessExpiresIn: parseInt(localStorage.getItem('accessExpiresIn') || '0'),
  refreshExpiresIn: parseInt(localStorage.getItem('refreshExpiresIn') || '0'),
  data: [],
  status: 'idle',
  error: null,
  loading: false,
  message: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.results.accessToken
      state.refreshToken = action.payload.results.refreshToken
      state.accessExpiresIn = action.payload.results.accessExpiresIn
      state.refreshExpiresIn = action.payload.results.refreshExpiresIn
    },
    clearTokens: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.accessExpiresIn = 0
      state.refreshExpiresIn = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.results.accessToken
        state.refreshToken = action.payload.results.refreshToken
        state.accessExpiresIn = action.payload.results.accessExpiresIn
        state.refreshExpiresIn = action.payload.results.refreshExpiresIn
        state.loading = false
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        toast.error('Something went wrong! or Connection request Error!')
      })
  },
})

export const {setTokens, clearTokens} = authSlice.actions

export default authSlice.reducer
