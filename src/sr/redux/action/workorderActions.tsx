// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchWorkOrder} from 'sr/utils/api/fetchWorkOrder'
export const fetchWorkorderData = createAsyncThunk(
  'workorder/fetchWorkorderData',
  async (payload: any) => {
    payload = {...payload, min_pay_type_rate: 1, max_pay_type_rate: 100}
    let response = await fetchWorkOrder(payload)
    response = await fetchWorkOrder({...payload, limit: response.pagination.total})
    const data: {workorder_name: string; id: string}[] = []
    const idNameMap: {[key: string]: string} = {}
    response.data.forEach((workorder) => {
      idNameMap[workorder.id] = workorder.title
      data.push({
        workorder_name: workorder.title,
        id: workorder.id,
      })
    })
    return {
      data,
      idNameMap,
    }
  }
)
