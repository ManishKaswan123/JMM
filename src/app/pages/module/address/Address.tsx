import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {AiOutlineFilter} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {Address, AddressApiResponse, fetchAddress} from 'sr/utils/api/addressApi'
import AddressTableSkeleton from './AddressTableSkeleton'
import AddressTable from './AddressTable'
import {AddressDetailsCard} from './AddressDetails'
import {RootState} from 'sr/redux/store'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {FieldsArray} from 'sr/constants/fields'
import {useParams} from 'react-router-dom'

interface AddressFilters {
  limit?: number
  page?: number
  individual_id?: string
}

const Custom: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>()
  const [filters, setFilters] = useState<AddressFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const userData = useSelector((state: RootState) => state.user.userData)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const {fetchUserData} = useActions()

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'individual_id',
        name: userData,
        topLabel: 'Individual',
        placeholder: 'Select Individual',
        labelKey: 'name',
      },
      {
        type: 'number',
        label: 'Rooms Count',
        name: 'no_of_rooms',
        placeholder: 'No. of Rooms',
      },
      {
        type: 'number',
        label: 'Bathrooms Count',
        name: 'no_of_bath',
        placeholder: 'No. of Bathrooms',
      },
      {
        type: 'number',
        label: 'Total Area',
        name: 'total_area',
        placeholder: 'Total Area',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Inactive', id: 'inactive'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
      },
    ],
    [userData]
  )

  const {data, error, isLoading, isError, refetch} = useQuery<AddressApiResponse>({
    queryKey: ['address', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchAddress({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
    retry: false,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])
  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
  }, [userStatus, fetchUserData])

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: AddressFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  // const handleUpdateUser = async (payload: UserInterface) => {
  //   setIsUpdateModalOpen(false)
  //   if (selectedUserForUpdate) {
  //     const userId = selectedUserForUpdate.id
  //     const res = await updateUser(userId, payload)
  //     if (!res) {
  //       return
  //     }
  //     refetch()
  //   }
  // }

  if (selectedAddress) {
    return (
      <AddressDetailsCard
        address={selectedAddress}
        onGoBack={() => setSelectedAddress(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight ml-1 mb-2 sm:mb-0 sm:mr-4'>
              Address
            </h2>
            <div className='flex items-center'>
              {/* <Button
                    label='Update Reward Point Plan'
                    Icon={AiOutlineReload}
                    onClick={() => {
                      setIsCreateModalOpen(true)
                    }}
                    className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                  ></Button> */}
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
            <AddressTableSkeleton />
          ) : (
            <AddressTable
              addressData={data?.data}
              onSelectAddress={setSelectedAddress}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
            />
          )}
        </div>
        {isLoading || isError ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={
              Math.ceil((data?.pagination?.total || 1) / (data?.pagination?.pageSize || 1)) || 0
            }
            totalResults={data?.pagination?.total}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='address'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {/* {isUpdateModalOpen && selectedUserForUpdate && (
        <DynamicModal
          label='Update Individual'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={selectedUserForUpdate}
          onSubmit={handleUpdateUser}
        />
      )} */}
    </>
  )
}

const Addresses: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/address' />
}

export default Addresses
