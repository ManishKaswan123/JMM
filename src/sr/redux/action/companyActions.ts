// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchCompany} from 'sr/utils/api/fetchCompany'
export const fetchCompanyData = createAsyncThunk(
  'company/fetchCompanyData',
  async (payload: any) => {
    const response = await fetchCompany({...payload, limit: 0})
    const data: {company_name: string; id: string}[] = []
    const idNameMap: {[key: string]: string} = {}
    response.data.forEach((com) => {
      idNameMap[com.id] = com.company_name
      data.push({
        company_name: com.company_name,
        id: com.id,
      })
    })
    return {
      data,
      idNameMap,
    }
  }
)
