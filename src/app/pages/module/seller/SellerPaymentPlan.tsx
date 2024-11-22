import React, {useState, useMemo} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {fetchPaymentPlan} from 'sr/utils/api/fetchSellerPaymentPlan'
import SellerPaymentPlanTable from './SellerPaymentPlanTable'
import {deleteSellerPaymentPlan} from 'sr/utils/api/deleteSellerPaymentPlan'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
import {createSellerPaymentPlan} from 'sr/utils/api/createSellerPaymentPlan'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useQuery} from '@tanstack/react-query'
import SkeletonPaymentPlanTable from './SkeletonPaymentPlanTable'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'

// interface sellerPaymentPlanApiResponse {
//   settlementDays?: number
//   convenienceFee?: number
//   planName?: string
//   planDetails?: string
//   createdBy?: UserInterface
//   isActive?: boolean
//   createdAt: string
//   updatedAt: string
//   id: string
// }
interface sellerPaymentPlanFilters {
  planName?: string
  isActive?: boolean
}
interface sellerPaymentPlanPayload {
  planName: string
  planDetails: string
  settlementDays: number
  convenienceFee: number
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<sellerPaymentPlanFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)

  let isActive = [
    {id: true, name: 'Active'},
    {id: false, name: 'Inactive'},
  ]

  const fields: FieldsArray = [
    {
      type: 'dropdown',
      label: 'isActive',
      name: isActive,
      topLabel: 'Status',
      placeholder: 'Select Status',
    },
    {type: 'text', label: 'Plan Name', name: 'planName', placeholder: 'Plan Name'},
  ]
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Plan Name',
        name: 'planName',
        placeholder: 'Plan Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Plan Details',
        name: 'planDetails',
        placeholder: 'Plan Details',
        required: true,
      },
      {
        type: 'number',
        label: 'Settlement Days',
        name: 'settlementDays',
        placeholder: 'Settlement Days',
        required: true,
      },
      {
        type: 'number',
        label: 'Convenience Fee',
        name: 'convenienceFee',
        placeholder: 'Convenience Fee',
        required: true,
      },
    ],
    []
  )
  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['sellerPaymentPlan', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchPaymentPlan({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })

  const onDeleteSellerPaymentPlan = async (id: string) => {
    const res = await deleteSellerPaymentPlan(id)
    if (!res) {
      return
    }
    refetch()
  }
  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: sellerPaymentPlanFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateSellerPaymentPlan = async (payload: sellerPaymentPlanPayload) => {
    setIsCreateModalOpen(false)
    const res = await createSellerPaymentPlan(payload)
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Seller Payment Plans
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
                preFilters={filters || {}}
                fields={fields}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonPaymentPlanTable />
          ) : (
            <SellerPaymentPlanTable data={data?.results} onDelete={onDeleteSellerPaymentPlan} />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
            totalResults={data?.totalResults}
            itemsPerPage={itemsPerPage}
            name='Seller Payment Plan'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Payment Plan'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateSellerPaymentPlan}
        />
      )}
    </>
  )
}
const SellerPaymentPlan: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/seller-payment-plan'}
      ></DashboardWrapper>
    </>
  )
}

export default SellerPaymentPlan
