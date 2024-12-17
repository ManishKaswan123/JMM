import React, {FC} from 'react'
import {useAuth} from 'app/pages/module/auth/core/Auth'
import {Routes, Route, Navigate} from 'react-router-dom'
import {MasterLayout} from 'sr/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {routeConfigs} from './RouteConfig'

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
  return <React.Suspense fallback={<TopBarProgress />}>{children}</React.Suspense>
}

const PrivateRoutes: FC = () => {
  // const {auth} = useAuth()
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/jobs' />} />
        {routeConfigs.map(({path, element}) => (
          <Route key={path} path={path} element={<SuspensedView>{element}</SuspensedView>} />
        ))}
        <Route path='*' element={<Navigate to='/jobs' />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
