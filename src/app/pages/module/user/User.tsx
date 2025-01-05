import React, {useState, useMemo} from 'react'
import UserTable from './UserTable'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {
  fetchIndividual,
  IndividaulApiResponse,
  Individual,
  IndividualFilters,
  useCreateIndividual,
  useUpdateIndividual,
} from 'sr/utils/api/individualApi'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {Address} from 'sr/utils/api/addressApi'

interface IndividualCreatePayload {
  username: string
  email: string
  mobile_number: string
  password: string
  first_name: string
  last_name: string
  status: string
  no_of_rooms: number
  no_of_bath: number
  total_area: number
  remark: string
  address: Omit<Address, '_id'>
}
interface IndividualFormPayload extends Omit<IndividualCreatePayload, 'address'> {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
}
interface IndividualUpdatePayload extends Omit<IndividualCreatePayload, 'password'> {
  id: string
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedUser, setSelectedUser] = useState<Individual>()
  const [filters, setFilters] = useState<IndividualFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const createMutation = useCreateIndividual()
  const updateMutation = useUpdateIndividual()

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Inactive', id: 'inactive'},
          {name: 'Pending', id: 'pending'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
      },
    ],
    []
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
        required: true,
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },
      {
        type: 'text',
        label: 'Phone ',
        name: 'mobile_number',
        placeholder: 'Phone',
        required: true,
      },
      {
        type: 'text',
        label: 'Password ',
        name: 'password',
        placeholder: 'Password',
        required: true,
      },
      {
        type: 'text',
        label: 'First Name',
        name: 'first_name',
        placeholder: 'First Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Last Name',
        name: 'last_name',
        placeholder: 'Last Name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Inactive', id: 'inactive'},
          {name: 'Pending', id: 'pending'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
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
        type: 'text',
        label: 'Remarks',
        name: 'remark',
        placeholder: 'Remarks',
        required: true,
      },
    ],
    []
  )
  const updateFields = useMemo(() => {
    return createFields.filter((field) => field.name !== 'password')
  }, [createFields])

  const {data, isLoading, isError} = useQuery<IndividaulApiResponse>({
    queryKey: ['individual', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchIndividual({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
    retry: false,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: IndividualFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateIndividual = async (payload: IndividualFormPayload) => {
    const data: IndividualCreatePayload = {
      username: payload.username,
      email: payload.email,
      mobile_number: payload.mobile_number,
      password: payload.password,
      first_name: payload.first_name,
      last_name: payload.last_name,
      status: payload.status,
      no_of_rooms: payload.no_of_rooms,
      no_of_bath: payload.no_of_bath,
      total_area: payload.total_area,
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
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditIndividual = async (payload: IndividualFormPayload) => {
    if (!selectedUser) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: IndividualUpdatePayload = {
      username: payload.username,
      email: payload.email,
      mobile_number: payload.mobile_number,
      first_name: payload.first_name,
      last_name: payload.last_name,
      status: payload.status,
      no_of_rooms: payload.no_of_rooms,
      no_of_bath: payload.no_of_bath,
      total_area: payload.total_area,
      remark: payload.remark,
      address: {
        address_line_1: payload.address_line_1,
        address_line_2: payload.address_line_2,
        country: payload.country,
        city: payload.city,
        state: payload.state,
        postal: payload.postal,

        lat: selectedUser.address?.lat || 0,
        lng: selectedUser.address?.lng || 0,
      },
      id: selectedUser.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: Record<string, any> | undefined = useMemo(() => {
    if (!selectedUser) return undefined
    return {
      username: selectedUser.username,
      email: selectedUser.email,
      mobile_number: selectedUser.mobile_number,
      first_name: selectedUser.first_name,
      last_name: selectedUser.last_name,
      status: selectedUser.status,
      address_line_1: selectedUser.address?.address_line_1,
      address_line_2: selectedUser.address?.address_line_2,
      country: selectedUser.address?.country,
      city: selectedUser.address?.city,
      state: selectedUser.address?.state,
      postal: selectedUser.address?.postal,
      no_of_rooms: selectedUser?.no_of_rooms,
      no_of_bath: selectedUser?.no_of_bath,
      total_area: selectedUser?.total_area,
      remark: selectedUser?.remark,
    }
  }, [selectedUser])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight ml-1 mb-2 sm:mb-0 sm:mr-4'>
              Individuals
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
              columns={['User Name', 'Email', 'Phone', 'Status', 'View User', 'Update User']}
            />
          ) : (
            <UserTable
              userData={data?.data}
              onSelectUser={setSelectedUser}
              setSelectedData={setSelectedUser}
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
            name='individual'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Individual'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateIndividual}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Individual'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividual}
        />
      )}
    </>
  )
}

const User: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/individual' />
}

export default User
