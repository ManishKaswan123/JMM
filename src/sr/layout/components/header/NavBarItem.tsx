import {red} from '@mui/material/colors'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from 'sr/context/UserContext'
import {Button} from 'sr/helpers'
export const NavBarItem = ({item, isActive}: {item: any; isActive: boolean}) => {
  const {user, setUser} = useContext(UserContext)
  return (
    <Link to={`${item.path}/${user}`} replace>
      <div className='flex items-center'>
        <Button
          className={` bg-${
            isActive === true ? 'gray-400' : 'gray-200'
          } hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3`}
          label={item.label}
        />
        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d={item.iconPath} />
        </svg> */}
      </div>
    </Link>
  )
}
