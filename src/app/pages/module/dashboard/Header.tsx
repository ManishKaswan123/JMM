import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {AiOutlineMenu, AiOutlineLogout} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import companyLogo from 'sr/img/company_logo.jpeg'

// Define the props interface
interface HeaderProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({setIsNavOpen}) => {
  // Function to toggle the navigation menu
  const [userName, setUserName] = useState('')

  const handlelogo = () => {
    window.location.href = '/dashboard'
  }

  const handleLogout = async () => {
    try {
      const deleteCookie = (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict`
      }
      deleteCookie('EightySixUI_token')
      deleteCookie('EightySixUI_refresh_token')

      window.location.href = '/auth' // Redirect to login
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserName(parsedUser.firstName)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  return (
    <header className='bg-[#F7F7F7] shadow flex justify-between items-center px-6 py-1 sticky top-0 z-50'>
      <div className='flex items-center'>
        <button onClick={toggleNav} className='text-gray-800 hover:text-gray-600 md:hidden'>
          <AiOutlineMenu className='w-6 h-6' />
        </button>
        <div className='image-container w-36' onClick={handlelogo}>
          <img src={companyLogo} alt='Company Logo' className='image' />
        </div>
        {/* Add additional header content here */}
      </div>
      <div className='flex items-center'>
        <span className='text-gray-800 font-serif mr-4'>Welcome {userName}</span>
        <button className='flex items-center text-gray-700 hover:text-black'>
          <AiOutlineLogout className='w-5 h-5 mr-2' />
          <span onClick={handleLogout}>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Header
