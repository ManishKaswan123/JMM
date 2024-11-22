import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import InvitationCouponTable from './InvitationCouponTable'
import {fetchInvitationCoupon} from 'sr/utils/api/fetchInvitationCoupons'
import {deleteInvitationCoupon} from 'sr/utils/api/deleteInvitationCoupon'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
import {createInvitationCoupon} from 'sr/utils/api/createInvitationCoupon'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {formatDate} from 'sr/utils/helper'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import InvitationCouponsSkeleton from './InvitationCodeTableSkeleton'

// interface invitationCodeApiResponse {
//   title?: string
//   descriptions?: string
//   noOfTimeUsed?: number
//   noOfTimeUses?: number
//   code?: string
//   expiryDate?: string
//   createdBy?: UserInterface
//   isActive?: boolean
//   createdAt?: string
//   updatedAt?: string
//   id: string
// }
interface invitationCodeFilters {
  title?: string
  code?: string
  createdBy?: string
  isActive?: boolean
}
interface invitationCodePayload {
  title: string
  descriptions: string
  noOfTimeUses: number
  expiryDate: string
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<invitationCodeFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const {fetchUserData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)

  const isActive = useMemo(
    () => [
      {id: true, name: 'Active'},
      {id: false, name: 'Inactive'},
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'isActive',
        name: isActive,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
      {type: 'text', label: 'Title', name: 'title', placeholder: 'Title'},
      {type: 'text', label: 'Invitation Code', name: 'code', placeholder: 'Code'},
      {
        type: 'dropdown',
        label: 'createdBy',
        name: userData?.results,
        topLabel: 'Created By',
        placeholder: 'Select User',
        labelKey: 'firstName',
      },
    ],
    [userData?.results, isActive]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Title', name: 'title', placeholder: 'Title', required: true},
      {
        type: 'text',
        label: 'Descriptions',
        name: 'descriptions',
        placeholder: 'Descriptions',
        required: true,
      },
      {
        type: 'date',
        label: 'Expiry Date',
        name: 'expiryDate',
        placeholder: 'Expiry Date',
        required: true,
      },
      {
        type: 'number',
        label: 'No of Time Uses',
        name: 'noOfTimeUses',
        placeholder: 'No of Time Uses',
        required: true,
      },
    ],
    []
  )

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['invitationCoupon', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchInvitationCoupon({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
  }, [userStatus, fetchUserData])
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [fetchUserDataIfNeeded])

  const handleApplyFilter = (newFilters: invitationCodeFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const onDeleteInvitationCode = async (id: string) => {
    const res = await deleteInvitationCoupon(id)
    if (!res) {
      return
    }
    refetch()
  }
  const handleCreateInvitationCode = async (payload: invitationCodePayload) => {
    payload = {...payload, expiryDate: formatDate(payload.expiryDate)}
    setIsCreateModalOpen(false)
    const res = await createInvitationCoupon(payload)
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()

    // console.log('payload is :', payload)
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Invitation Coupons
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
            <InvitationCouponsSkeleton />
          ) : (
            <InvitationCouponTable invCoupons={data?.results} onDelete={onDeleteInvitationCode} />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
            totalResults={data?.totalResults || 0}
            itemsPerPage={itemsPerPage}
            name='Invitation Coupon'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Invitation Coupon'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateInvitationCode}
        />
      )}
    </>
  )
}
const InvitationCoupon: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/invitation-coupon'}
      ></DashboardWrapper>
    </>
  )
}

export default InvitationCoupon
