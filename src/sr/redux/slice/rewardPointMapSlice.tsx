// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchRewardPointMap} from '../action/rewardPointActions'
import {rewardPointApiResponse} from 'sr/utils/api/rewardPointApi'

interface RewardPointMapState {
  data: rewardPointApiResponse[]
  planMap: {[key: string]: string}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RewardPointMapState = {
  planMap: {},
  data: [] as rewardPointApiResponse[],
  status: 'idle',
  error: null,
}

const rewardPointMapSlice = createSlice({
  name: 'rewardPointMap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewardPointMap.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRewardPointMap.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.planMap = action.payload.planMap
        state.data = action.payload.data
      })
      .addCase(fetchRewardPointMap.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default rewardPointMapSlice.reducer
