import {lazy, FC, Suspense} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {useAuth} from 'sr/context/AuthProvider'
import {LayoutSplashScreen} from 'sr/layout/master-layout'
import ScrollToTop from 'app/ScrollToTop'
import {App} from 'app/App'

// Lazy load the components
const AuthPage = lazy(async () => import('app/pages/module/auth/Login'))
const RegisterPage = lazy(async () => import('app/pages/module/auth/Register'))
const ErrorsPage = lazy(async () => import('app/pages/module/errors/ErrorsPage'))
const OtpPage = lazy(async () => import('app/pages/module/auth/OTP'))
const SellerOnBoarding = lazy(async () => import('app/pages/module/seller/SellerOnBoarding'))
const PrivateRoutes = lazy(async () => import('./PrivateRoutes'))

const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {isAuthReady, isAuthenticated} = useAuth()

  if (!isAuthReady) {
    return <LayoutSplashScreen />
  }

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          {isAuthenticated ? (
            <Route
              path='/*'
              element={
                <Suspense fallback={<LayoutSplashScreen />}>
                  <PrivateRoutes />
                </Suspense>
              }
            />
          ) : (
            <>
              <Route
                path='auth/*'
                element={
                  <Suspense fallback={<LayoutSplashScreen />}>
                    <AuthPage />
                  </Suspense>
                }
              />
              <Route
                path='register'
                element={
                  <Suspense fallback={<LayoutSplashScreen />}>
                    <RegisterPage />
                  </Suspense>
                }
              />
              <Route
                path='otp-verification'
                element={
                  <Suspense fallback={<LayoutSplashScreen />}>
                    <OtpPage />
                  </Suspense>
                }
              />
              <Route
                path='seller-onboarding/'
                element={
                  <Suspense fallback={<LayoutSplashScreen />}>
                    <SellerOnBoarding />
                  </Suspense>
                }
              />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
