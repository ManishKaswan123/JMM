import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetch86} from 'sr/utils/api/fetch86'
export const fetch86Action = createAsyncThunk('eightySix/fetch86Action', async () => {
  const res = await fetch86({projectBy: 'title,id', getAll: true})
  return res.results
})
