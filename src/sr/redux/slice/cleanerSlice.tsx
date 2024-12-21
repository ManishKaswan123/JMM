// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchCleanerData} from '../action/cleanerActions'

interface CleanerState {
  data: {cleaner_name: string; id: string}[]
  idNameMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CleanerState = {
  data: [] as {cleaner_name: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const cleanerSlice = createSlice({
  name: 'cleaner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCleanerData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCleanerData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.idNameMap = action.payload.idNameMap
        state.data = action.payload.data
      })
      .addCase(fetchCleanerData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default cleanerSlice.reducer
