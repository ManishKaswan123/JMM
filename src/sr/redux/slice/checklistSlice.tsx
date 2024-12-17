// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchChecklistData} from '../action/checklistActions'

interface ChecklistState {
  data: {checklist_name: string; id: string}[]
  idNameMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ChecklistState = {
  data: [] as {checklist_name: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChecklistData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchChecklistData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.idNameMap = action.payload.idNameMap
        state.data = action.payload.data
      })
      .addCase(fetchChecklistData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default checklistSlice.reducer
