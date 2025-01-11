import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {RootState} from 'sr/redux/store'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {FieldsArray} from 'sr/constants/fields'
import {useNavigate, useSearchParams} from 'react-router-dom'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {
  BranchApiResponse,
  BranchFilters,
  BranchType,
  fetchBranches,
  useCreateBranch,
  useUpdateBranch,
} from 'sr/utils/api/branchApi'
import BranchTable from './BranchTable'
import {Link} from 'react-router-dom'

interface BranchCreatePayload {
  company_id: string
  branch_name: string
  type: string
  phone_number: string
  isDefaultBranch: boolean
  address: Record<string, any>
  status: string
}

interface BranchFormPayload extends Omit<BranchCreatePayload, 'address'> {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
}
interface BranchUpdatePayload extends BranchCreatePayload {
  id: string
}

const Branch: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const company_id = searchParams.get('company_id')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedData, setSelectedData] = useState<BranchType>()
  const [filters, setFilters] = useState<BranchFilters>({company_id: company_id || ''})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  const createMutation = useCreateBranch()
  const updateMutation = useUpdateBranch()

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyStore.data,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Head Office', id: 'HO'},
          {name: 'SL', id: 'SL'},
          {name: 'RHO', id: 'RHO'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
      },

      {
        type: 'dropdown',
        label: 'status',
        name: [{name: 'Active', id: 'ACTIVE'}],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
      },
      {
        type: 'dropdown',
        label: 'isDefaultBranch',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Is Default Branch',
        placeholder: 'Select Is Default Branch',
        labelKey: 'name',
      },
    ],
    [companyStore.data]
  )
  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyStore.data,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        required: true,
      },
      {
        type: 'text',
        label: 'Branch Name',
        name: 'branch_name',
        placeholder: 'Branch Name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Head Office', id: 'HO'},
          {name: 'SL', id: 'SL'},
          {name: 'RHO', id: 'RHO'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        required: true,
      },
      {
        type: 'text',
        label: 'Phone Number',
        name: 'phone_number',
        placeholder: 'Phone Number',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [{name: 'Active', id: 'ACTIVE'}],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
      },
      {
        type: 'dropdown',
        label: 'isDefaultBranch',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Is Default Branch',
        placeholder: 'Select Is Default Branch',
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
    ],
    [companyStore.data]
  )

  const {data, isLoading, isError} = useQuery<BranchApiResponse>({
    queryKey: ['branch', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchBranches({limit: itemsPerPage, page: currentPage, ...filters}),
    retry: false,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore.status, fetchCompanyData])

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: BranchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateBranch = async (payload: BranchFormPayload) => {
    const data: BranchCreatePayload = {
      company_id: payload.company_id,
      branch_name: payload.branch_name,
      type: payload.type,
      phone_number: payload.phone_number,
      isDefaultBranch: payload.isDefaultBranch,
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
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditBranch = async (payload: BranchFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: BranchUpdatePayload = {
      company_id: payload.company_id,
      branch_name: payload.branch_name,
      type: payload.type,
      phone_number: payload.phone_number,
      isDefaultBranch: payload.isDefaultBranch,
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
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: BranchFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      company_id: selectedData.company_id,
      branch_name: selectedData.branch_name,
      type: selectedData.type,
      phone_number: selectedData.phone_number,
      isDefaultBranch: selectedData.isDefaultBranch || false,
      address_line_1: selectedData.address.address_line_1,
      address_line_2: selectedData.address.address_line_2,
      country: selectedData.address.country,
      city: selectedData.address.city,
      state: selectedData.address.state,
      postal: selectedData.address.postal,
      lat: selectedData.address.lat,
      lng: selectedData.address.lng,
      status: selectedData.status || '',
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <div className='flex items-center mb-2 sm:mb-0'>
              <Button
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                onClick={() => navigate('/company')}
                label={'🡸'}
              />
              <h2 className='text-2xl font-semibold leading-tight ml-1 mb-2 sm:mb-0 sm:mr-4'>
                Company Branch
              </h2>
            </div>

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
              columns={['Branch Name', 'Company', 'Type', 'Default Branch', 'Status', 'Actions']}
            />
          ) : (
            <BranchTable
              data={data?.data}
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
            name='branch'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && company_id && (
        <DynamicModal
          label='Create Branch'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateBranch}
          defaultValues={{company_id}}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Branch'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditBranch}
        />
      )}
    </>
  )
}

export default Branch
