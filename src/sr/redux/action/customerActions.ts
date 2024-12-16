// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchCustomers} from 'sr/utils/api/customerApi'
export const fetchCustomersData = createAsyncThunk(
  'customer/fetchCustomersData',
  async (payload: any) => {
    const response = await fetchCustomers(payload)
    const data: {customer_name: string; id: string}[] = []
    response.data.forEach((customer) => {
      data.push({
        customer_name: customer.name,
        id: customer.id,
      })
    })
    return {
      data,
    }
  }
)
