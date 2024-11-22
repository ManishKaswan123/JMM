import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import {createProduct} from 'sr/utils/api/createProduct'
import {Button} from 'sr/helpers'

interface ProductFormValues {
  title: string
  description: string
  businessType: string[]
  category: string[]
  hashtags: string[]
  coordinates: number[]
  images: string[]
  isPublished: boolean
  quantity: string
  userId: string
  timeframe: string
  isWillingToPay: boolean
  countryCode: string
  delivery: number
  radius: number
  status: string
}

interface CreateProductModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const businessTypes = [
  {id: '6525a2c303a711a27d3887d5', name: 'Business Type 1'},
  {id: '6525a2da03a711a27d3887d7', name: 'Business Type 2'},
]

const categories = [
  {id: '652592b503a711a27d388796', name: 'Category 1'},
  {id: '652592e503a711a27d38879c', name: 'Category 2'},
]

const userID = [
  {id: '652592b503a711a27d388796', name: 'Category 1'},
  {id: '652592e503a711a27d38879c', name: 'Category 2'},
]
const hashtags = [{id: '652592b503a711a27d388796', name: 'Hashtag 1'}]

const CreateProductModal: React.FC<CreateProductModalProps> = ({isOpen, onRequestClose}) => {
  const {register, handleSubmit, reset} = useForm<ProductFormValues>()

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      await createProduct({
        ...data,
        location: {
          coordinates: data.coordinates,
          type: 'Point',
        },
        address: {
          countryCode: data.countryCode,
        },
      })
      reset()
      onRequestClose()
    } catch (e) {
      console.error('Failed to create product', e)
    }
  }

  if (!isOpen) return null

  return (
    <div className='z-100 bg-slate-300 h-full w-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-full md:w-2/3 md:p-4 lg:w-3/4 xl:w-1/2 lg:p-4 xl:p-4'>
        <div className='rounded-lg bg-[#F7F7F7] px-4 py-2 w-full'>
          <div className='flex justify-center font-bold text-xl md:text-2xl pt-1'>
            Create Product
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type='text'
              label='Title'
              required={true}
              id='title'
              name='title'
              register={register('title')}
              placeholder='Title'
              errorText='Please enter Title'
            />
            <TextField
              type='text'
              label='Description'
              required={true}
              id='description'
              name='description'
              register={register('description')}
              placeholder='Description'
              errorText='Please enter Description'
            />
            <DropdownField
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              labelStyle='style2'
              data={businessTypes}
              labelKey='name'
              label={'Business Type'}
              placeholder={'Business Type'}
              valueKey='id'
              name='businessType'
              register={register('businessType')}
            />
            <DropdownField
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              labelStyle='style2'
              data={categories}
              labelKey='name'
              label={'Category'}
              placeholder={'Category'}
              valueKey='id'
              name='category'
              register={register('category')}
            />
            <DropdownField
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              labelStyle='style2'
              data={hashtags}
              labelKey='name'
              label={'Hashtags'}
              placeholder={'Hashtags'}
              valueKey='id'
              name='hashtags'
              register={register('hashtags')}
            />
            <TextField
              type='text'
              label='Coordinates'
              required={true}
              id='coordinates'
              name='coordinates'
              register={register('coordinates')}
              placeholder='Coordinates'
              errorText='Please enter Coordinates'
            />
            <TextField
              type='text'
              label='Images'
              required={true}
              id='images'
              name='images'
              register={register('images')}
              placeholder='Images'
              errorText='Please Add Images'
            />
            <TextField
              type='text'
              label='Quantity'
              required={true}
              id='quantity'
              name='quantity'
              register={register('quantity')}
              placeholder='Quantity'
              errorText='Please Enter Quantity'
            />
            <DropdownField
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              labelStyle='style2'
              data={userID}
              labelKey='name'
              label={'User ID'}
              placeholder={'User ID'}
              valueKey='id'
              name='userId'
              register={register('userId')}
            />
            <TextField
              type='text'
              label='Timeframe'
              required={true}
              id='timeframe'
              name='timeframe'
              register={register('timeframe')}
              placeholder='Timeframe'
              errorText='Please Enter Timeframe'
            />
            <TextField
              type='text'
              label='Country Code'
              required={true}
              id='countryCode'
              name='countryCode'
              register={register('countryCode')}
              placeholder='Country Code'
              errorText='Please Enter Country Code'
            />
            <TextField
              type='number'
              label='Delivery'
              required={true}
              id='delivery'
              name='delivery'
              register={register('delivery')}
              placeholder='Delivery'
              errorText='Please Enter Delivery'
            />
            <TextField
              type='number'
              label='Radius'
              required={true}
              id='radius'
              name='radius'
              register={register('radius')}
              placeholder='Radius'
              errorText='Please Enter Radius'
            />
            <DropdownField
              className=' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
              labelStyle='style2'
              data={[
                {id: '1', name: 'Published'},
                {id: '2', name: 'Draft'},
                {id: '3', name: 'Pending'},
                {id: '4', name: 'Sold'},
              ]}
              labelKey='name'
              label={'Status'}
              placeholder={'Status'}
              valueKey='id'
              name='status'
              register={register('status')}
            />
            <div className='flex flex-column justify-around'>
              <Button
                onClick={onRequestClose}
                label='Cancel'
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              />
              <Button
                type='submit'
                label='Save'
                className='bg-green-300 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductModal
