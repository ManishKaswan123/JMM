// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchTaskData} from '../action/taskActions'

interface TaskState {
  data: {task_name: string; id: string}[]
  idNameMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TaskState = {
  data: [] as {task_name: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTaskData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.idNameMap = action.payload.idNameMap
        state.data = action.payload.data
      })
      .addCase(fetchTaskData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default taskSlice.reducer
