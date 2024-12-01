import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'

import {AiOutlineFilter} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {UserInterface} from 'sr/constants/User'

import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {AddressApiResponse, AddressData, fetchAddress} from 'sr/utils/api/addressApi'
import AddressTableSkeleton from './AddressTableSkeleton'
import AddressTable from './AddressTable'
import {updateUser} from 'sr/utils/api/rewardPointPlanApi'

// interface fetchUserResponse {
//   results: UserInterface[]
//   page: number
//   limit: number
//   totalPages: number
//   totalResults: number
// }

interface AddressFilters {
  limit?: number
  page?: number
  individual_id?: string
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedUser, setSelectedUser] = useState<AddressData>()
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState<AddressData>()
  const [filters, setFilters] = useState<AddressFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const {data, error, isLoading, isError, refetch} = useQuery<AddressApiResponse>({
    queryKey: ['address', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchAddress({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
    retry: false,
  })

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
  const handleUpdateUser = async (payload: UserInterface) => {
    setIsUpdateModalOpen(false)
    if (selectedUserForUpdate) {
      const userId = selectedUserForUpdate.id
      const res = await updateUser(userId, payload)
      if (!res) {
        return
      }
      refetch()
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            {!selectedUser && (
              <>
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
              </>
            )}
          </div>
          {isFilterVisible && !selectedUser && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={[]}
              />
            </div>
          )}
          {isLoading ? (
            <AddressTableSkeleton />
          ) : (
            !selectedUser && (
              <AddressTable
                addressData={data?.data}
                onSelectAddress={setSelectedUser}
                setSelectedData={setSelectedUserForUpdate}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
              />
            )
          )}
        </div>
        {isLoading || isError ? (
          <PaginationSkeleton />
        ) : (
          !selectedUser && (
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
          )
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

const Address: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/address' />
}

export default Address
