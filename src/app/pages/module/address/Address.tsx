import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {
  Address,
  AddressApiResponse,
  AddressData,
  fetchAddress,
  useCreateAddress,
  useUpdateAddress,
} from 'sr/utils/api/addressApi'
import AddressTable from './AddressTable'
import {AddressDetailsCard} from './AddressDetails'
import {RootState} from 'sr/redux/store'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {FieldsArray} from 'sr/constants/fields'
import {useParams} from 'react-router-dom'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'

interface AddressFilters {
  limit?: number
  page?: number
  individual_id?: string
  no_of_rooms?: number
  no_of_bath?: number
  total_area?: number
  status?: string
}

interface AddressCreatePayload {
  no_of_rooms: number
  no_of_bath: number
  total_area: number
  individual_id: string
  remark: string
  address: Record<string, string | number>
  address_type: string
  status: string
}

interface AddressFormPayload extends Omit<AddressCreatePayload, 'address'> {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
}
interface AddressUpdatePayload extends AddressCreatePayload {
  id: string
}

const Custom: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedData, setSelectedData] = useState<AddressData>()
  const [selectedAddress, setSelectedAddress] = useState<AddressData>()
  const [filters, setFilters] = useState<AddressFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const userData = useSelector((state: RootState) => state.user.userData)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const {fetchUserData} = useActions()
  const createMutation = useCreateAddress()
  const updateMutation = useUpdateAddress()

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
          {name: 'Deleted', id: 'deleted'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
      },
    ],
    [userData]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'individual_id',
        name: userData,
        topLabel: 'Individual',
        placeholder: 'Select Individual',
        labelKey: 'name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'address_type',
        name: [
          {
            name: 'Hotel',
            id: 'hotel',
          },
          {
            name: 'Residencial',
            id: 'Residencial',
          },
          {
            name: 'Commercial',
            id: 'Commercial',
          },
          {
            name: 'Industrial',
            id: 'Industrial',
          },
        ],
        topLabel: 'Address Type',
        placeholder: 'Select Address Type',
        labelKey: 'name',
        required: true,
      },
      {
        type: 'text',
        label: 'Address Line 1',
        name: 'address_line_1',
        placeholder: 'Address Line 1',
        required: true,
      },
      {
        type: 'text',
        label: 'Address Line 2',
        name: 'address_line_2',
        placeholder: 'Address Line 2',
        required: true,
      },
      {
        type: 'text',
        label: 'Country',
        name: 'country',
        placeholder: 'country',
        required: true,
      },
      {
        type: 'text',
        label: 'City',
        name: 'city',
        placeholder: 'City',
        required: true,
      },
      {
        type: 'text',
        label: 'State',
        name: 'state',
        placeholder: 'State',
        required: true,
      },
      {
        type: 'number',
        label: 'Postal Code',
        name: 'postal',
        placeholder: 'Postal Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Rooms Count',
        name: 'no_of_rooms',
        placeholder: 'No. of Rooms',
        required: true,
      },
      {
        type: 'number',
        label: 'Bathrooms Count',
        name: 'no_of_bath',
        placeholder: 'No. of Bathrooms',
        required: true,
      },
      {
        type: 'number',
        label: 'Total Area',
        name: 'total_area',
        placeholder: 'Total Area',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Inactive', id: 'inactive'},
          {name: 'Deleted', id: 'deleted'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        required: true,
      },
      {
        type: 'text',
        label: 'Remarks',
        name: 'remark',
        placeholder: 'Remarks',
        required: true,
      },
    ],
    [userData]
  )

  const {data, isLoading, isError} = useQuery<AddressApiResponse>({
    queryKey: ['address', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchAddress({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
    retry: false,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

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
  const handleCreateAddress = async (payload: AddressFormPayload) => {
    const data: AddressCreatePayload = {
      no_of_rooms: payload.no_of_rooms,
      no_of_bath: payload.no_of_bath,
      total_area: payload.total_area,
      individual_id: payload.individual_id,
      remark: payload.remark,
      address: {
        address_line_1: payload.address_line_1,
        address_line_2: payload.address_line_2,
        country: payload.country,
        city: payload.city,
        state: payload.state,
        postal: payload.postal,
        lat: 0,
        lng: 0,
      },
      address_type: payload.address_type,
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditAddress = async (payload: AddressFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: AddressUpdatePayload = {
      no_of_rooms: payload.no_of_rooms,
      no_of_bath: payload.no_of_bath,
      total_area: payload.total_area,
      individual_id: payload.individual_id,
      remark: payload.remark,
      address: {
        address_line_1: payload.address_line_1,
        address_line_2: payload.address_line_2,
        country: payload.country,
        city: payload.city,
        state: payload.state,
        postal: payload.postal,
        lat: 0,
        lng: 0,
      },
      address_type: payload.address_type,
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: AddressFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      address_line_1: selectedData.address.address_line_1,
      address_line_2: selectedData.address.address_line_2,
      country: selectedData.address.country,
      city: selectedData.address.city,
      state: selectedData.address.state,
      postal: selectedData.address.postal,
      lat: selectedData.address.lat,
      lng: selectedData.address.lng,
      no_of_rooms: selectedData.no_of_rooms,
      no_of_bath: selectedData.no_of_bath,
      total_area: selectedData.total_area,
      individual_id: selectedData.individual_id._id,
      address_type: selectedData.address_type,
      status: selectedData.status,
      remark: selectedData.remark,

      id: selectedData.id,
    }
  }, [selectedData])

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
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label={`${isFilterVisible ? 'Close' : 'Filters'}`}
                Icon={!isFilterVisible ? AiOutlineFilter : AiOutlineClose}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className={`text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center ${
                  isFilterVisible ? 'bg-red-400 hover:bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
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
            <SkeletonTable
              columns={[
                'Address Type',
                'Rooms Count',
                'Bathroom Count',
                'Total Area',
                'Remark',
                'Status',
                'View Address',
              ]}
            />
          ) : (
            <AddressTable
              addressData={data?.data}
              onSelectAddress={setSelectedAddress}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              setSelectedData={setSelectedData}
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
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Address'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          defaultValues={{individual_id: userId}}
          onSubmit={handleCreateAddress}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Address'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={defaultValues}
          onSubmit={handleEditAddress}
        />
      )}
    </>
  )
}

const Addresses: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/address' />
}

export default Addresses
