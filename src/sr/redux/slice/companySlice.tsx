// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchCompanyData} from '../action/companyActions'

interface CompanyState {
  data: {company_name: string; id: string}[]
  idNameMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CompanyState = {
  data: [] as {company_name: string; id: string}[],
  idNameMap: {} as Record<string, string>,
  status: 'idle',
  error: null,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCompanyData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.idNameMap = action.payload.idNameMap
        state.data = action.payload.data
      })
      .addCase(fetchCompanyData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default companySlice.reducer
