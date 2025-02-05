import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'
import {getStatusName} from '../globalHelpers'
import {Status} from 'sr/utils/api/globalInterface'

interface DetailItemProps {
  label: string
  value?: string | number | null
  link?: string // Optional link
  isStatus?: boolean
}

const DetailItem: React.FC<DetailItemProps> = ({label, value, link, isStatus}) => {
  return (
    <div className='flex items-center'>
      <strong className='font-medium text-lg mr-2'>{label}:</strong>
      {link && value ? (
        <Link to={link} className='text-blue-500 hover:font-medium'>
          {value}
        </Link>
      ) : isStatus ? (
        <p>{getStatusName(value as Status)}</p>
      ) : (
        <p>{value ?? 'N/A'}</p>
      )}
    </div>
  )
}

interface DetailCardProps {
  title: string
  details: {label: string; value?: string | number | null; link?: string; isStatus?: boolean}[][]
  onGoBack: () => void
}

const DetailCard: React.FC<DetailCardProps> = ({title, details, onGoBack}) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />
      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>{title}</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {details.map((column, index) => (
          <div key={index} className='space-y-4'>
            {column.map((item, i) => (
              <DetailItem
                key={i}
                label={item.label}
                value={item.value}
                link={item.link}
                isStatus={item.isStatus}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailCard
