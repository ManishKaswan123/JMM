import React from 'react'
import {FaUsers, FaStore, FaBoxes, FaShoppingCart, FaDollarSign} from 'react-icons/fa'

interface TotalCardProps {
  totalUsers: number | null | undefined
  title: string
}

const getIcon = (title: string) => {
  switch (title) {
    case 'Users':
      return <FaUsers className='h-4 w-4 text-blue-500' />
    case 'Sellers':
      return <FaStore className='h-4 w-4 text-blue-500' />
    case 'Business Types':
      return <FaBoxes className='h-4 w-4 text-blue-500' />
    case 'Categories':
      return <FaBoxes className='h-4 w-4 text-blue-500' />
    case 'Sub Categories':
      return <FaBoxes className='h-4 w-4 text-blue-500' />
    case 'Products':
      return <FaShoppingCart className='h-4 w-4 text-blue-500' />
    case 'Orders':
      return <FaShoppingCart className='h-4 w-4 text-blue-500' />
    case 'Transactions':
      return <FaDollarSign className='h-4 w-4 text-blue-500' />
    default:
      return <FaUsers className='h-4 w-4 text-blue-500' />
  }
}

const TotalCard: React.FC<TotalCardProps> = ({totalUsers, title}) => {
  const displayUsers = totalUsers !== undefined && totalUsers !== null ? totalUsers : '...'
  const Icon = getIcon(title)
  if (!title || !totalUsers)
    return (
      <div className='bg-white shadow rounded-lg p-6 flex items-center hover:bg-gray-50 animate-pulse'>
        {/* <div className='flex-shrink-0 bg-gray-200 p-4 rounded-full'> */}
        <div className='skeleton-icon w-12 h-12 rounded-full'></div>
        {/* </div> */}
        <div className='ml-4'>
          <div className='skeleton-row w-24 h-6 mb-2'></div>
          <div className='skeleton-row w-16 h-4'></div>
        </div>
      </div>
    )

  return (
    <div className='bg-white shadow rounded-lg p-6 flex items-center hover:bg-gray-50'>
      <div className='flex-shrink-0 bg-gray-200 p-4 rounded-full'>{Icon}</div>
      <div className='ml-4'>
        <div className='text-2xl font-semibold text-gray-900'>{displayUsers}</div>
        <div className='text-sm text-gray-500'>{title}</div>
      </div>
    </div>
  )
}

export default TotalCard
