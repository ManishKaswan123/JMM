// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchBusinessType} from '../action/businessTypeActions'

interface BusinessTypeState {
  data: any
  totalBusinessTypes: number | null
  businessTypeMap: Record<string, string>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: BusinessTypeState = {
  data: null,
  totalBusinessTypes: null,
  businessTypeMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const businessTypeSlice = createSlice({
  name: 'businessType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessType.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBusinessType.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.totalBusinessTypes = action.payload.totalBusinessTypes
        state.businessTypeMap = action.payload.businessTypeMap
      })
      .addCase(fetchBusinessType.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch business type data'
      })
  },
})

export default businessTypeSlice.reducer
