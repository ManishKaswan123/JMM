// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {rewardPointPlanApiResponse} from 'sr/utils/api/rewardPointPlanApi'
import {fetchRewardPlanMap} from '../action/rewardPlanActions'

interface RewardPlanMapState {
  planMap: {[key: string]: rewardPointPlanApiResponse}
  data: rewardPointPlanApiResponse[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RewardPlanMapState = {
  data: [] as rewardPointPlanApiResponse[],
  planMap: {},
  status: 'idle',
  error: null,
}

const rewardPlanMapSlice = createSlice({
  name: 'rewardPlanMap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewardPlanMap.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRewardPlanMap.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.planMap = action.payload.planMap
        state.data = action.payload.data
      })
      .addCase(fetchRewardPlanMap.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch category type data'
      })
  },
})

export default rewardPlanMapSlice.reducer
