import React, {useCallback, useEffect, useMemo} from 'react'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import TotalCard from './TotalResults'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import StatisticsCard from 'sr/helpers/ui-components/dashboardComponents/StatisticsCard'
import {DummyData, StatisticsData} from 'sr/constants/dashboard'

// const dummyData: DummyData = {
//   users: [
//     {type: 'Seller', amount: '...', percentage: '0%', barColor: 'bg-blue-500'},
//     {type: 'Retail User', amount: '...', percentage: '0%', barColor: 'bg-green-500'},
//     {type: 'Business User', amount: '...', percentage: '0%', barColor: 'bg-pink-500'},
//   ],
//   orders: [
//     {type: 'New', amount: '...', percentage: '0%', barColor: 'bg-blue-500'},
//     {type: 'Pending', amount: '...', percentage: '0%', barColor: 'bg-green-500'},
//     {type: 'Others', amount: '...', percentage: '0%', barColor: 'bg-pink-500'},
//   ],
//   products: [
//     {type: 'Published', amount: 6, percentage: '50%', barColor: 'bg-blue-500'},
//     {type: 'Unpublished', amount: 2, percentage: '70%', barColor: 'bg-green-500'},
//     {type: 'Others', amount: 3, percentage: '80%', barColor: 'bg-pink-500'},
//   ],
//   transactions: [
//     {type: 'Deposits', amount: 0, percentage: '', barColor: 'bg-blue-500'},
//     {type: 'Transfer', amount: 0, percentage: '', barColor: 'bg-green-500'},
//     {type: 'Received', amount: 0, percentage: '', barColor: 'bg-pink-500'},
//     {type: 'Stripe', amount: 0, percentage: '', barColor: 'bg-yellow-500'},
//     {type: 'Wallet', amount: 0, percentage: '', barColor: 'bg-purple-500'},
//   ],
// }

const Custom: React.FC = () => {
  const {
    users,
    userStatus,
    orders,
    orderStatus,
    transactions,
    transactionStatus,
    products,
    productStatus,
    businessTypes,
    businessTypesStatus,
    categories,
    categoryStatus,
    subCat,
    subCatStatus,
  } = useSelector((state: RootState) => ({
    users: state.user.statistics,
    userStatus: state.user.status,
    orders: state.order.statistics,
    orderStatus: state.order.status,
    transactions: state.transaction.statistics,
    transactionStatus: state.transaction.status,
    products: state.product.statistics,
    productStatus: state.product.status,
    businessTypes: state.businessType.totalBusinessTypes,
    businessTypesStatus: state.businessType.status,
    categories: state.categoryType.totalCategories,
    categoryStatus: state.categoryType.status,
    subCat: state.subCat.totalSubCat,
    subCatStatus: state.subCat.status,
  }))

  const {
    fetchUserData,
    fetchOrderData,
    fetchTransactionData,
    fetchProductData,
    fetchBusinessType,
    fetchCategoryType,
    fetchSubCatData,
  } = useActions()

  const fetchDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') fetchUserData({})
    if (orderStatus !== 'succeeded') fetchOrderData({})
    if (transactionStatus !== 'succeeded') fetchTransactionData({})
    if (productStatus !== 'succeeded') fetchProductData({})
    if (businessTypesStatus !== 'succeeded') fetchBusinessType({})
    if (categoryStatus !== 'succeeded') fetchCategoryType({})
    if (subCatStatus !== 'succeeded') fetchSubCatData({})
  }, [
    userStatus,
    orderStatus,
    transactionStatus,
    productStatus,
    businessTypesStatus,
    categoryStatus,
    subCatStatus,
    fetchUserData,
    fetchOrderData,
    fetchTransactionData,
    fetchProductData,
    fetchBusinessType,
    fetchCategoryType,
    fetchSubCatData,
  ])

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  const calculatePercentage = (amount: number, total: number): string =>
    `${((amount / total) * 100).toFixed(1)}%`

  const masterData: StatisticsData[] | undefined = useMemo(() => {
    if (!businessTypes || !categories || !subCat) return undefined
    return [
      {
        type: 'Business',
        amount: businessTypes,
        percentage: calculatePercentage(businessTypes, businessTypes + categories + subCat),
        barColor: 'bg-blue-500',
      },
      {
        type: 'Category',
        amount: categories,
        percentage: calculatePercentage(categories, businessTypes + categories + subCat),
        barColor: 'bg-green-500',
      },
      {
        type: 'Sub Category',
        amount: subCat,
        percentage: calculatePercentage(subCat, businessTypes + categories + subCat),
        barColor: 'bg-pink-500',
      },
    ]
  }, [businessTypes, categories, subCat])

  const statisticsSections = [
    {title: 'Users', data: users?.data},
    {title: 'Master Data', data: masterData},
    {title: 'Orders', data: orders?.data},
    {title: 'Transactions', data: transactions?.data},
    {title: 'Products', data: products?.data},
  ]

  const totalCards = [
    {title: 'Users', total: users?.totalUsers},
    {title: 'Sellers', total: users?.data?.[0]?.amount},
    {title: 'Business Types', total: businessTypes},
    {title: 'Categories', total: categories},
    {title: 'Sub Categories', total: subCat},
    {title: 'Products', total: products?.totalProducts},
    {title: 'Orders', total: orders?.totalOrders},
    {title: 'Transactions', total: transactions?.totalTransactions},
  ]

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <h1 className='text-xl font-semibold mb-2'>Total</h1>
      <div className='mb-6 grid grid-cols-4 gap-3 w-full'>
        {totalCards.map((card, index) => (
          <TotalCard key={index} totalUsers={card.total} title={card.title} />
        ))}
      </div>
      <h1 className='text-xl font-semibold mb-2'>Statistics</h1>
      <div className='mb-4 grid grid-cols-3 gap-3'>
        {statisticsSections.map((section, index) => (
          <StatisticsCard key={index} data={section.data} title={section.title} />
        ))}
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/dashboard' />
}

export default Dashboard
