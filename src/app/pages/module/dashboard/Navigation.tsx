import React, {useState} from 'react'
import {
  AiOutlinePieChart,
  AiOutlineUnorderedList,
  AiOutlineAppstore,
  AiOutlineUser,
} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

const NavigationMenu: React.FC<{isOpen: boolean; selectedItem: string}> = ({
  isOpen,
  selectedItem,
}) => {
  const navigate = useNavigate()
  const handleItemClick = (item: string) => {
    navigate(item)
  }
  console.log('selected item is ')

  return (
    <aside
      className={`w-64 transition-width duration-300 ease-in-out ${
        isOpen ? 'block' : 'hidden'
      } md:block`}
      aria-label='Sidebar'
      style={{position: 'sticky', top: 64, height: 'calc(100vh - 4rem)', overflowY: 'auto'}}
    >
      <div className='overflow-y-auto py-4 px-3 rounded'>
        <nav className='flex flex-col'>
          <button
            onClick={() => handleItemClick('/business-category')}
            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
              selectedItem === '/business-category' ? 'bg-blue-100' : ''
            }`}
          >
            <AiOutlinePieChart className='w-6 h-6 text-gray-400' />
            <span className='ml-3'>Business Category</span>
          </button>

          <button
            onClick={() => handleItemClick('/category')}
            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
              selectedItem === '/category' ? 'bg-blue-100' : ''
            }`}
          >
            <AiOutlineUnorderedList className='w-6 h-6 text-gray-400' />
            <span className='ml-3'>Category</span>
          </button>

          <button
            onClick={() => handleItemClick('/sub-category')}
            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
              selectedItem === '/sub-category' ? 'bg-blue-100' : ''
            }`}
          >
            <AiOutlineAppstore className='w-6 h-6 text-gray-400' />
            <span className='ml-3'>Sub Category</span>
          </button>

          {/* New button for User */}
          <button
            onClick={() => handleItemClick('/user')}
            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${
              selectedItem === '/user' ? 'bg-blue-100' : ''
            }`}
          >
            <AiOutlineUser className='w-6 h-6 text-gray-400' />
            <span className='ml-3'>User</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}

export default NavigationMenu
