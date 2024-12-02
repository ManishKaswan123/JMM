// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchUserData} from '../action/userActions'

interface UserState {
  statistics: any
  data: any
  userData: {id: string; name: string}[]
  userMap: {[key: string]: {firstName: string; lastName: string}}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserState = {
  statistics: {},
  data: {},
  userData: [] as {id: string; name: string}[],
  userMap: {} as Record<string, {firstName: string; lastName: string}>,
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
        state.userData = action.payload.userData
        state.userMap = action.payload.userMap
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default userSlice.reducer
