import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from 'sr/context/UserContext'

export const NavBarItem = ({item, isActive}: {item: any; isActive: boolean}) => {
  const {user} = useContext(UserContext)

  return (
    <li className='relative me-2'>
      <Link
        to={`${item.path}/${user}`}
        className={`inline-block py-4 px-3 text-gray-600 rounded-t-lg transition-colors duration-300 ease-in-out dark:text-gray-300 ${
          isActive
            ? 'text-rose-600 dark:text-blue-500'
            : 'hover:text-gray-800 dark:hover:text-white'
        }`}
      >
        {item.label}
        <span
          className={` absolute left-0 bottom-0 h-[2px] w-full bg-rose-600 transform transition-transform duration-300 ease-in-out ${
            isActive ? 'scale-x-100' : 'scale-x-0'
          }`}
        ></span>
      </Link>
    </li>
  )
}
