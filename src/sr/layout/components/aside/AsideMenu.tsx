import React from 'react'
import AsideMenuMain from './AsideMenuMain'

type Props = {
  AdjustWidth: any
}

const AsideMenu = ({AdjustWidth}: Props) => {
  return (
    <div id='kt_aside_menu_wrapper'>
      <div className='' id='#kt_aside_menu' data-kt-menu='true'>
        <AsideMenuMain AdjustWidth={AdjustWidth} />
      </div>
    </div>
  )
}

export {AsideMenu}
