// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchCleaner} from 'sr/utils/api/fetchCleaner'
export const fetchCleanerData = createAsyncThunk(
  'cleaner/fetchCleanerData',
  async (payload: any) => {
    const response = await fetchCleaner({...payload, limit: 0})
    const data: {cleaner_name: string; id: string}[] = []
    const idNameMap: {[key: string]: string} = {}
    response.data.forEach((cleaner) => {
      idNameMap[cleaner.id] = `${cleaner.first_name} ${cleaner.last_name}`
      data.push({
        cleaner_name: `${cleaner.first_name} ${cleaner.last_name}`,
        id: cleaner.id,
      })
    })
    return {
      data,
      idNameMap,
    }
  }
)
