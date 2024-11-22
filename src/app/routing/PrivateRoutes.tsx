import {useAuth} from 'app/pages/module/auth/core/Auth'
import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'sr/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import RewardPointPlan from 'app/pages/module/masterData/rewardPaymentPlan/RewardPointPlan'
import RewardPoint from 'app/pages/module/masterData/rewardPoint/RewardPoint'
import RewardUsageHistory from 'app/pages/module/masterData/rewardUsageHistory/RewardUsageHistory'
import CheckWalletBalance from 'app/pages/module/masterData/checkWalletBalance/checkWalletBalance'
// import EightySixResponseDetailsCard from 'app/pages/module/86Response/components/86ResponseDetailsCard'

// Lazy loading components
const Dashboard = lazy(async () => import('app/pages/module/dashboard/Dashboard'))
const Categories = lazy(async () => import('app/pages/module/masterData/categories/Categories'))
const BusinessCategory = lazy(async () => import('app/pages/module/masterData/business/Business'))
const SubCategory = lazy(
  async () => import('app/pages/module/masterData/subCategory/SubCategories')
)
const User = lazy(async () => import('app/pages/module/user/User'))
const Products = lazy(async () => import('app/pages/module/masterData/product/Product'))
const Orders = lazy(async () => import('app/pages/module/masterData/order/Order'))
const ProductDetail = lazy(async () => import('app/pages/module/masterData/product/ProductDetail'))
const TransactionHistory = lazy(
  async () => import('app/pages/module/masterData/transactionsHistory/TransactionsHistory')
)
const PaymentHistory = lazy(async () => import('app/pages/module/masterData/payment/Payment'))
const InvitationCoupon = lazy(
  async () => import('app/pages/module/invitationCoupon/InvitationCoupon')
)
const SellerPaymentPlan = lazy(async () => import('app/pages/module/seller/SellerPaymentPlan'))
const UserDetailCard = lazy(async () => import('app/pages/module/user/UserDetail'))
const AppVersionHistory = lazy(
  async () => import('app/pages/module/appVersionHistory/AppVersionHistory')
)
const SellerOnBoarding = lazy(async () => import('app/pages/module/seller/SellerOnBoarding'))
const ChangePassword = lazy(async () => import('app/pages/module/userProfile/ChangePassword'))
const EightSix = lazy(async () => import('app/pages/module/86/86'))
const EightySixResponse = lazy(async () => import('app/pages/module/86Response/86Response'))
const Chats = lazy(async () => import('app/pages/module/chats/Chats'))
const EightySixResponseDetailsCard = lazy(
  async () => import('app/pages/module/86Response/components/86ResponseDetailsCard')
)

type RouteConfig = {
  path: string
  element: JSX.Element
}

type WithChildren = {
  children: any
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  TopBarProgress.config({
    barColors: {
      '0': '#000',
    },
    barThickness: 4,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

const routeConfigs: RouteConfig[] = [
  {path: '/dashboard', element: <Dashboard />},
  {path: '/dashboard/:type', element: <Dashboard />},
  {path: '/business-category', element: <BusinessCategory />},
  {path: '/sub-category', element: <SubCategory />},
  {path: '/category', element: <Categories />},
  {path: '/user', element: <User />},
  {path: '/user/:userId', element: <UserDetailCard />},
  {path: '/product', element: <Products />},
  {path: '/product/:productId', element: <ProductDetail />},
  {path: '/order', element: <Orders />},
  {path: '/transactions', element: <TransactionHistory />},
  {path: '/payment', element: <PaymentHistory />},
  {path: '/invitation-coupon', element: <InvitationCoupon />},
  {path: '/seller-payment-plan', element: <SellerPaymentPlan />},
  {path: '/mobile-app-version-history', element: <AppVersionHistory />},
  {path: '/seller-onboarding', element: <SellerOnBoarding />},
  {path: '/change-password', element: <ChangePassword />},
  {path: '/86', element: <EightSix />},
  {path: '/86-response', element: <EightySixResponse />},
  {path: '/86-response/:responseId', element: <EightySixResponseDetailsCard />},
  {path: '/chats', element: <Chats />},
  {path: '/reward-point-plan', element: <RewardPointPlan />},
  {path: '/reward-earning', element: <RewardPoint />},
  {path: '/reward-uses-history', element: <RewardUsageHistory />},
  {path: '/users/checkWalletBalance', element: <CheckWalletBalance />},
]

const PrivateRoutes: FC = () => {
  const {auth} = useAuth()
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {routeConfigs.map(({path, element}) => (
          <Route key={path} path={path} element={<SuspensedView>{element}</SuspensedView>} />
        ))}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
