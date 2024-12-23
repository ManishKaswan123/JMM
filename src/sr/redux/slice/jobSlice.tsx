// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchJobData} from '../action/jobActions'

interface JobState {
  data: {job_title: string; id: string}[]
  idNameMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: JobState = {
  data: [] as {job_title: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchJobData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.idNameMap = action.payload.idNameMap
        state.data = action.payload.data
      })
      .addCase(fetchJobData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default jobSlice.reducer
