import {createRoot} from 'react-dom/client'
// auth provider
// import {AuthProvider} from 'app/pages/module/auth'
// chart config
import {Chart, registerables} from 'chart.js'
// toastify
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// routes
import {AppRoutes} from './app/routing/AppRoutes'
// store redux
import {store} from 'sr/redux/store/index'
import {Provider} from 'react-redux'

import {AuthProvider} from 'sr/context/AuthProvider'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_swooosh/assets/css/style.rtl.css'
//  **/
import './index.css'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import NavigationMenu from 'app/pages/module/dashboard/Navigation'
// chart register
Chart.register(...registerables)

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <Provider store={store}>
      {/* we use redux */}
      {/* provides language support */}
      {/* include/added login and sign up routes */}
      <AuthProvider>
        <AppRoutes />
        <ToastContainer /> {/* original routes */}
      </AuthProvider>
    </Provider>
  )
}
