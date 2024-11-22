// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchCategory} from 'sr/utils/api/fetchCategory'
export const fetchCategoryType = createAsyncThunk(
  'categoryType/fetchCategoryType',
  async (payload: any) => {
    const {totalResults} = await fetchCategory(payload)
    const response = await fetchCategory({...payload, limit: totalResults})
    return {
      data: response,
      totalCategories: totalResults,
      categoryMap: response.results.reduce<Record<string, string>>((acc: any, category: any) => {
        acc[category.id] = category.name
        return acc
      }, {}),
    }
  }
)
