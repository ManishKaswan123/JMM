// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchUserData} from '../action/userActions'
import {fetchLoginUserData} from '../action/loginUserActions'

interface LoginUserState {
  data: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: LoginUserState = {
  data: null,
  status: 'idle',
  error: null,
}

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUserData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLoginUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
      })
      .addCase(fetchLoginUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default loginUserSlice.reducer
