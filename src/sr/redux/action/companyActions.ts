// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchCompany} from 'sr/utils/api/fetchCompany'
export const fetchCompanyData = createAsyncThunk(
  'company/fetchCompanyData',
  async (payload: any) => {
    const response = await fetchCompany(payload)
    const data: {company_name: string; id: string}[] = []
    response.data.forEach((com) => {
      data.push({
        company_name: com.company_name,
        id: com.id,
      })
    })
    return {
      data,
    }
  }
)
