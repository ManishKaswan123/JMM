import clsx from 'clsx'
import {useContext} from 'react'
import {KTSVG, toAbsoluteUrl} from 'sr/helpers'
import {ThemeContext} from './ThemeModeProvider'

/* eslint-disable jsx-a11y/anchor-is-valid */
type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const systemMode = 'light'

const ThemeModeSwitcher = ({toggleBtnClass = ''}: Props) => {
  // const {mode, menuMode, updateMode, updateMenuMode} = useThemeMode()
  // const calculatedMode = mode === 'system' ? systemMode : mode
  // const switchMode = (_mode: ThemeModeType) => {
  //   updateMenuMode(_mode)
  //   updateMode(_mode)
  // }
  const {theme, setTheme} = useContext(ThemeContext)
  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark'
    setTheme(isCurrentDark ? 'light' : 'dark')
  }

  return (
    <>
      {/* begin::Menu toggle */}
      <a href='#'>
        <div className={`uw_004`}>
          <input
            className='toggle-btn__input'
            type='checkbox'
            name='checkbox'
            onChange={handleThemeChange}
            checked={theme === 'light'}
          />
          <div className={`uw_005 menu-title`} onClick={handleThemeChange}>
            <i className='bi bi-lightbulb fs-5'></i>
            {/* <KTSVG className='' path='/media/icons/duotone/abstract/abs001.svg' /> */}
          </div>
        </div>
      </a>
      {/* begin::Menu toggle */}
    </>
  )
}

export {ThemeModeSwitcher}
