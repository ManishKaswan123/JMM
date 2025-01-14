import React, {useState, useMemo} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import CleanerTable from './CleanerTable'
import {CleanerDetails, CleanerFilters, fetchCleaner} from 'sr/utils/api/fetchCleaner'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {Address} from 'sr/utils/api/addressApi'
import {useCreateCleaner} from 'sr/utils/api/createCleaner'
import {useUpdateCleaner} from 'sr/utils/api/updateCleaner'

interface CleanerCreatePayload {
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  password?: string
  email: string
  date_of_birth: string
  status: string
  address: Omit<Address, '_id'>
}
interface CleanerFormPayload extends Omit<CleanerCreatePayload, 'address'> {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
}
interface CleanerUpdatePayload extends Omit<CleanerCreatePayload, 'password'> {
  id: string
}

const Cleaner: React.FC = () => {
  const [selectedData, setSelectedData] = useState<CleanerDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CleanerFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateCleaner()
  const updateMutation = useUpdateCleaner()

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
        type: 'text',
        label: 'Mobile Number',
        name: 'mobile_number',
        placeholder: 'Mobile Number',
        required: true,
      },
      {
        type: 'text',
        label: 'Password',
        name: 'password',
        placeholder: 'Password',
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
        type: 'date',
        label: 'DOB',
        name: 'date_of_birth',
        placeholder: 'Date of Birth',
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
        type: 'dropdown',
        label: 'status',
        name: [{name: 'Pending OTP', id: 'pending_otp'}],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    []
  )
  const updateFields = useMemo(() => {
    return createFields.filter((field) => field.name !== 'password')
  }, [createFields])

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'status',
        name: [{name: 'Pending OTP', id: 'pending_otp'}],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    []
  )

  const {data, isLoading} = useQuery({
    queryKey: ['cleaner', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchCleaner({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
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
  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const handleCreateCleaner = async (payload: CleanerFormPayload) => {
    const data: CleanerCreatePayload = {
      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile_number: payload.mobile_number,
      password: payload.password,
      email: payload.email,
      date_of_birth: payload.date_of_birth,
      status: payload.status,
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
  const handleEditCleaner = async (payload: CleanerFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CleanerUpdatePayload = {
      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile_number: payload.mobile_number,
      email: payload.email,
      date_of_birth: payload.date_of_birth,
      status: payload.status,

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
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }

  const defaultValues: CleanerFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      username: selectedData.username,
      first_name: selectedData.first_name,
      last_name: selectedData.last_name,
      mobile_number: selectedData.mobile_number,
      email: selectedData.email,
      date_of_birth: (() => {
        const date = new Date(selectedData.date_of_birth)
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      status: selectedData.status,
      address_line_1: selectedData.address?.address_line_1,
      address_line_2: selectedData.address?.address_line_2,
      country: selectedData.address?.country,
      city: selectedData.address?.city,
      state: selectedData.address?.state,
      postal: selectedData.address?.postal,
      lat: selectedData.address?.lat,
      lng: selectedData.address?.lng,
      id: selectedData.id,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Cleaner</h2>
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
              columns={['Username', 'Mobile Number', 'Email', 'Date Of Birth', 'Status', 'Actions']}
            />
          ) : (
            <CleanerTable<CleanerDetails>
              type='cleaner'
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              data={data?.data}
            />
          )}
        </div>
        {isLoading ? (
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
            name='Cleaner'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Cleaner'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateCleaner}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Cleaner'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCleaner}
        />
      )}
    </>
  )
}

export default Cleaner
