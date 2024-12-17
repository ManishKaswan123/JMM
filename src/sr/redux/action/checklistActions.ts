// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchChecklists} from 'sr/utils/api/checklistApi'
export const fetchChecklistData = createAsyncThunk(
  'checklist/fetchChecklistData',
  async (payload: any) => {
    let res = await fetchChecklists({})
    const response = await fetchChecklists({...payload, limit: res.pagination.total})
    const data: {checklist_name: string; id: string}[] = []
    const idNameMap: {[key: string]: string} = {}
    response.data.forEach((checklist) => {
      idNameMap[checklist.id] = checklist.name
      data.push({
        checklist_name: checklist.name,
        id: checklist.id,
      })
    })
    return {
      data,
      idNameMap,
    }
  }
)
