// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchCustomersData} from '../action/customerActions'

interface CustomerState {
  data: {customer_name: string; id: string}[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CustomerState = {
  data: [] as {customer_name: string; id: string}[],
  status: 'idle',
  error: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomersData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCustomersData.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.data = action.payload.data
      })
      .addCase(fetchCustomersData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default customerSlice.reducer
