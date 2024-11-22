// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchReward, rewardPointApiResponse} from 'sr/utils/api/rewardPointApi'
export const fetchRewardPointMap = createAsyncThunk(
  'rewardPointMap/fetchRewardPointMap',
  async (payload: any) => {
    const response = await fetchReward({...payload})
    const planMap: {[key: string]: string} = {}
    response.results.forEach((plan: rewardPointApiResponse) => {
      planMap[plan.id] = plan.details
    })
    return {
      planMap,
      data: response.results,
    }
  }
)
