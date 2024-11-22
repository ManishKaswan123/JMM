// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchCategoryType} from '../action/categoryActions'

interface CategoryState {
  data: any
  totalCategories: number | null
  categoryMap: Record<string, string>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CategoryState = {
  data: null,
  totalCategories: null,
  categoryMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const categoryTypeSlice = createSlice({
  name: 'categoryType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryType.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategoryType.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.totalCategories = action.payload.totalCategories
        state.categoryMap = action.payload.categoryMap
      })
      .addCase(fetchCategoryType.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default categoryTypeSlice.reducer
