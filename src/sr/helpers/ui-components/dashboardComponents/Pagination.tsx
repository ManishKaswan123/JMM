import React, {useState, useEffect} from 'react'
import {Button} from '../Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  name: string
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  disabled?: boolean
  totalResults?: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onLimitChange,
  totalResults,
  name,
  disabled = false,
}) => {
  const [startItem, setStartItem] = useState(1)
  const [endItem, setEndItem] = useState(8)
  const [inputLimit, setInputLimit] = useState(itemsPerPage.toString())

  const handleLimitChange = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(inputLimit, 10)
    if (!isNaN(newLimit) && newLimit > 0) {
      onLimitChange(newLimit)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLimit(e.target.value)
  }

  const paginationRange = (current: number, total: number) => {
    let start = Math.max(1, current - 2)
    let end = Math.min(total, current + 2)

    if (total > 5) {
      if (current <= 3) {
        end = 5
      } else if (current + 2 >= total) {
        start = total - 4
      }
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i)
  }

  let eItem = currentPage * itemsPerPage
  let sItem = (currentPage - 1) * itemsPerPage + 1

  return (
    <>
      {totalPages > 0 && (
        <div className='px-2 py-2 bg-white shadow-sm '>
          <div className='flex items-center justify-between parent-font-medium'>
            <span className='text-m text-gray-700'>
              Showing {sItem} to {currentPage === totalPages ? totalResults : eItem} of{' '}
              {totalResults} entries
            </span>
            <div className='flex items-center'>
              <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={disabled || currentPage === 1}
                label='Previous'
                className={`px-3 py-1.5 border border-gray-300  disabled:cursor-not-allowed disabled:!text-gray disabled:!bg-white bg-white text-blue-500 `}
              />
              {paginationRange(currentPage, totalPages).map((number) => (
                <Button
                  key={number}
                  onClick={() => onPageChange(number)}
                  disabled={disabled || currentPage === number}
                  label={number.toString()}
                  className={`disabled:!bg-blue-500 disabled:!text-white disabled:!border-blue-500 disabled:cursor-not-allowed !bg-white !text-blue-500 px-3 py-1.5 border-t border-b border-r border-gray-300 `}
                />
              ))}
              <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={disabled || currentPage === totalPages}
                label='Next'
                className={`px-3 py-1.5 border-r border-t border-b border-gray-300  disabled:cursor-not-allowed disabled:!text-gray disabled:!bg-white bg-white text-blue-500 `}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
