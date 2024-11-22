// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchBusinessCategory} from 'sr/utils/api/fetchBusinessCategory'
export const fetchBusinessType = createAsyncThunk(
  'businessType/fetchBusinessType',
  async (payload: any) => {
    const {totalResults} = await fetchBusinessCategory(payload)
    const response = await fetchBusinessCategory({...payload, limit: totalResults})
    return {
      data: response,
      totalBusinessTypes: totalResults,
      businessTypeMap: response.results.reduce<Record<string, string>>(
        (acc: any, businessType: any) => {
          acc[businessType.id] = businessType.name
          return acc
        },
        {}
      ),
    }
  }
)
