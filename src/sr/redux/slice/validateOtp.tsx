import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  loading: false,
  message: '',
  token: '',
}

let config = {
  headers: {
    Authorization: process.env.REACT_APP_AUTH_KEY ?? '',
    'Content-Type': 'application/json',
  },
}

export const ValidateOtpAction: any = createAsyncThunk('user/validateOtp', async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_DEV}/agent/validate-otp`,
    data,
    config
  )
  return response.data
})

const {reducer} = createSlice({
  name: 'otp',
  initialState,
  reducers: {},
  extraReducers: {
    [ValidateOtpAction.pending]: (state: any, action: any) => {
      state.loading = true
    },
    [ValidateOtpAction.fulfilled]: (state, action) => {
      if (action.payload.status === 'Failure') {
        state.status = action.payload.status
        state.data = action.payload
        toast.error(action.payload.error.message)
      } else {
        const loginUser = action.payload.results
        state.status = action.payload.status
        state.data = loginUser
        state.loading = false
        state.token = loginUser.accessToken
        state.message = 'Login Successfully!'

        // storage for access
        sessionStorage.setItem('token', loginUser.accessToken)
        localStorage.setItem('token', JSON.stringify(loginUser.accessToken))
        localStorage.setItem('agentAuthId', loginUser.agentAuthId)
        localStorage.setItem('refreshToken', loginUser.refreshToken)
        localStorage.setItem('accessExpiresIn', loginUser.accessExpiresIn)
        localStorage.setItem('refreshExpiresIn', loginUser.refreshExpiresIn)
        toast.success('Login Successfully!')
      }
    },
    [ValidateOtpAction.rejected]: (state, action) => {
      state.status = 'failed'
      state.loading = false
      toast.error('Something went wrong! or Connection request Error!')
    },
  },
})

export default reducer
