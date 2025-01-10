import React from 'react'
import {NavBarItem} from './NavBarItem'
import {NavItem} from './NavbarItems'
import {useUrlItems} from 'sr/utils/helpers/useUrlItems'
interface NavBarProps {
  onGoBack: () => void
  navItems: NavItem[]
}
const NavBar: React.FC<NavBarProps> = ({onGoBack, navItems}) => {
  const urlItems = useUrlItems()

  return (
    <div className='text-sm bg-gray-100 font-medium text-center text-gray-500 fixed top-16 w-full z-10'>
      <ul className='flex flex-wrap -mb-px'>
        {navItems.map((item, index) => (
          <NavBarItem key={index} item={item} isActive={urlItems[2] === item.name} />
        ))}
      </ul>
    </div>
  )
}

export default NavBar
