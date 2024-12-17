// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchBusinessCategory} from 'sr/utils/api/fetchBusinessCategory'
export const fetchBusinessType = createAsyncThunk(
  'businessType/fetchBusinessType',
  async (payload: any) => {
    const res = await fetchBusinessCategory({...payload, limit: 0})
    const response = await fetchBusinessCategory({...payload, limit: res.pagination.total})
    return {
      data: response,
      totalBusinessTypes: res.pagination.total,
      businessTypeMap: response.data.reduce<Record<string, string>>(
        (acc: any, businessType: any) => {
          acc[businessType.id] = businessType.name
          return acc
        },
        {}
      ),
    }
  }
)
