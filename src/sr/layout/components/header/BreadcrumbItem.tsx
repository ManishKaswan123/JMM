import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from 'sr/context/UserContext'
export const BreadcrumbItem = ({
  index,
  item,
  isActive,
}: {
  index: number
  item: {path: string; label: string}
  isActive: boolean
}) => {
  const {user} = useContext(UserContext)
  return (
    <li className='inline-flex items-center'>
      <div className='flex items-center'>
        {index !== 0 && (
          <svg
            className='rtl:rotate-180 w-3 h-3 text-gray-400 mr-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m1 9 4-4-4-4'
            />
          </svg>
        )}

        {isActive === false ? (
          <Link
            to={`${item.path} `}
            className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-rose-600 dark:text-gray-400 dark:hover:text-white'
          >
            {item.label}
          </Link>
        ) : (
          <span className='ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400'>
            {item.label}
          </span>
        )}
      </div>
    </li>
  )
}
