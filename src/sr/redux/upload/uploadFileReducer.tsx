import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  loading: false,
  message: '',
}

let config = {
  headers: {
    Authorization: process.env.REACT_APP_AUTH_KEY ?? '',
    AccessToken: sessionStorage.getItem('token') ?? '',
    'Content-Type': 'application/json',
  },
}

export const FileUploadAction: any = createAsyncThunk('upload/file', async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_DEV}/auth/file-upload`,
    data,
    config
  )
  return response.data
})

const {reducer} = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: {
    [FileUploadAction.pending]: (state: any, action: any) => {
      state.loading = true
    },
    [FileUploadAction.fulfilled]: (state, action) => {
      if (action.payload.status === 'Failure') {
        state.status = action.payload.status
        state.data = action.payload
        toast.error(action.payload.error.message)
      } else {
        state.status = action.payload.status
        state.data = action.payload.results
      }
    },
    [FileUploadAction.rejected]: (state, action) => {
      state.status = 'failed'
      state.loading = false
      toast.error('Something went wrong! or Connection request Error!')
    },
  },
})

export default reducer
