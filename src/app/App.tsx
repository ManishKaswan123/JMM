import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from 'sr/layout/master-layout'
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries by default
      },
      mutations: {
        retry: false, // Disable retries for mutations by default
      },
    },
  })
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </LayoutProvider>
    </Suspense>
  )
}

export {App}
