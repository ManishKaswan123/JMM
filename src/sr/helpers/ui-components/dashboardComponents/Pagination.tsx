import React, {useState} from 'react'
import {Button} from '../Button'
import {NoResults} from '../NoResults'

interface PaginationProps {
  pagination: {
    total: number
    page: number
    pageSize: number
    sort: Record<string, number>
  }
  currentPage?: number
  name: string
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  disabled?: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  pagination,
  onPageChange,
  onLimitChange,
  name,
  disabled = false,
}) => {
  const [startItem, setStartItem] = useState(1)
  const [endItem, setEndItem] = useState(8)
  const [jumpToPage, setJumpToPage] = useState('')
  const [inputLimit, setInputLimit] = useState(pagination.pageSize.toString())
  const totalPages = Math.ceil(pagination.total / pagination.pageSize)

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
  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page)
      setJumpToPage('') // Clear the input field after jumping
    }
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

  let eItem = currentPage * pagination.pageSize
  let sItem = (currentPage - 1) * pagination.pageSize + 1

  if (pagination.total === 0) {
    return <NoResults />
  }
  return (
    <>
      {totalPages > 1 && (
        <div className='px-2 py-2 bg-white shadow-sm '>
          <div className='flex items-center justify-between parent-font-medium'>
            <span className='text-m text-gray-700'>
              Showing {sItem} to {currentPage === totalPages ? pagination.total : eItem} of{' '}
              {pagination.total} entries
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
              <div className='flex items-center space-x-2'>
                <input
                  type='number'
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(e.target.value)}
                  placeholder='Jump'
                  className='ml-2  py-1.5 pl-1.5 border border-gray-300 w-16 placeholder:text-sm'
                />
                <Button
                  onClick={handleJumpToPage}
                  disabled={disabled || !jumpToPage || parseInt(jumpToPage, 10) <= 0}
                  label='Go'
                  className='px-3 py-1.5 border border-gray-300 !bg-blue-500 disabled:cursor-not-allowed disabled:!text-gray  text-white disabled:!bg-white '
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
