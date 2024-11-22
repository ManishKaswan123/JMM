// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import handleSignIn from 'sr/utils/api/handleLogin'
export const fetchLoginUserData = createAsyncThunk(
  'user/fetchLoginUserData',
  async (payload: any) => {
    const {totalResults} = await handleSignIn(payload)
    // const response = await fetchSubCategory({limit: totalResults})

    return totalResults
  }
)
