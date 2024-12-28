import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import CompanyTable from './CompanyTable'
import {CompanyFilters, CompanyResponse, fetchCompany} from 'sr/utils/api/fetchCompany'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useCreateCompany} from 'sr/utils/api/createCompany'
import {useUpdateCompany} from 'sr/utils/api/updateCompany'

interface CompanyCreatePayload {
  username: string
  password: string
  email: string
  mobile_number: string
  company_name: string
  business_type: string[]
  intent: string[]
  candidate_msg: boolean
  status?: string
}
interface CompanyUpdatePayload extends Omit<CompanyCreatePayload, 'password'> {
  id: string
}
const Custom: React.FC = () => {
  const [selectedData, setSelectedData] = useState<CompanyResponse>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<CompanyFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const businessData = useSelector((state: RootState) => state.businessType.data)
  const businessStatus = useSelector((state: RootState) => state.businessType.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchBusinessTypeData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateCompany()
  const updateMutation = useUpdateCompany()

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
        type: 'text',
        label: 'Mobile',
        name: 'mobile_number',
        placeholder: 'Mobile',
        required: true,
      },
      {
        type: 'text',
        label: 'Company Name',
        name: 'company_name',
        placeholder: 'Company Name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'business_type',
        name: businessData,
        topLabel: 'Business Type',
        placeholder: 'Select Business Type',
        labelKey: 'type',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'intent',
        name: [
          {name: 'Hiring', id: 'Hiring'},
          {name: 'Subcontract', id: 'Subcontract'},
          {name: 'Scheduling', id: 'Scheduling'},
          {name: 'Bidding', id: 'Bidding'},
        ],
        topLabel: 'Intent',
        placeholder: 'Select Intent',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'candidate_msg',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Candidate Msg',
        placeholder: 'Select Candidate Msg',
        labelKey: 'name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Pending Otp', id: 'pending_otp'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [businessData]
  )
  const updateFields = useMemo(() => {
    return createFields.filter((field) => field.name !== 'password')
  }, [createFields])
  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'business_type',
        name: businessData,
        topLabel: 'Business Type',
        placeholder: 'Select Business Type',
        labelKey: 'id',
        valueKey: 'type',
      },
      {
        type: 'dropdown',
        label: 'intent',
        name: [
          {name: 'Hiring', id: 'Hiring'},
          {name: 'Subcontract', id: 'Subcontract'},
          {name: 'Scheduling', id: 'Scheduling'},
          {name: 'Bidding', id: 'Bidding'},
        ],
        topLabel: 'Intent',
        placeholder: 'Select Intent',
      },

      {
        type: 'dropdown',
        label: 'candidate_msg',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Candidate Msg',
        placeholder: 'Select Candidate Msg',
      },

      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Pending Otp', id: 'pending_otp'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [businessData]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['company', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchCompany({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  const fetchDataIfNeeded = useCallback(() => {
    if (businessStatus !== 'succeeded') {
      fetchBusinessTypeData({})
    }
  }, [businessStatus, fetchBusinessTypeData])

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }
  const handleApplyFilter = (newFilters: CompanyFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const handleCreateCompany = async (payload: Record<string, any>) => {
    const data: CompanyCreatePayload = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      mobile_number: payload.mobile_number,
      company_name: payload.company_name,
      business_type: [payload.business_type],
      intent: [payload.intent],
      candidate_msg: payload.candidate_msg,
    }
    if (payload.status) data.status = payload.status
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditCompany = async (payload: Record<string, any>) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: CompanyUpdatePayload = {
      username: payload.username,
      email: payload.email,
      mobile_number: payload.mobile_number,
      company_name: payload.company_name,
      business_type: [payload.business_type],
      intent: [payload.intent],
      candidate_msg: payload.candidate_msg,
      id: selectedData.id,
    }
    if (payload.status) data.status = payload.status
    // console.log(data)
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: Record<string, any> | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      username: selectedData.username,
      email: selectedData.email,
      mobile_number: selectedData.mobile_number,
      company_name: selectedData.company_name,
      business_type: selectedData.business_type[0],
      intent: selectedData.intent[0],
      candidate_msg: selectedData.candidate_msg,
      status: selectedData.status,
      id: selectedData.id,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Company</h2>
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
                'Name',
                'Username',
                'Email',
                'Mobile Number',
                'Business Type',
                'Intent',
                'Status',
                'Actions',
              ]}
            />
          ) : (
            <CompanyTable
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
            name='company'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Company'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateCompany}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Company'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCompany}
        />
      )}
    </>
  )
}
const Company: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/chat'}></DashboardWrapper>
    </>
  )
}

export default Company
