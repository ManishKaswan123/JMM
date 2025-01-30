import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import {deleteChat} from 'sr/utils/api/deleteChat'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {createChat} from 'sr/utils/api/createChat'
import {getPreSignedURL} from 'sr/utils/api/media'
import {updateChat} from 'sr/utils/api/updateChat'
import {FieldsArray} from 'sr/constants/fields'
import {UserInterface} from 'sr/constants/User'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import NotesTable from './NotesTable'
import {
  fetchNotes,
  NotesFilters,
  NotesResponse,
  useCreateNote,
  useUpdateNote,
} from 'sr/utils/api/notesApi'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'

interface NotesFormPayload {
  company_id: string
  applicant_id: string
  notes: string
}
interface NotesCreatePayload extends NotesFormPayload {}
interface NotesUpdatePayload extends NotesCreatePayload {
  id: string
}
const Notes: React.FC = () => {
  const [selectedData, setSelectedData] = useState<NotesResponse>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<NotesFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)

  const companyData = useSelector((state: RootState) => state.company.data)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCompanyData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateNote()
  const updateMutation = useUpdateNote()

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Applicant Id',
        name: 'applicant_id',
        placeholder: 'Applicant Id',
        required: true,
      },
      {
        type: 'text',
        label: 'Notes',
        name: 'notes',
        placeholder: 'Notes',
        required: true,
      },
    ],
    [companyData]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
      },
    ],
    [companyData]
  )

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['notes', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchNotes({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])

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

  const handleCreateNote = async (payload: NotesFormPayload) => {
    const data: NotesCreatePayload = {
      company_id: payload.company_id,
      applicant_id: payload.applicant_id,
      notes: payload.notes,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditNote = async (payload: NotesFormPayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: NotesUpdatePayload = {
      company_id: payload.company_id,
      applicant_id: payload.applicant_id,
      notes: payload.notes,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: NotesFormPayload | undefined = useMemo(() => {
    if (!selectedData) return undefined

    return {
      company_id: selectedData.company_id,
      applicant_id: selectedData.applicant_id,
      notes: selectedData.notes,
    }
  }, [selectedData])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Notes</h2>
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
                'Company Id',
                'Applicant Id',
                'Notes',
                'Created At',
                'Updated At',
                'Actions',
              ]}
            />
          ) : (
            <NotesTable
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
          label='Create Notes'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateNote}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Notes'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditNote}
        />
      )}
    </>
  )
}

export default Notes
