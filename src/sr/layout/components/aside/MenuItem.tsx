import {Link} from 'react-router-dom'

export const MenuItem = ({item, isActive, sideCollapseItem}: any) => (
  <li className='items-center'>
    <Link to={item.path} replace>
      <button
        className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
          isActive ? 'text-rose-600' : ''
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d={item.iconPath} />
        </svg>
        {sideCollapseItem === 'show' ? <span className='text-left'>{item.label}</span> : ''}
      </button>
    </Link>
  </li>
)
