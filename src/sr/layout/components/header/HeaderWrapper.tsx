import PropTypes from 'prop-types'
import HeaderDropdown from './HeaderDropdown'
import Breadcrumb from './Breadcrumb'

type Props = {hubName: any}

export default function HeaderWrapper({hubName}: Props) {
  return (
    <>
      {/* Navbar */}
      <div
        className={`h-16 md:fixed sm:relative md:z-[50] sm:z-10 top-0 right-0 w-inherit md:flex-row md:flex-nowrap md:justify-between flex p-4  shadow-lg  bg-[#f1f1f1] items-center`}
      >
        <Breadcrumb />
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
