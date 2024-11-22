import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import axios from 'axios'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import {Button} from 'sr/helpers'
import {createOrder} from 'sr/utils/api/createOrder'

interface CreateOrderModalProps {
  onClose: () => void
  onCreate: (order: any) => void
}

interface CartDetails {
  cartId: string
  productId: string
  qty: number
  amount: number
  cartType: number
}

interface OrderFormInputs {
  cartDetails: CartDetails[]
  deliveryDateTime: string
  payedUserId: string
  receiverUserId: string
  deliveryType: string
  paymentMethod: number
  totalAmount: number
  cardAmount: number
  walletAmount: number
  tax: number
  currency: string
  status: string
  orderType: number
  shipmentId: string
  shippingAmount: number
  price: number
  title: string
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({onClose, onCreate}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<OrderFormInputs>()

  const onSubmit: SubmitHandler<OrderFormInputs> = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const {api_token} = JSON.parse(token || '{}')
      if (!api_token) {
        throw new Error('API token not found')
      }

      const response = await createOrder(data)
      console.log('Res of new order :- ', response)
      // onCreate(response.data)
      onClose()
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  // bankPaymentId

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='mt-2 bg-white rounded-lg shadow-lg w-full max-w-lg relative z-60 overflow-auto max-h-[80vh]'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Create New Order</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <TextField
              type='text'
              label='Cart ID'
              name='cartDetails.0.cartId'
              register={register('cartDetails.0.cartId', {required: 'Cart ID is required'})}
              error={errors.cartDetails?.[0]?.cartId}
              errorText={errors.cartDetails?.[0]?.cartId?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='text'
              label='Product ID'
              name='cartDetails.0.productId'
              register={register('cartDetails.0.productId', {required: 'Product ID is required'})}
              error={errors.cartDetails?.[0]?.productId}
              errorText={errors.cartDetails?.[0]?.productId?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              label='Quantity'
              name='cartDetails.0.qty'
              register={register('cartDetails.0.qty', {required: 'Quantity is required'})}
              error={errors.cartDetails?.[0]?.qty}
              errorText={errors.cartDetails?.[0]?.qty?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              step='0.01'
              label='Amount'
              name='cartDetails.0.amount'
              register={register('cartDetails.0.amount', {required: 'Amount is required'})}
              error={errors.cartDetails?.[0]?.amount}
              errorText={errors.cartDetails?.[0]?.amount?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              label='Cart Type'
              name='cartDetails.0.cartType'
              register={register('cartDetails.0.cartType', {required: 'Cart Type is required'})}
              error={errors.cartDetails?.[0]?.cartType}
              errorText={errors.cartDetails?.[0]?.cartType?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='datetime-local'
              label='Delivery Date Time'
              name='deliveryDateTime'
              register={register('deliveryDateTime', {required: 'Delivery Date Time is required'})}
              error={errors.deliveryDateTime}
              errorText={errors.deliveryDateTime?.message}
              className='w-full p-2 border rounded'
            />
            <TextField
              label='Shipping Amount'
              type='number'
              name='shippingAmount'
              register={register('shippingAmount', {required: 'Shipping Amount is required'})}
              error={errors.shippingAmount}
              errorText={errors.shippingAmount?.message}
              className='w-full p-2 border rounded'
            />
            <TextField
              label='Price'
              type='number'
              name='price'
              register={register('price', {required: 'Price is required'})}
              error={errors.price}
              errorText={errors.price?.message}
              className='w-full p-2 border rounded'
            />
            <TextField
              label='Title'
              type='text'
              name='title'
              register={register('title', {required: 'Title is required'})}
              error={errors.title}
              errorText={errors.title?.message}
              className='w-full p-2 border rounded'
            />
            <TextField
              type='text'
              label='Payed User ID'
              name='payedUserId'
              register={register('payedUserId', {required: 'Payed User ID is required'})}
              error={errors.payedUserId}
              errorText={errors.payedUserId?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='text'
              label='Receiver User ID'
              name='receiverUserId'
              register={register('receiverUserId', {required: 'Receiver User ID is required'})}
              error={errors.receiverUserId}
              errorText={errors.receiverUserId?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='text'
              label='Delivery Type'
              name='deliveryType'
              register={register('deliveryType', {required: 'Delivery Type is required'})}
              error={errors.deliveryType}
              errorText={errors.deliveryType?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              label='Payment Method'
              name='paymentMethod'
              register={register('paymentMethod', {required: 'Payment Method is required'})}
              error={errors.paymentMethod}
              errorText={errors.paymentMethod?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              step='0.01'
              label='Total Amount'
              name='totalAmount'
              register={register('totalAmount', {required: 'Total Amount is required'})}
              error={errors.totalAmount}
              errorText={errors.totalAmount?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              step='0.01'
              label='Card Amount'
              name='cardAmount'
              register={register('cardAmount', {required: 'Card Amount is required'})}
              error={errors.cardAmount}
              errorText={errors.cardAmount?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              step='0.01'
              label='Wallet Amount'
              name='walletAmount'
              register={register('walletAmount', {required: 'Wallet Amount is required'})}
              error={errors.walletAmount}
              errorText={errors.walletAmount?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              step='0.01'
              label='Tax'
              name='tax'
              register={register('tax', {required: 'Tax is required'})}
              error={errors.tax}
              errorText={errors.tax?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='text'
              label='Currency'
              name='currency'
              register={register('currency', {required: 'Currency is required'})}
              error={errors.currency}
              errorText={errors.currency?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='text'
              label='Status'
              name='status'
              register={register('status', {required: 'Status is required'})}
              error={errors.status}
              errorText={errors.status?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='number'
              label='Order Type'
              name='orderType'
              register={register('orderType', {required: 'Order Type is required'})}
              error={errors.orderType}
              errorText={errors.orderType?.message}
              className='w-full p-2 border rounded'
            />

            <TextField
              type='text'
              label='Shipment ID'
              name='shipmentId'
              register={register('shipmentId', {required: 'Shipment ID is required'})}
              error={errors.shipmentId}
              errorText={errors.shipmentId?.message}
              className='w-full p-2 border rounded'
            />

            <div className='flex justify-end mt-4'>
              <button
                type='button'
                onClick={onClose}
                className='bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-4 rounded mr-2'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderModal
