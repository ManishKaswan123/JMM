// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchUserData} from '../action/userActions'

interface UserState {
  data: any
  statistics: any
  userMap: {[key: string]: {firstName: string; lastName: string}}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserState = {
  data: null,
  statistics: null,
  userMap: {},
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.userMap = action.payload.userMap
        state.statistics = action.payload.statistics
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default userSlice.reducer
