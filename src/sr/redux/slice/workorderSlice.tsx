// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchWorkorderData} from '../action/workorderActions'

interface WorkorderState {
  data: {workorder_name: string; id: string}[]
  idNameMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: WorkorderState = {
  data: [] as {workorder_name: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const workorderSlice = createSlice({
  name: 'workorder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkorderData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWorkorderData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.idNameMap = action.payload.idNameMap
        state.data = action.payload.data
      })
      .addCase(fetchWorkorderData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default workorderSlice.reducer
