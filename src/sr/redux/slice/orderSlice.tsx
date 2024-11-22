// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchOrderData} from '../action/orderAction'
// import {fetchUserData} from '../action/userActions'

interface OrderStatistcsProps {
  statistics: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: OrderStatistcsProps = {
  statistics: null,
  status: 'idle',
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statistics = action.payload.statistics
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default orderSlice.reducer
