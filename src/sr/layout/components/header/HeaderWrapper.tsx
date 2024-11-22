import React from 'react'
import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom'
import HeaderDropdown from './HeaderDropdown'
import {useNavigate} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'

type Props = {hubName: any}

export default function HeaderWrapper({hubName}: Props) {
  const {pathname} = window.location

  // let history = useHistory()
  const backUrl = () => {
    // history.goBack()
  }
  const navigate = useNavigate()

  return (
    <>
      {/* Navbar */}
      <nav
        className={`md:fixed sm:relative md:z-[50] sm:z-10 top-0 right-0 w-inherit md:flex-row md:flex-nowrap md:justify-end flex p-4  shadow-lg  bg-[#f1f1f1]`}
      >
        {/* <div className='flex items-center'> */}
        {/* <svg
            xmlns='http://www.w3.org/2000/svg'
            onClick={backUrl}
            className='h-5 w-5 cursor-pointer text-white mr-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg> */}
        {/* Brand */}
        {/* <Link to='/dashboard'> */}
        {/* <button
            className='text-white text-lg uppercase lg:inline-block font-semibold'
            onClick={() => {
              navigate('/dashboard')
              console.log('dashboard button is clicked')
            }}
          >
            {hubName}
          </button> */}
        {/* </Link> */}
        {/* </div> */}
        {/* <div className='w-auto flex justify-center md:px-10 px-4'>
          {pathname === '/dashboard'
            ? ''
            : // <form className='md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3'>
              //   <div className='relative flex w-full flex-wrap items-stretch'>
              //     <span className='z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
              //       <i className='fas fa-search'></i>
              //     </span>
              //     <input
              //       type='text'
              //       placeholder='Search here...'
              //       className='border-0 px-4 py-3 md:w-56 placeholder-rose-300 text-blueGray-600 relative lg:block md:hidden  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full'
              //     />
              //   </div>
              // </form>
              ''}
        </div> */}

        <ul className='px-4 flex-col md:flex-row list-none items-center hidden md:flex justify-end'>
          <HeaderDropdown />
        </ul>
      </nav>
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
