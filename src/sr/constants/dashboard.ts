export interface StatisticsData {
    type: string
    amount: number | string
    percentage: string | number
    barColor: string
  }
  
export interface DummyData {
    users: StatisticsData[]
    orders: StatisticsData[]
    products: StatisticsData[]
    transactions: StatisticsData[]
  }
export const dummyData: DummyData = {
    users: [
      {type: 'Seller', amount: '...', percentage: '0%', barColor: 'bg-blue-500'},
      {type: 'Retail User', amount: '...', percentage: '0%', barColor: 'bg-green-500'},
      {type: 'Business User', amount: '...', percentage: '0%', barColor: 'bg-pink-500'},
    ],
    orders: [
      {type: 'New', amount: '...', percentage: '0%', barColor: 'bg-blue-500'},
      {type: 'Pending', amount: '...', percentage: '0%', barColor: 'bg-green-500'},
      {type: 'Others', amount: '...', percentage: '0%', barColor: 'bg-pink-500'},
    ],
    products: [
      {type: 'Published', amount: 6, percentage: '50%', barColor: 'bg-blue-500'},
      {type: 'Unpublished', amount: 2, percentage: '70%', barColor: 'bg-green-500'},
      {type: 'Others', amount: 3, percentage: '80%', barColor: 'bg-pink-500'},
    ],
    transactions: [
      {type: 'Deposits', amount: 0, percentage: '', barColor: 'bg-blue-500'},
      {type: 'Transfer', amount: 0, percentage: '', barColor: 'bg-green-500'},
      {type: 'Received', amount: 0, percentage: '', barColor: 'bg-pink-500'},
      {type: 'Stripe', amount: 0, percentage: '', barColor: 'bg-yellow-500'},
      {type: 'Wallet', amount: 0, percentage: '', barColor: 'bg-purple-500'},
    ],
  }