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
import ProposalDetailsTable from './ProposalDetailsTable'
import {
  fetchProposalDetails,
  ProposalDetails,
  ProposalDetailsFilters,
  useCreateProposalDetails,
  useUpdateProposalDetails,
} from 'sr/utils/api/proposalDetailsApi'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useParams} from 'react-router-dom'

interface ProposalDetailsFormPayload {
  cleaner_id: string
  descrption: string
  expected_rate: string
}
interface ProposalDetailsCreatePyload extends ProposalDetailsFormPayload {}
interface ProposalDetailsUpdatePayload extends ProposalDetailsFormPayload {
  id: string
}

const CleanerProposalDetails: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string}>()
  const [selectedData, setSelectedData] = useState<ProposalDetails>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<ProposalDetailsFilters>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const cleanerData = useSelector((state: RootState) => state.cleaner.data)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCleanerData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateProposalDetails()
  const updateMutation = useUpdateProposalDetails()

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerData,
        topLabel: 'Cleaner',
        placeholder: 'Select cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
        required: true,
      },

      {
        type: 'text',
        label: 'Expected Rate',
        name: 'expected_rate',
        placeholder: 'Expected Rate',
        required: true,
      },
      {
        type: 'text',
        label: 'Description',
        name: 'descrption',
        placeholder: 'Description',
        required: true,
      },
    ],
    [cleanerData]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerData,
        topLabel: 'Cleaner',
        placeholder: 'Select Cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
      },

      {type: 'text', label: 'Expected Rate', name: 'expected_rate', placeholder: 'Expected Rate'},
    ],
    [cleanerData]
  )

  const {data, isLoading} = useQuery({
    queryKey: ['proposalDetails', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchProposalDetails({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])
  useEffect(() => {
    if (cleanerId === undefined) {
      const {cleaner_id, ...rest} = filters
      setFilters(rest)
    }
  }, [cleanerId])
  const fetchUserDataIfNeeded = useCallback(() => {
    if (cleanerStatus !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStatus, fetchCleanerData])
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

  // const onDeleteChat = async (id: string) => {
  //   const res = await deleteChat(id)
  //   if (!res) {
  //     return
  //   }
  //   refetch()
  // }
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
  const handleCreateProposalDetails = async (payload: ProposalDetailsFormPayload) => {
    const data: ProposalDetailsCreatePyload = {
      cleaner_id: payload.cleaner_id,
      descrption: payload.descrption,
      expected_rate: payload.expected_rate,
    }
    // console.log('data is ', data)
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditProposalDetails = async (payload: ProposalDetailsFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: ProposalDetailsUpdatePayload = {
      cleaner_id: payload.cleaner_id,
      descrption: payload.descrption,
      expected_rate: payload.expected_rate,
      id: selectedData.id,
    }
    // console.log('data is ', data)
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: ProposalDetailsFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined

    return {
      cleaner_id: selectedData.cleaner_id,
      descrption: selectedData.descrption,
      expected_rate: selectedData.expected_rate,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Proposal Details
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
                  handleApplyFilter({cleaner_id: cleanerId})
                }}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={[
                'Description',
                'Cleaner Id',
                'Expected Rate',
                'Created At',
                'Updated At',
                'Actions',
              ]}
            />
          ) : (
            <ProposalDetailsTable
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
              name='Notes'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Proposal Details'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={{cleaner_id: cleanerId}}
          onSubmit={handleCreateProposalDetails}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Proposal Details'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditProposalDetails}
        />
      )}
    </>
  )
}

export default CleanerProposalDetails
