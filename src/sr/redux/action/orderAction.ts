// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchOrder} from 'sr/utils/api/fetchOrder'
export const fetchOrderData = createAsyncThunk('order/fetchOrderData', async (payload: any) => {
  const {totalResults} = await fetchOrder({})
  const response = await fetchOrder({limit: totalResults})
  const statistics: any = {
    data: [
      {type: 'New', amount: 0, percentage: '', barColor: 'bg-blue-500'},
      {type: 'Pending', amount: 0, percentage: '', barColor: 'bg-green-500'},
      {type: 'Others', amount: 0, percentage: '', barColor: 'bg-pink-500'},
    ],
    totalOrders: totalResults,
  }
  // Update statistics based on user data
  response.results.forEach((order: any) => {
    if (order.status === 'New') {
      statistics.data[0].amount++
    } else if (order.status === 'pending') {
      statistics.data[1].amount++
    } else {
      statistics.data[2].amount++
    }
  })

  // Calculate percentages and assign bar colors
  statistics.data.forEach((stat: any) => {
    stat.percentage =
      totalResults > 0 ? ((stat.amount / totalResults) * 100).toFixed(1) + '%' : '0%'
  })
  return {
    statistics: statistics,
  }
})
