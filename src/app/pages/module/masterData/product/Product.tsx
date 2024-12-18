import React, {useCallback, useEffect, useMemo, useState} from 'react'
import ProductCard from './ProductCard'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {deleteProduct, fetchProduct} from 'sr/utils/api/fetchProduct'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import Filter from '../../../../../sr/helpers/ui-components/Filter'
import {toast} from 'react-toastify'
import {Button} from 'sr/helpers'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {createProduct} from 'sr/utils/api/createProduct'
import {SubmitHandler, useForm} from 'react-hook-form'
import {updateProduct} from 'sr/utils/api/updateProduct'
import ProductType from './ProductType'

interface ProductFormValues {
  title: string
  type: string
  category: string
  hashtags: string
  businessType: string
  condition: string
  isPublished: boolean
  userId: string
  status: string
  coordinates: [number, number]
  countryCode: string
}

const Custom: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [rerender, setRerender] = useState(false)
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const businessTypeData = useSelector((state: RootState) => state.businessType.data)
  const businessTypeStatus = useSelector((state: RootState) => state.businessType.status)
  const categoryData = useSelector((state: RootState) => state.categoryType.data)
  const categoryStatus = useSelector((state: RootState) => state.categoryType.status)
  const {fetchUserData, fetchCategoryType} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [selectedData, setSelectedData] = useState<ProductType>()
  const [isDataModified, setIsDataModified] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const hashtags = useMemo(
    () => [
      {name: '1', id: '1'},
      {name: '2', id: '2'},
      {name: '3', id: '3'},
    ],
    []
  )
  const status = useMemo(
    () => [
      {name: 'Active', id: 'Active'},
      {name: 'Pending', id: 'Pending'},
      {name: 'Sold', id: 'Sold'},
      {name: 'Draft', id: 'Draft'},
      {name: '1', id: '1'},
      {name: '2', id: '2'},
      {name: '3', id: '3'},
      {name: '4', id: '4'},
    ],
    []
  )

  const condition = useMemo(
    () => [
      {name: '0', id: '0'},
      {name: '1', id: '1'},
      {name: '2', id: '2'},
      {name: '3', id: '3'},
    ],
    []
  )

  const type = useMemo(
    () => [
      {name: '1', id: 1},
      {name: '2', id: 2},
    ],
    []
  )

  const isPublished = useMemo(
    () => [
      {id: true, name: 'Yes'},
      {id: false, name: 'No'},
    ],
    []
  )

  const createStatus = useMemo(
    () => [
      {name: '1', id: '1'},
      {name: '2', id: '2'},
      {name: '3', id: '3'},
    ],
    []
  )
  const fields = useMemo(
    () => [
      {
        type: 'text',
        label: 'Title',
        name: 'title',
        topLabel: 'Title',
        placeholder: 'Title',
      },
      {type: 'dropdown', label: 'type', name: type, topLabel: 'Type', placeholder: 'Select type'},
      {
        type: 'dropdown',
        label: 'category',
        name: categoryData?.results,
        topLabel: 'Category',
        placeholder: 'Select Category',
      },
      {
        type: 'dropdown',
        label: 'hashtags',
        name: hashtags,
        topLabel: 'Hashtags',
        placeholder: 'Select Hashtags',
      },

      {
        type: 'dropdown',
        label: 'condition',
        name: condition,
        topLabel: 'Condition',
        placeholder: 'Select Condition',
      },
      {
        type: 'dropdown',
        label: 'isPublished',
        name: isPublished,
        topLabel: 'Published',
        placeholder: 'Select Published',
      },
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
        label: 'status',
        name: status,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
    ],
    [userData?.results, categoryData?.results]
  )

  const createFields = useMemo(
    () => [
      {
        type: 'text',
        label: 'SKU Code',
        name: 'skuCode',
        topLabel: 'SKU Code',
        placeholder: 'SKU Code',
      },
      {
        type: 'text',
        label: 'Title',
        name: 'title',
        topLabel: 'Title',
        placeholder: 'Title',
      },
      {
        type: 'text',
        label: 'Description',
        name: 'description',
        topLabel: 'Description',
        placeholder: 'Description',
      },
      {
        type: 'text',
        label: 'Country Code',
        name: 'countryCode',
        topLabel: 'Country Code',
        placeholder: 'Country Code',
      },
      {type: 'dropdown', label: 'type', name: type, topLabel: 'Type', placeholder: 'Select type'},
      {
        type: 'dropdown',
        label: 'condition',
        name: condition,
        topLabel: 'Condition',
        placeholder: 'Select Condition',
      },
      {
        type: 'text',
        label: 'Original Price',
        name: 'originalPrice',
        topLabel: 'Original Price',
        placeholder: 'Original Price',
      },
      {
        type: 'text',
        label: 'Listing Price',
        name: 'listingPrice',
        topLabel: 'Listing Price',
        placeholder: 'Listing Price',
      },
      {
        type: 'text',
        label: 'Quantity',
        name: 'quantity',
        topLabel: 'Quantity',
        placeholder: 'Quantity',
      },
      {
        type: 'text',
        label: 'Unit',
        name: 'unit',
        topLabel: 'Unit',
        placeholder: 'Unit',
      },
      {
        type: 'checkbox',
        label: 'Is Published',
        name: 'isPublished',
      },

      {
        type: 'dropdown',
        label: 'hashtags',
        name: hashtags,
        topLabel: 'Hashtags',
        placeholder: 'Select Hashtags',
      },
      {
        type: 'dropdown',
        label: 'category',
        name: categoryData?.results,
        topLabel: 'Category',
        placeholder: 'Select Category',
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
        label: 'status',
        name: status,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },

      {
        type: 'file',
        label: 'Images',
        name: 'images',
        wrapperLabel: 'Upload image',
        topLabel: 'Images',
        placeholder: 'Select Images',
      },
    ],
    [userData?.results, categoryData?.results]
  )

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }
      const response = await fetchProduct(payload)
      if (response) {
        if (response.results) {
          setProducts(response.results)
          setTotalPages(response.totalPages)
          setTotalResults(response.totalResults)
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to fetch products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [currentPage, filters, itemsPerPage, rerender])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }

    if (categoryStatus !== 'succeeded') {
      fetchCategoryType({})
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [currentPage, filters, rerender, itemsPerPage])

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  useEffect(() => {
    try {
      setIsDataModified(false)

      if (isUpdateModalOpen && selectedData) {
        let productData = {
          id: selectedData?.id ?? '',
          skuCode: selectedData?.skuCode ?? '',
          title: selectedData?.title ?? '',
          description: selectedData?.description ?? '',
          countryCode: selectedData?.countryCode ?? '',
          type: selectedData?.type ?? 0,
          condition: selectedData?.condition ?? 0,
          originalPrice: selectedData?.originalPrice ?? 0,
          listingPrice: selectedData?.listingPrice ?? 0,
          quantity: selectedData?.quantity ?? 0,
          unit: selectedData?.unit ?? '',
          businessType: selectedData?.businessType ?? [],
          hashtags: selectedData?.hashtags ?? [],
          category: selectedData?.category ?? [],
          images: Array.isArray(selectedData?.images) ? [...selectedData.images] : [],
          isPublished: selectedData?.isPublished ?? false,
          userId: selectedData?.userId ?? '',
          status: selectedData?.status ?? '',
          createdAt: selectedData?.createdAt ?? '',
          updatedAt: selectedData?.updatedAt ?? '',
        }

        setSelectedData(productData)
        setIsDataModified(true)
      }
    } catch (error) {
      console.error('Error processing selected data:', error)
    }
  }, [isUpdateModalOpen, selectedData])

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }

  const onPageChange = async (pageNumber: number) => {
    // setLoading(true)
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await deleteProduct(id)
      setRerender((prev) => !prev)
    } catch (error) {
      console.error('Error deleting product:', error)
      setError('Failed to delete product. Please try again.')
    } finally {
      setLoading(false)
      toast.success('Product deleted successfully')
    }
  }

  const handleCreateProduct = async (data: any) => {
    try {
      let productData = {
        skuCode: data?.skuCode || '',
        title: data?.title || '',
        description: data?.description || '',
        condition: data?.condition || 1,
        originalPrice: data?.originalPrice || 100,
        listingPrice: data?.listingPrice || 200,
        // currency: data.currency,
        // taxes: data.taxes,
        quantity: data?.quantity || 10,
        unit: data?.unit || '',

        images: data.imagePath ? [data.imagePath] : [],
        // shippingOptions: data.shippingOptions,
        isPublished: data?.isPublished || false,
        userId: data?.userId || '',
        // timeframe: data.timeframe,
        // tradeBuy: data.tradeBuy,
        // willingToPay: data.willingToPay,
        status: data?.status || '',
        location: {
          coordinates: [],
          type: data?.type || '',
        },
        countryCode: data?.countryCode || '',
      }
      await createProduct(productData)
      setIsCreateModalOpen(false)
    } catch (e) {
      console.error('Failed to create product', e)
    }
  }

  const handleEditProduct = async (payload: any) => {
    try {
      const formattedData = {
        skuCode: payload?.skuCode || '',
        title: payload?.title || '',
        description: payload?.description || '',
        condition: payload?.condition || 1,
        originalPrice: payload?.originalPrice || 100,
        listingPrice: payload?.listingPrice || 200,
        // currency: payload.currency,
        // taxes: payload.taxes,
        quantity: payload?.quantity || 10,
        unit: payload?.unit || '',

        images: payload?.imagePath ? [payload?.imagePath] : [],
        // shippingOptions: data.shippingOptions,
        isPublished: payload?.isPublished || false,
        userId: payload?.userId || '',
        // timeframe: data.timeframe,
        // tradeBuy: data.tradeBuy,
        // willingToPay: data.willingToPay,
        status: payload?.status || '',
        location: {
          coordinates: [],
          type: payload?.type || '',
        },
        countryCode: payload?.countryCode || '',
      }
      if (selectedData?.id) await updateProduct(formattedData, selectedData?.id)
      setRerender((prev) => !prev)
      toast.success('Product updated successfully')
    } catch (e) {
      console.error('Failed to update Product', e)
    } finally {
      setIsUpdateModalOpen(false)
    }
  }
  console.log('hello from product')

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-6'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Products</h2>
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
                onClick={() => {
                  setIsFilterVisible(!isFilterVisible)
                }}
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
          ) : error ? (
            <div className='text-red-500'>{error}</div>
          ) : (
            <div className='flex flex-col space-y-4 mb-4'>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  setSelectedData={setSelectedData}
                  setIsUpdateModalOpen={setIsUpdateModalOpen}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              name='Product'
              onLimitChange={onLimitChange}
              disabled={loading}
              totalResults={totalResults}
            />
          )}
        </div>
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          imageType='images'
          label='Create New Product'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateProduct}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          imageType='images'
          label='Update Product'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={selectedData}
          onSubmit={handleEditProduct}
        />
      )}
    </>
  )
}
const Products: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/products' />
}

export default Products
