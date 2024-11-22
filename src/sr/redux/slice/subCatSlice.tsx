// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchSubCatData} from '../action/subCatActions'

interface SubCatSliceProps {
  totalSubCat: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SubCatSliceProps = {
  totalSubCat: null,
  status: 'idle',
  error: null,
}

const orderSlice = createSlice({
  name: 'subCatetory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCatData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSubCatData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.totalSubCat = action.payload
      })
      .addCase(fetchSubCatData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default orderSlice.reducer
