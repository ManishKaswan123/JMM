import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import HeaderDropdown from './HeaderDropdown'
import NavBar from './NavBar'
import {useLocation, useNavigate} from 'react-router-dom'
import {cleanerNavItems, userNavItems} from './NavbarItems'

type Props = {hubName: any}

export default function HeaderWrapper({hubName}: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [urlItems, setUrlItems] = useState<string[]>([] as string[])
  useEffect(() => {
    setUrlItems(location.pathname.split('/'))
  }, [location])

  return (
    <>
      {/* Navbar */}
      <div
        className={`md:fixed sm:relative md:z-[50] sm:z-10 top-0 right-0 w-inherit md:flex-row md:flex-nowrap md:justify-between flex p-4  shadow-lg  bg-[#f1f1f1] items-center`}
      >
        {urlItems.length > 2 && urlItems[1] === 'user' && (
          <div className='w-11/12'>
            <NavBar onGoBack={() => navigate('/user')} navItems={userNavItems} />
          </div>
        )}
        {urlItems.length > 2 && urlItems[1] === 'cleaner' && (
          <div className='w-11/12'>
            <NavBar onGoBack={() => navigate('/cleaner')} navItems={cleanerNavItems} />
          </div>
        )}

        <div className='ml-auto'>
          <HeaderDropdown />
        </div>
      </div>
      {/* End Navbar */}
    </>
  )
}

HeaderWrapper.defaultProps = {
  hubName: 'Dashboard',
}

HeaderWrapper.propTypes = {
  hubName: PropTypes.string,
}
