import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchBusinessCategory} from 'sr/utils/api/fetchBusinessCategory'
export const fetchBusinessTypeData = createAsyncThunk(
  'business/fetchBusinessTypeData',
  async (payload: any) => {
    const response = await fetchBusinessCategory({...payload, limit: 0})
    const data: {type: string; id: string}[] = []
    const idNameMap: {[key: string]: string} = {}
    response.data.forEach((businessType) => {
      idNameMap[businessType.id] = businessType.type
      data.push({
        type: businessType.type,
        id: businessType.type,
      })
    })
    return {
      data,
      idNameMap,
    }
  }
)
