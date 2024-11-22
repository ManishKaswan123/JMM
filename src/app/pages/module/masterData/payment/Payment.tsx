import React, {useEffect, useState} from 'react'
import PaymentCard from './PaymentCard'
import {fetchPayments} from 'sr/utils/api/fetchPaymentHistory'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from '../../../../../sr/helpers/ui-components/Filter'
import {Button} from 'sr/helpers'

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const fields = [
    {type: 'text', label: 'User ID', name: 'userId', placeholder: 'UserId'},
    {type: 'number', label: 'Limit', name: 'limit', placeholder: 'Limit'},
  ]

  const onPageChange = async (pageNumber: number) => {
    setLoading(true)
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after applying
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const payload = {
          limit: itemsPerPage,
          page: currentPage,
          ...filters,
        }
        console.log('Payload filters:', payload)
        const response = await fetchPayments(payload)
        if (response) {
          if (response.results) setPayments(response.results)
          setTotalPages(response.totalPages)
        }
      } catch (error) {
        console.error('Error fetching payments:', error)
        setError('Failed to fetch payments. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, filters, itemsPerPage])

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <div className='flex justify-between items-center flex-wrap mb-4'>
          <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
            Payment History
          </h2>
          <div className='flex items-center'>
            <Button
              label='Create new'
              Icon={AiOutlinePlus}
              onClick={() => setIsCreateModalOpen(true)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            ></Button>
            <Button
              label='Filter'
              Icon={AiOutlineFilter}
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md inline-flex items-center'
            ></Button>
          </div>
        </div>
        {isFilterVisible && (
          <div className='relative'>
            <Filter
              onApplyFilter={handleApplyFilter}
              setIsFilterVisible={setIsFilterVisible}
              preFilters={filters}
              fields={fields}
            />
          </div>
        )}
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : (
          <div className='flex flex-col space-y-4 mb-4'>
            {payments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        )}
        {!loading && totalPages > 1 && (
          <div className='px-4 py-2 bg-white border-t'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              name='Payment'
              onLimitChange={onLimitChange}
              disabled={loading}
            />
          </div>
        )}
      </div>
      {/* Add CreatePaymentModal component here when implemented */}
    </div>
  )
}

export default PaymentHistory
