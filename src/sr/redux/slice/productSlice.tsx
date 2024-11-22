// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchProductData} from '../action/productActions'

interface ProductStatistcsProps {
  statistics: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductStatistcsProps = {
  statistics: null,
  status: 'idle',
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statistics = action.payload.statistics
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default productSlice.reducer
