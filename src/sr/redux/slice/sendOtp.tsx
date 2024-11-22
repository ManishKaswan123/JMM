import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import {sendAgentOTP} from 'sr/utils/api/sendAgentOTP'
import {handleRejectedErrorMsg} from 'sr/utils/helpers/handleError'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  loading: false,
  message: '',
}

export const SendOTPAction: any = createAsyncThunk('user/sendOtp', async (data: any) => {
  const response: any = await post(`/agent/send-otp`, data)
  return {...response, ...data}
})

const {reducer} = createSlice({
  name: 'sendOtp',
  initialState,
  reducers: {},
  extraReducers: {
    [SendOTPAction.pending]: (state: any) => {
      state.loading = true
    },
    [SendOTPAction.fulfilled]: (state, action) => {
      if (action.payload.status === 'Failure') {
        state.status = action.payload.status
        state.data = action.payload
        toast.error(action.payload.error.message)
      } else {
        state.status = action.payload.status
        state.data = action.payload
        toast.success(action.payload.results)
      }
    },
    [SendOTPAction.rejected]: (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.data = []
      handleRejectedErrorMsg(action?.error)
    },
  },
})

export default reducer
