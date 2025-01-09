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
          className={` bg-gray-200 hover:bg-gray-300 text-${
            isActive === true ? 'rose-600' : 'gray-800'
          } font-semibold px-4 py-2 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3`}
          label={item.label}
        />
      </div>
    </Link>
  )
}
