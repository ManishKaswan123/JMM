import clsx from 'clsx'
import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {ThemeContext} from 'sr/partials/partials'
import {Footer} from './components/Footer'
import HeaderWrapper from './components/header/HeaderWrapper'
import {PageDataProvider} from './master-layout'
import AsideDefault from './components/aside/AsideDefault'
import {UserContext} from 'sr/context/UserContext'
import MasterNavBar from './master-layout/MasterNavBar'
import {useUrlItems} from 'sr/utils/helpers/useUrlItems'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'

const MasterLayout = () => {
  const [user, setUser] = useState<string | undefined>(undefined)
  const urlItems = useUrlItems()
  const [theme, setTheme] = useState('light')
  const [collapse, setCollapse] = useState<any | null>(false)
  const [width, setWidth] = useState<any | null>(
    'md:w-[83.4%] md:ml-[16.6vw] bg-gray-100 sm:w-full duration-1000 ease-in-out'
  )
  // functions
  const AdjustWidth = () => {
    if (!collapse) {
      setWidth('md:w-[93%] md:ml-[7vw] bg-gray-100 duration-1000 ease-in-out')
      setCollapse(true)
    } else {
      setCollapse(false)
      setWidth(' md:ml-[16.6vw] md:w-[83.4%] bg-gray-100 sm:w-full duration-1000 ease-in-out')
    }
  }

  return (
    <PageDataProvider>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <>
          <div data-testid='master' className={`theme-${theme}`}>
            <div className={clsx('main-page')}>
              {/* begin::Page */}
              <div className='page d-flex flex-row flex-column-fluid'>
                <AsideDefault AdjustWidth={AdjustWidth} />
                {/* begin::Wrapper */}

                <UserContext.Provider value={{user, setUser}}>
                  <div className={`master_layout_main ${width}`}>
                    <HeaderWrapper />
                  </div>

                  <div className={`mt-${urlItems.length > 2 ? 28 : 16} ${width}`}>
                    <MasterNavBar />
                    <DashboardWrapper customComponent={Outlet} />
                    {/* <Outlet /> */}
                  </div>
                </UserContext.Provider>
                {/* end::Content */}
                <div className={`master_layout_main ${width}`}>
                  <Footer />
                </div>
                {/* end::Wrapper */}
              </div>
              {/* end::Page */}
            </div>
          </div>
        </>
      </ThemeContext.Provider>
    </PageDataProvider>
  )
}

export {MasterLayout}
