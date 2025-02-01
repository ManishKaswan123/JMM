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
import ContractorJobtypeTable from './ContractorJobtypeTable'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {
  ContractorJobtypeDetails,
  ContractorJobtypeListPayload,
  fetchContractorJobtype,
  useCreateContractorJobtype,
  useUpdateContractorJobtype,
} from 'sr/utils/api/contractorJobtypeApi'
import {ContractorJobtypeDetailsCard} from './ContractorJobtypeDetails'
import {jobTypes} from 'sr/constants/jobsConstants'

interface ContractorJobtypeFormPayload {
  company_id: string
  job_type: string
  additional_information: string

  rate: string
}
interface ContractorJobtypeCreatePayload extends ContractorJobtypeFormPayload {
  contractor_id: string
}
interface ContractorJobtypeUpdatePayload extends ContractorJobtypeCreatePayload {
  id: string
}

const ContractorJobtypeCard: React.FC = () => {
  const {contractor_id} = useParams<{contractor_id: string | undefined}>()
  const [selectedData, setSelectedData] = useState<ContractorJobtypeDetails>()
  const [selectedJobtype, setSelectedJobtype] = useState<ContractorJobtypeDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<ContractorJobtypeListPayload>({contractor_id})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateContractorJobtype()
  const updateMutation = useUpdateContractorJobtype()

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
        type: 'dropdown',
        label: 'job_type',
        name: jobTypes,
        topLabel: 'Job Type',
        placeholder: 'Select Job Type',
        labelKey: 'label',
        valueKey: 'value',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Additional Info',
        name: 'additional_information',
        placeholder: 'Additional Info',
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
        options: jobTypes,
        label: 'job_type',
        name: 'Job Type',
        placeholder: 'Select Employment Type',
      },
      {
        type: 'text',
        label: 'Rate',
        name: 'rate',
        placeholder: 'Rate in $',
      },
    ],
    [companyStore.data]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['contractorJobtype', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchContractorJobtype({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateContractorJobtype = async (payload: ContractorJobtypeFormPayload) => {
    const data: ContractorJobtypeCreatePayload = {
      contractor_id: contractor_id || '',
      company_id: payload.company_id,
      job_type: payload.job_type,
      additional_information: payload.additional_information,
      rate: payload.rate,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditContractorJobtype = async (payload: ContractorJobtypeUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: ContractorJobtypeUpdatePayload = {
      id: selectedData.id,
      contractor_id: contractor_id || '',
      company_id: payload.company_id,
      job_type: payload.job_type,
      additional_information: payload.additional_information,
      rate: payload.rate,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: ContractorJobtypeFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      company_id: selectedData.company_id?._id || '',
      job_type: selectedData.job_type || '',
      additional_information: selectedData.additional_information || '',
      rate: selectedData.rate || '',
    }
  }, [selectedData])
  if (selectedJobtype) {
    return (
      <ContractorJobtypeDetailsCard
        data={selectedJobtype}
        onGoBack={() => setSelectedJobtype(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Contractor Job Type
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
            <SkeletonTable columns={['Contractor', 'Company', 'Job Type', 'Rate', 'Actions']} />
          ) : (
            <ContractorJobtypeTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectContractorJobtype={setSelectedJobtype}
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
              name='ContractorJobtype'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Job Type'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateContractorJobtype}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Job Type'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditContractorJobtype}
        />
      )}
    </>
  )
}

export default ContractorJobtypeCard
