// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchTransactions} from 'sr/utils/api/fetchTransactionsHistory'
export const fetchTransactionData = createAsyncThunk(
  'transaction/fetchTransactionData',
  async (payload: any) => {
    const {totalResults} = await fetchTransactions({})
    const response = await fetchTransactions({limit: totalResults})
    const statistics: any = {
      data: [
        {type: 'Deposits', amount: 0, percentage: '', barColor: 'bg-blue-500'},
        {type: 'Transfer', amount: 0, percentage: '', barColor: 'bg-green-500'},
        {type: 'Received', amount: 0, percentage: '', barColor: 'bg-pink-500'},
        {type: 'Stripe', amount: 0, percentage: '', barColor: 'bg-yellow-500'},
        {type: 'Wallet', amount: 0, percentage: '', barColor: 'bg-purple-500'},
      ],
      totalTransactions: totalResults,
    }
    // Update statistics based on user data
    response.results.forEach((transaction: any) => {
      if (transaction.transactionType === 'Deposits') {
        statistics.data[0].amount++
      } else if (transaction.transactionType === 'Transfer') {
        statistics.data[1].amount++
      } else if (transaction.transactionType === 'Received') {
        statistics.data[2].amount++
      }
      if (transaction.transactionMode === 'stripe') {
        statistics.data[3].amount++
      }
      if (transaction.transactionMode === 'wallet') {
        statistics.data[4].amount++
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
