import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {
  ContractorDetails,
  ContractorListPayload,
  fetchContractor,
  useCreateContractor,
  useUpdateContractor,
} from 'sr/utils/api/contractorApi'
import ContractorTable from './ContractorTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'

interface ContractorFormPayload {
  cleaner_id: string
  company_id: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  date_of_birth: string
  status: string
}
interface ContractorCreatePayload extends ContractorFormPayload {}
interface ContractorUpdatePayload extends ContractorFormPayload {
  id: string
}

const Contractor: React.FC = () => {
  const [selectedData, setSelectedData] = useState<ContractorDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<ContractorListPayload>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)

  const cleanerStore = useSelector((state: RootState) => state.cleaner)
  const companyStore = useSelector((state: RootState) => state.company)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCleanerData, fetchCompanyData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateContractor()
  const updateMutation = useUpdateContractor()

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyStore.data,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerStore.data,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
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
        type: 'dropdown',
        label: 'status',
        name: [
          {
            id: 'active',
            status: 'Active',
          },
          {
            id: 'deleted',
            status: 'Deleted',
          },
          {
            id: 'pending_otp',
            status: 'Pending OTP',
          },
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'status',
        valueKey: 'id',
        id: 'id',
      },
    ],
    [cleanerStore.data, companyStore.data]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerStore.data,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyStore.data,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {
            id: 'active',
            status: 'Active',
          },
          {
            id: 'deleted',
            status: 'Deleted',
          },
          {
            id: 'pending_otp',
            status: 'Pending OTP',
          },
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'status',
        valueKey: 'id',
        id: 'id',
      },
    ],
    [cleanerStore.data, companyStore.data]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['contractor', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchContractor({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (cleanerStore.status !== 'succeeded') {
      fetchCleanerData({})
    }
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [cleanerStore, fetchCleanerData, companyStore, fetchCompanyData])
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
  const handleCreateContractor = async (payload: ContractorFormPayload) => {
    const data: ContractorCreatePayload = {
      cleaner_id: payload.cleaner_id,
      company_id: payload.company_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile_number: payload.mobile_number,
      email: payload.email,
      date_of_birth: payload.date_of_birth,
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditContractor = async (payload: ContractorFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: ContractorUpdatePayload = {
      cleaner_id: payload.cleaner_id,
      company_id: payload.company_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile_number: payload.mobile_number,
      email: payload.email,
      date_of_birth: payload.date_of_birth,
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: ContractorFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      cleaner_id: selectedData.cleaner_id?._id,
      company_id: selectedData.company_id?._id,
      first_name: selectedData.first_name,
      last_name: selectedData.last_name,
      mobile_number: selectedData.mobile_number,
      email: selectedData.email || '',
      date_of_birth: (() => {
        const date = new Date(selectedData.date_of_birth)
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      status: selectedData.status,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Contractor
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
              columns={['Name', 'Cleaner', 'Company Id', 'Email', 'DOB', 'Status', 'Actions']}
            />
          ) : (
            <ContractorTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              data={data?.data}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          data?.pagination && (
            <Pagination
              currentPage={currentPage}
              pagination={data.pagination}
              onPageChange={onPageChange}
              name='Contractor'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Contractor'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateContractor}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Contractor'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditContractor}
        />
      )}
    </>
  )
}

export default Contractor
