import {createSlice} from '@reduxjs/toolkit'
import {fetchBusinessTypeData} from '../action/businessTypeActions'

interface BusinessTypeState {
  data: {type: string; id: string}[]
  idNameMap: Record<string, string>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: BusinessTypeState = {
  data: [] as {type: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const businessTypeSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessTypeData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBusinessTypeData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.idNameMap = action.payload.idNameMap
      })
      .addCase(fetchBusinessTypeData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch business type data'
      })
  },
})

export default businessTypeSlice.reducer
