import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {NavBarItem} from './NavBarItem'
import {navItems} from './NavbarItems'
import {Button} from 'sr/helpers'

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [urlItems, setUrlItems] = useState<string[]>([])

  useEffect(() => {
    setUrlItems(location.pathname.split('/'))
  }, [location])

  return (
    <nav className='flex items-center px-2'>
      {/* Back Button */}
      <Button
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
        onClick={() => navigate('/users')}
        label={'🡸'}
      />

      {/* Horizontal Scrollable Nav Items */}
      <div className='flex space-x-4 overflow-x-auto items-center ml-4 px-2'>
        {navItems.map((item, index) => (
          <div key={index} className='flex-shrink-0 basis-1/4 mb-2'>
            <NavBarItem item={item} isActive={urlItems[2] === item.name} />
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
