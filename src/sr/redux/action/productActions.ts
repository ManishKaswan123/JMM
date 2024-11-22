// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchProduct} from 'sr/utils/api/fetchProduct'
export const fetchProductData = createAsyncThunk(
  'product/fetchProductData',
  async (payload: any) => {
    const {totalResults} = await fetchProduct({})
    const response = await fetchProduct({limit: totalResults})
    const statistics: any = {
      data: [
        {type: 'Published', amount: 0, percentage: '50%', barColor: 'bg-blue-500'},
        {type: 'Unpublished', amount: 0, percentage: '70%', barColor: 'bg-green-500'},
        {type: 'Others', amount: 0, percentage: '80%', barColor: 'bg-pink-500'},
        // {type: 'Draft', amount: 1, percentage: '90%', barColor: 'bg-yellow-500'},
      ],
      totalProducts: totalResults,
    }
    // Update statistics based on user data
    response.results.forEach((product: any) => {
      if (product.isPublished === true) {
        statistics.data[0].amount++
      } else if (product.isPublished === false) {
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
  }
)
