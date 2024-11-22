// src/components/EditProductModal.tsx
import React, {useState} from 'react'
import axios from 'axios'

interface EditProductModalProps {
  product: {
    id: string
    title: string
    skuCode: string
    description: string
    listingPrice: number
    images: string[]
    location?: {
      title: string
    }
    quantity?: number
  }
  onClose: () => void
  onUpdate: (updatedProduct: EditProductModalProps['product']) => void
}

const EditProductModal: React.FC<EditProductModalProps> = ({product, onClose, onUpdate}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setUpdatedProduct({...updatedProduct, [name]: value})
  }

  const handleSave = async () => {
    try {
      console.log('updatedProduct :- ', updatedProduct)
      const response = await axios.patch(
        `https://api.86deadstock.com/v1/86-request/${product.id}`,
        updatedProduct
      )
      onUpdate(response.data)
      onClose()
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/2 relative z-60'>
        <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
        <div className='mb-4'>
          <label className='block text-gray-700'>Title</label>
          <input
            type='text'
            name='title'
            value={updatedProduct.title}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>SKU Code</label>
          <input
            type='text'
            name='skuCode'
            value={updatedProduct.skuCode}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Description</label>
          <textarea
            name='description'
            value={updatedProduct.description}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Listing Price</label>
          <input
            type='number'
            name='listingPrice'
            value={updatedProduct.listingPrice}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
          />
        </div>
        {updatedProduct.location && (
          <div className='mb-4'>
            <label className='block text-gray-700'>Location</label>
            <input
              type='text'
              name='location.title'
              value={updatedProduct.location.title}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            />
          </div>
        )}
        {updatedProduct.quantity !== undefined && (
          <div className='mb-4'>
            <label className='block text-gray-700'>Quantity</label>
            <input
              type='number'
              name='quantity'
              value={updatedProduct.quantity}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            />
          </div>
        )}
        <div className='flex justify-end'>
          <button onClick={onClose} className='bg-gray-400 px-4 py-2 rounded mr-2'>
            Cancel
          </button>
          <button onClick={handleSave} className='bg-blue-500 px-4 py-2 rounded'>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProductModal
