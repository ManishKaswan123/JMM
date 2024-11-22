import {FC} from 'react'
import clsx from 'clsx'
import {Button, KTSVG, toAbsoluteUrl} from 'sr/helpers/index'
import {ThemeModeSwitcher} from 'sr/partials/themes/theme-mode/ThemeModeSwitcher'

const itemClass = 'ms-1 ms-lg-3'
const btnClass = 'btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  // const {config} = useLayout()

  return (
    <div className='menu-item d-flex align-items-stretch flex-shrink-0 mx-4 my-3'>
      <div className={clsx('menu-link topbar px-2 rounded d-flex align-items-center', itemClass)}>
        <div className='menu-title'>
          <ThemeModeSwitcher toggleBtnClass={'m-2'} />
        </div>
      </div>

      <div
        className={clsx('menu-link topbar px-2 rounded d-flex align-items-center', itemClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div className={clsx('menu-title cursor-pointer symbol', userAvatarClass)}>
          <i className='bi bi-person fs-4'></i>
        </div>
      </div>
      {/* begin::Toggle */}
      <div className={clsx(itemClass)}>
        <div className={clsx('h-100 menu-title cursor-pointer symbol', userAvatarClass)}>
          <Button className='fw-semibold' label={'Sign Out'} />
        </div>
      </div>
      {/* end::User */}
    </div>
  )
}

export {Topbar}
