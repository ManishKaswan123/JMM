import React from 'react'
import {useNavigate} from 'react-router-dom'
import {FaEdit, FaTrash} from 'react-icons/fa'
import ProductType from './ProductType'

interface ProductCardProps {
  product: ProductType
  onDelete: (id: string) => void
  setIsUpdateModalOpen: (open: boolean) => void
  setSelectedData: (data: ProductType) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  setIsUpdateModalOpen,
  setSelectedData,
}) => {
  const navigate = useNavigate()

  const handleDelete = () => {
    onDelete(product.id)
  }

  const handleShowDetails = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='mb-2'>
            <strong>Product ID:</strong> {product.id}
          </p>
          <p className='mb-2'>
            <strong>Title:</strong> {product.title}
          </p>
          <p className='mb-2'>
            <strong>SKU Code:</strong> {product.skuCode}
          </p>
          <p className='mb-2'>
            <strong>Price:</strong> ${product?.listingPrice?.toFixed(2)}
          </p>
          <div className='flex items-center'>
            <p
              className={`text-xl font-bold mb-2 ${
                product.isPublished ? 'text-green-500' : 'text-red-500'
              }`}
            >
              Status: {product.isPublished ? 'Published' : 'Unpublished'}
            </p>
          </div>
        </div>
        <div>
          <p className='mb-2'>
            <strong>Created At:</strong> {new Date(product?.createdAt).toLocaleString()}
          </p>
          <p className='mb-2'>
            <strong>Updated At:</strong> {new Date(product?.updatedAt).toLocaleString()}
          </p>
          <p className='mb-2'>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p className='mb-2'>
            <strong>Location:</strong> {product.location?.title ?? 'N/A'}
          </p>
          <div className='flex flex-wrap'>
            {product?.images?.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className='w-12 h-12 object-cover m-1'
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <button onClick={handleShowDetails} className='text-blue-500 hover:underline'>
          Show Details
        </button>
        <div>
          <FaEdit
            className='text-blue-500 cursor-pointer mr-4 h-4 w-4 inline'
            onClick={() => {
              setIsUpdateModalOpen(true)
              setSelectedData(product)
            }}
          />
          <FaTrash className='text-red-500 cursor-pointer h-4 w-4 inline' onClick={handleDelete} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
