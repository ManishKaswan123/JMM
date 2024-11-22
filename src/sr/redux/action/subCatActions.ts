// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchSubCategory} from 'sr/utils/api/fetchSubCategory'
export const fetchSubCatData = createAsyncThunk(
  'subCategory/fetchSubCatData',
  async (payload: any) => {
    const {totalResults} = await fetchSubCategory({})
    // const response = await fetchSubCategory({limit: totalResults})

    return totalResults
  }
)
