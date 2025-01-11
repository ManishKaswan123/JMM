import React, {useCallback, useEffect, useMemo, useState} from 'react'
import TransactionCard from './TransactionsHistoryCard'
import {deleteTransaction, fetchTransactions} from 'sr/utils/api/fetchTransactionsHistory'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {toast} from 'react-toastify'
import {Button} from 'sr/helpers'
import {fetchUser} from 'sr/utils/api/fetchUser'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {updateTransaction} from 'sr/utils/api/updateTransaction'
import {createTransaction} from 'sr/utils/api/createTransaction'
import {FieldsArray} from 'sr/constants/fields'

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [rerender, setRerender] = useState(false)
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const {fetchUserData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isChanged, setisChanged] = useState<any>(false)
  const [selectedData, setSelectedData] = useState<any>(null)
  const [isDataModified, setIsDataModified] = useState(false)

  const transactionType = useMemo(
    () => [
      {name: 'Deposits', id: 'Deposits'},
      {name: 'Transfer', id: 'Transfer'},
      {name: 'Received', id: 'Received'},
    ],
    []
  )
  const transactionMode = useMemo(
    () => [
      {name: 'Stripe', id: 'stripe'},
      {name: 'Wallet', id: 'wallet'},
    ],
    []
  )
  const status = useMemo(
    () => [
      {name: 'Approved', id: 'approved'},
      {name: 'Draft', id: 'draft'},
      {name: 'Success', id: 'success'},
      {name: 'Draft', id: 'draft'},
    ],
    []
  )

  const fields = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        labelKey: 'firstName',
      },
      {
        type: 'dropdown',
        label: 'transactionType',
        name: transactionType,
        topLabel: 'Transaction Type',
        placeholder: 'Select Transaction Type',
      },
      {
        type: 'dropdown',
        label: 'transactionMode',
        name: transactionMode,
        topLabel: 'Transaction Mode',
        placeholder: 'Select Transaction Mode',
      },
      {type: 'text', label: 'Transaction No', name: 'transactionNo', placeholder: 'Transaction No'},
      {
        type: 'dropdown',
        label: 'status',
        name: status,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
    ],
    [userData?.results, transactionType, transactionMode, status]
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
        required: true,
      },
      {type: 'text', label: 'Amount', name: 'amount', placeholder: 'Amount', required: true},
      {type: 'text', label: 'Test', name: 'test', placeholder: 'Test', required: true},
      {
        type: 'text',
        label: 'Transaction No',
        name: 'transactionNo',
        placeholder: 'Transaction No',
        required: true,
      },
      {
        type: 'text',
        label: 'Transaction Mode',
        name: 'transactionMode',
        placeholder: 'Transaction Mode',
        required: true,
      },
      {
        type: 'text',
        label: 'Transaction Type',
        name: 'transactionType',
        placeholder: 'Transaction Type',
        required: true,
      },
      {
        type: 'text',
        label: 'Status',
        name: 'status',
        placeholder: 'Status',
        required: true,
      },
    ],
    []
  )

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }
      const response = await fetchTransactions(payload)
      if (response) {
        if (response.results) setTransactions(response.results)
        setTotalPages(response.totalPages)
        setTotalResults(response.totalResults)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, filters, rerender, itemsPerPage])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
  }, [userStatus])

  useEffect(() => {
    fetchData()
  }, [currentPage, filters, itemsPerPage, isChanged])

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  useEffect(() => {
    setIsDataModified(false)
    if (isUpdateModalOpen && selectedData) {
      let eightSixData = {
        id: selectedData?.id,
        userId: selectedData.userId?.id,
        amount: selectedData.amount,
        transactionNo: selectedData.transactionNo,
        transactionMode: selectedData.transactionMode,
        transactionType: selectedData.transactionType,
        transactionDetails: {
          test: selectedData.test,
        },
        status: selectedData.status,
      }
      setSelectedData(eightSixData)
      setIsDataModified(true)
    }
  }, [isUpdateModalOpen])

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }

  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleCreateTransaction = async (data: any) => {
    try {
      const formattedData = {
        userId: data.userId,
        amount: data.amount,
        transactionNo: data.transactionNo,
        transactionMode: data.transactionMode,
        transactionType: data.transactionType,
        transactionDetails: {
          test: data.test,
        },
        status: data.status,
      }
      await createTransaction(formattedData)
      setisChanged(!isChanged)
      toast.success('Transaction created successfully')
    } catch (e) {
      console.error('Failed to create Transaction', e)
      toast.error('Failed to create Transaction')
    } finally {
      setIsCreateModalOpen(false)
    }
  }

  const handleEditTransaction = async (payload: any) => {
    try {
      const formattedData = {
        userId: payload.userId,
        amount: payload.amount,
        transactionNo: payload.transactionNo,
        transactionMode: payload.transactionMode,
        transactionType: payload.transactionType,
        transactionDetails: {
          test: payload.test,
        },
        status: payload.status,
      }
      await updateTransaction(formattedData, selectedData.id)
      setisChanged(!isChanged)
      toast.success('Transaction updated successfully')
    } catch (e) {
      console.error('Failed to update Transaction', e)
    } finally {
      setIsUpdateModalOpen(false)
    }
  }
  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await deleteTransaction(id)
      setRerender((prev) => !prev)
    } catch (error) {
      console.error('Error deleting transation:', error)
      setError('Failed to delete transaction. Please try again.')
    } finally {
      setLoading(false)
      toast.success('Transaction deleted successfully')
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-6'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Transactions
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label='Filter'
                Icon={AiOutlineFilter}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
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
          ) : (
            <div className='flex flex-col space-y-4 mb-4'>
              {transactions.map((transaction) => (
                <TransactionCard
                  setSelectedData={setSelectedData}
                  setIsUpdateModalOpen={setIsUpdateModalOpen}
                  key={transaction.id}
                  transaction={transaction}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              name='Transaction'
              onLimitChange={onLimitChange}
              disabled={loading}
            />
          )}
        </div>
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Transaction'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateTransaction}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          label='Update Transaction'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={selectedData}
          onSubmit={handleEditTransaction}
        />
      )}
    </>
  )
}

export default TransactionHistory

// This line makes the file a module, not a script
// export {}
