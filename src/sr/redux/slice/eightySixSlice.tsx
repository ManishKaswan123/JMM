// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetch86Action} from '../action/eightySixAction'

interface eightySixSliceProps {
  data: {title?: string; id: string}[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: eightySixSliceProps = {
  data: [],
  status: 'idle',
  error: null,
}

const eightySixSlice = createSlice({
  name: 'eightySix',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch86Action.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetch86Action.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetch86Action.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default eightySixSlice.reducer
