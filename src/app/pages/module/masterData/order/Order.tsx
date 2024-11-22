import React, {useEffect, useState, useMemo} from 'react'
import {useSelector} from 'react-redux'
import OrderCard from './OrderCard'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import Filter from 'sr/helpers/ui-components/Filter'
import {Button} from 'sr/helpers'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {fetchOrder} from 'sr/utils/api/fetchOrder'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {createOrder} from 'sr/utils/api/createOrder'
import {toast} from 'react-toastify'
import {FieldsArray} from 'sr/constants/fields'
import {async} from 'rxjs'
import {set} from 'react-hook-form'

const Custom: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const {fetchUserData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [totalResults, setTotalResults] = useState(0)
  const [selectedData, setSelectedData] = useState<any>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDataModified, setIsDataModified] = useState(false)

  const orderItemDetailsType = useMemo(
    () => [
      {name: 'Pending', id: 'pending'},
      {name: 'Submitted', id: 'submitted'},
      {name: 'Approved', id: 'approved'},
      {name: 'Rejected', id: 'rejected'},
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
        label: 'orderItemDetailsType',
        name: orderItemDetailsType,
        topLabel: 'OrderItem DetailsType',
        placeholder: 'Select OrderItem DetailsType',
      },
      {type: 'text', label: 'Order ID', name: 'orderId', placeholder: 'Order ID'},
    ],
    [userData?.results, orderItemDetailsType]
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Cart ID', name: 'cartId', placeholder: 'Cart ID', required: true},
      {
        type: 'text',
        label: 'Product ID',
        name: 'productId',
        placeholder: 'Product ID',
        required: true,
      },
      {type: 'text', label: 'Quantity', name: 'qty', placeholder: 'Quantity', required: true},
      {type: 'text', label: 'Amount', name: 'amount', placeholder: 'Amount', required: true},
      {
        type: 'text',
        label: 'Cart Type',
        name: 'cartType',
        placeholder: 'Cart Type',
        required: true,
      },
      {
        type: 'text',
        label: 'Shipment ID',
        name: 'shipmentId',
        placeholder: 'Shipment ID',
        required: true,
      },
      {
        type: 'text',
        label: 'Order Type',
        name: 'orderType',
        placeholder: 'Order Type',
        required: true,
      },
      {type: 'text', label: 'Status', name: 'status', placeholder: 'Status', required: true},
      {type: 'text', label: 'Currency', name: 'currency', placeholder: 'Currency', required: true},
      {type: 'text', label: 'Tax', name: 'tax', placeholder: 'Tax', required: true},
      {
        type: 'text',
        label: 'Wallet Amount',
        name: 'walletAmount',
        placeholder: 'Wallet Amount',
        required: true,
      },
      {
        type: 'text',
        label: 'Card Amount',
        name: 'cardAmount',
        placeholder: 'Card Amount',
        required: true,
      },
      {
        type: 'text',
        label: 'Total Amount',
        name: 'totalAmount',
        placeholder: 'Total Amount',
        required: true,
      },
      {
        type: 'text',
        label: 'Payment Method',
        name: 'paymentMethod',
        placeholder: 'Payment Method',
        required: true,
      },
      {
        type: 'text',
        label: 'Payment Status',
        name: 'paymentStatus',
        placeholder: 'Payment Status',
        required: true,
      },
      {
        type: 'text',
        label: 'Street',
        name: 'street',
        placeholder: 'Street',
        required: true,
      },
      {
        type: 'text',
        label: 'Delivery Type',
        name: 'deliveryType',
        placeholder: 'Delivery Type',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'userId',
        name: userData?.results,
        topLabel: 'User',
        placeholder: 'Select User',
      },
      {
        type: 'dropdown',
        label: 'receiverUserId',
        name: userData?.results,
        topLabel: 'Receiver User ID',
        placeholder: 'Select Receiver',
      },
      {
        type: 'dropdown',
        label: 'payedUserId',
        name: userData?.results,
        topLabel: 'Payer User ID',
        placeholder: 'Select Payer',
      },
      {
        type: 'text',
        label: 'Delivery DateTime',
        name: 'deliveryDateTime',
        placeholder: 'Delivery DateTime',
        required: true,
      },
    ],
    [userData?.results]
  )

  const fetchData = async () => {
    setLoading(true)
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }
      const response = await fetchOrder(payload)
      setOrders(response.results)
      setTotalPages(response.totalPages)
      setTotalResults(response.totalResults)
    } catch (error) {
      // setError('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserDataIfNeeded = () => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, filters, itemsPerPage, isChanged])

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [fetchUserDataIfNeeded])

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

  const handleCreateOrder = async (data: any) => {
    try {
      const formattedData = {
        cartDetails: [
          {
            cartId: data.cartId,
            productId: data.productId,
            qty: data.qty,
            amount: data.amount,
            cartType: data.cartType,
          },
        ],
        deliveryDateTime: data.deliveryDateTime,
        payedUserId: data.payedUserId,
        receiverUserId: data.receiverUserId,
        paymentStatus: data.paymentStatus,
        deliveryType: data.deliveryType,
        shippingAddress: {
          street: data.street,
        },
        userId: data.userId.id,
        paymentMethod: data.paymentMethod,
        totalAmount: data.totalAmount,
        cardAmount: data.cardAmount,
        walletAmount: data.walletAmount,
        tax: data.tax,
        currency: data.currency,
        status: data.status,
        orderType: data.orderType,
        shipmentId: data.shipmentId,
      }
      await createOrder(formattedData)
      setIsChanged(!isChanged)
      toast.success('Order created successfully')
    } catch (e) {
      console.error('Failed to create order', e)
      toast.error('Failed to create order')
    } finally {
      setIsCreateModalOpen(false)
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-6'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Orders</h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              />
              <Button
                label='Filter'
                Icon={AiOutlineFilter}
                onClick={() => setIsFilterVisible((prev) => !prev)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
              />
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
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
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
              name='Order'
              onLimitChange={onLimitChange}
              disabled={loading}
            />
          )}
        </div>
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Order'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateOrder}
        />
      )}
    </>
  )
}

const Orders: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/order' />
}
export default Orders
