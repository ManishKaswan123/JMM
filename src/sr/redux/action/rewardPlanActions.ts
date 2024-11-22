// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchRewardPlan, rewardPointPlanApiResponse} from 'sr/utils/api/rewardPointPlanApi'
export const fetchRewardPlanMap = createAsyncThunk(
  'rewardPlanMap/fetchRewardPlanMap',
  async (payload: any) => {
    const response = await fetchRewardPlan({...payload})
    const planMap: {[key: string]: rewardPointPlanApiResponse} = {}
    response.results.forEach((plan: rewardPointPlanApiResponse) => {
      planMap[plan.id] = plan
    })
    return {
      planMap,
      data: response.results,
    }
  }
)
