import React, {useState, useMemo, useCallback, useEffect} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'

import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'

import {useParams} from 'react-router-dom'
import HiredetailsTable from './HiredetailsTable'
import {
  ContractorHiredetailsDetails,
  ContractorHiredetailsListPayload,
  fetchContractorHiredetails,
  useCreateContractorHiredetails,
  useUpdateContractorHiredetails,
} from 'sr/utils/api/contractorHiredetailsApi'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {employmentTypes} from 'sr/constants/jobsConstants'
import {HiredetailsDetailsCard} from './HiredetailsDetails'

interface HiredetailsFormPayload {
  company_id: string
  destination: string
  joining_date: string
  employment_type: string
  rate: number
}
interface HiredetailsCreatePayload extends HiredetailsFormPayload {
  contractor_id: string
}
interface HiredetailsUpdatePayload extends HiredetailsCreatePayload {
  id: string
}

const HiredetailsCard: React.FC = () => {
  const {contractor_id} = useParams<{contractor_id: string | undefined}>()
  const [selectedData, setSelectedData] = useState<ContractorHiredetailsDetails>()
  const [selectedHiredetail, setSelectedHiredetail] = useState<ContractorHiredetailsDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<ContractorHiredetailsListPayload>({contractor_id})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateContractorHiredetails()
  const updateMutation = useUpdateContractorHiredetails()

  const createAndUpdateFields: FieldsArray = useMemo(
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
        type: 'text',
        label: 'Destination',
        name: 'destination',
        placeholder: 'Destination',
        required: true,
      },
      {
        type: 'date',
        label: 'Joining Date',
        name: 'joining_date',
        placeholder: 'Joining Date',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'employment_type',
        name: employmentTypes,
        topLabel: 'Employment Type',
        placeholder: 'Select Employment Type',
        labelKey: 'label',
        valueKey: 'value',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Rate',
        name: 'rate',
        placeholder: 'Rate in $',
        required: true,
      },
    ],
    [companyStore.data]
  )

  const fields: FieldsArray = useMemo(
    () => [
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
        type: 'multi',
        options: employmentTypes,
        label: 'employment_type',
        name: 'Employment type',
        placeholder: 'Select Employment Type',
      },
      {
        type: 'text',
        label: 'Rate',
        name: 'rate',
        placeholder: 'Rate in $',
        required: true,
      },
    ],
    [companyStore.data]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['contractorHiredetails', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchContractorHiredetails({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore, fetchCompanyData])
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

  const handleCreateHiredetails = async (payload: HiredetailsFormPayload) => {
    const data: HiredetailsCreatePayload = {
      contractor_id: contractor_id || '',
      company_id: payload.company_id,
      destination: payload.destination,
      joining_date: payload.joining_date,
      employment_type: payload.employment_type,
      rate: payload.rate,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditHiredetails = async (payload: HiredetailsUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: HiredetailsUpdatePayload = {
      contractor_id: contractor_id || '',
      company_id: payload.company_id,
      destination: payload.destination,
      joining_date: payload.joining_date,
      employment_type: payload.employment_type,
      rate: payload.rate,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: HiredetailsFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      joining_date: (() => {
        const date = new Date(selectedData.joining_date || '')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      company_id: selectedData.company_id?._id || '',
      destination: selectedData.destination || '',
      employment_type: selectedData.employment_type || '',
      rate: selectedData.rate || 0,
    }
  }, [selectedData])
  if (selectedHiredetail) {
    return (
      <HiredetailsDetailsCard
        data={selectedHiredetail}
        onGoBack={() => setSelectedHiredetail(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Contractor Hire Details
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
                handleClearFilter={() => {
                  handleApplyFilter({
                    contractor_id: contractor_id,
                  })
                }}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={['Contractor', 'Company', 'Employment Type', 'Rate', 'Actions']}
            />
          ) : (
            <HiredetailsTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectHiredetails={setSelectedHiredetail}
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
              name='Hiredetails'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Hire Details'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateHiredetails}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Hire Details'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditHiredetails}
        />
      )}
    </>
  )
}

export default HiredetailsCard
