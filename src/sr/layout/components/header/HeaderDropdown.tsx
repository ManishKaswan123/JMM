import {useEffect, useState} from 'react'
import {useAuth} from 'sr/context/AuthProvider'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'

const HeaderDropdown = () => {
  const {isAuthReady, isAuthenticated, logout} = useAuth()
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
  const [user, setUser] = useState<any>()
  const navigate = useNavigate()

  const logoutUser = () => {
    DropdownShow()
    logout()
    navigate('/login')
  }

  const DropdownShow = () => {
    setDropdownPopoverShow(!dropdownPopoverShow)
  }

  const navigateToChangePassword = () => {
    DropdownShow()
    navigate('/change-password')
  }
  useEffect(() => {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        if (user) {
          setUser(user)
        }
      } catch (error) {
        console.error('Error parsing user from localStorage', error)
      }
    }
  }, [])

  return (
    <div className='relative inline-block text-left'>
      <button
        type='button'
        className='flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full focus:outline-none'
        onClick={DropdownShow}
      >
        {/* <img
          alt='user'
          className='w-full h-full rounded-full'
          src='https://imgs.search.brave.com/cNx1HXxrqLpBTG-fGQarMwUE1kUXjzH72uA_la9V-f4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/ZWF1dGlmdWwtYW5p/bWUta2lkLWNhcnRv/b24tc2NlbmVfMjMt/MjE1MTAzNTI0Mi5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw'
        /> */}
        <FaUser className='w-6 h-6 bg-gray' />
      </button>

      {dropdownPopoverShow && (
        <div className='absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg'>
          <div className='py-1'>
            <button
              className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              onClick={() => {
                DropdownShow()
                navigate(`user/${user.id}`)
              }}
            >
              <svg
                className='w-5 h-5 mr-3 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5.121 19a1.5 1.5 0 01-1.06-.44l-2.12-2.12a1.5 1.5 0 010-2.12l12-12a1.5 1.5 0 012.12 0l2.12 2.12a1.5 1.5 0 010 2.12l-12 12a1.5 1.5 0 01-1.06.44z'
                />
              </svg>
              {user.firstName}
            </button>
            <button
              className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              onClick={navigateToChangePassword}
            >
              <svg
                className='w-5 h-5 mr-3 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2 4c1.1 0 2-.9 2-2h2c0 2.21-1.79 4-4 4s-4-1.79-4-4h2c0 1.1.9 2 2 2z'
                />
              </svg>
              Change Password
            </button>
          </div>
          <div className='py-1'>
            <button
              className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              onClick={logoutUser}
            >
              <svg
                className='w-5 h-5 mr-3 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z'
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeaderDropdown
