// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchTransactionData} from '../action/transactionAction'

interface TransactionStatisticsProps {
  statistics: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TransactionStatisticsProps = {
  statistics: null,
  status: 'idle',
  error: null,
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTransactionData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statistics = action.payload.statistics
      })
      .addCase(fetchTransactionData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default transactionSlice.reducer
