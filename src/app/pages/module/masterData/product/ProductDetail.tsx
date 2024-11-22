import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {Button} from 'sr/helpers'
import {fetchSingleProduct} from 'sr/utils/api/fetchProduct'

const ProductDetail: React.FC = () => {
  const {productId} = useParams<{productId: string}>()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) {
        setError('Product ID is undefined')
        setLoading(false)
        return
      }

      try {
        const response = await fetchSingleProduct(productId)
        console.log('Product details:', response.product)
        setProduct(response.product)
      } catch (error) {
        console.error('Error fetching product details:', error)
        setError('Failed to fetch product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [productId])

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
      )
    }
  }

  const onGoBack = () => {
    navigate('/product')
  }

  if (loading) return <Spinner />
  if (error) return <div className='text-red-500'>{error}</div>
  if (!product) return <div>No product found</div>

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <div className='p-4 border-b bg-gray-100'>
          <h1 className='text-3xl font-bold text-center text-gray-700'>
            {product?.title ?? 'N/A'}
          </h1>
        </div>
        <div className='p-4'>
          <div className='flex flex-col items-center'>
            {product?.images?.length > 0 ? (
              <div className='relative w-full max-w-lg'>
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.title} - Image ${currentImageIndex + 1}`}
                  className='w-full h-auto rounded-lg shadow-md'
                />
                <button
                  onClick={prevImage}
                  className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
                >
                  <AiOutlineLeft />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
                >
                  <AiOutlineRight />
                </button>
                <p className='text-center mt-2 text-gray-600'>
                  Image {currentImageIndex + 1} of {product.images.length}
                </p>
              </div>
            ) : (
              <div className='w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg'>
                No Image Available
              </div>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
            <div>
              <p className='text-xl font-semibold mb-2'>
                <span className='font-bold'>SKU:</span> {product?.skuCode ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Description:</span> {product?.description ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Type:</span> {product?.type ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Condition:</span> {product?.condition ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Status:</span> {product?.status ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Original Price:</span> $
                {product?.originalPrice ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Listing Price:</span>{' '}
                <span className='text-green-600'>${product?.listingPrice ?? 'N/A'}</span>
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Quantity:</span> {product?.quantity ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Unit:</span> {product?.unit ?? 'N/A'}
              </p>
              <p className='mb-2'>
                <span className='font-bold'>Country:</span> {product?.countryCode ?? 'N/A'}
              </p>
              <p className='mb-4'>
                <span className='font-bold'>Published:</span> {product?.isPublished ? 'Yes' : 'No'}
              </p>

              <h2 className='text-2xl font-semibold mb-2'>Location</h2>
              <p>
                <span className='font-bold'>Title:</span> {product?.location?.title ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Label:</span> {product?.location?.label ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Type:</span> {product?.location?.type ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Country Code:</span>{' '}
                {product?.location?.countryCode ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Country Name:</span>{' '}
                {product?.location?.countryName ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>State Code:</span>{' '}
                {product?.location?.stateCode ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>State:</span> {product?.location?.state ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>County:</span> {product?.location?.county ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>City:</span> {product?.location?.city ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>District:</span> {product?.location?.district ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Street:</span> {product?.location?.street ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Postal Code:</span>{' '}
                {product?.location?.postalCode ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>House Number:</span>{' '}
                {product?.location?.houseNumber ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Province:</span>{' '}
                {product?.location?.province?.map((prov: any) => prov.name).join(', ') ?? 'N/A'}
              </p>
            </div>

            <div>
              <h2 className='text-2xl font-semibold mb-2'>Shipping Options</h2>
              <p>
                <span className='font-bold'>Weight:</span>{' '}
                {product?.shippingOptions?.weight ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Height:</span>{' '}
                {product?.shippingOptions?.height ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Length:</span>{' '}
                {product?.shippingOptions?.length ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Width:</span> {product?.shippingOptions?.width ?? 'N/A'}
              </p>

              <h2 className='text-2xl font-semibold mt-6 mb-2'>Product Details</h2>
              <p>
                <span className='font-bold'>Product ID:</span> {product?.id ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>User ID:</span> {product?.userId ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Created At:</span>{' '}
                {new Date(product?.createdAt).toLocaleString() ?? 'N/A'}
              </p>
              <p>
                <span className='font-bold'>Updated At:</span>{' '}
                {new Date(product?.updatedAt).toLocaleString() ?? 'N/A'}
              </p>

              <h2 className='text-2xl font-semibold mt-6 mb-2'>Categories</h2>
              <ul className='list-disc pl-6'>
                {product?.category?.map((category: string) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>

              <h2 className='text-2xl font-semibold mt-6 mb-2'>Business Types</h2>
              <ul className='list-disc pl-6'>
                {product?.businessType?.map((type: string) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className='mt-8 flex justify-center'>
            <Button
              label={'Go Back 🡸'}
              onClick={onGoBack}
              className='bg-white text-gray-800 hover:text-gray-900 font-bold py-2 px-4 rounded-full inline-flex items-center mb-2 sm:mb-0 sm:mr-3'

              // disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
