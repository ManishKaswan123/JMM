import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import TasklistTable from './IndividualTasklistTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchIndividualTasklist,
  IndividualTasklist,
  IndividualTasklistFilters,
  useCreateIndividualTasklist,
  useUpdateIndividualTasklist,
} from 'sr/utils/api/individualTasklistApi'
import {IndividualTasklistDetailsCard} from './IndividualTasklistDetails'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

interface IndividualTasklistCreatePayload {
  name: string
  type: string
  individual_id: string
  checklist_id: string
  description: string
  status: string
}
interface IndividualTasklistUpdatePayload extends IndividualTasklistCreatePayload {
  id: string
}

const IndividualTasklistCard: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<IndividualTasklist>()
  const [selectedTasklist, setSelectedTasklist] = useState<IndividualTasklist>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<IndividualTasklistFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const checklistData = useSelector((state: RootState) => state.checklist.data)
  const checklistStatus = useSelector((state: RootState) => state.checklist.status)
  const {fetchChecklistData} = useActions()
  const createMutation = useCreateIndividualTasklist()
  const updateMutation = useUpdateIndividualTasklist()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Mandatory', id: 'Mandatory'},
          {name: 'Optional', id: 'Optional'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'checklist_id',
        name: checklistData,
        topLabel: 'Checklist',
        placeholder: 'Select Checklist',
        labelKey: 'checklist_name',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Draft', id: 'draft'},
          {name: 'Deleted', id: 'deleted'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    [checklistData]
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Mandatory', id: 'Mandatory'},
          {name: 'Optional', id: 'Optional'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'checklist_id',
        name: checklistData,
        topLabel: 'Checklist',
        placeholder: 'Select Checklist',
        labelKey: 'checklist_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Draft', id: 'draft'},
          {name: 'Deleted', id: 'deleted'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [checklistData]
  )
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (checklistStatus !== 'succeeded') {
      fetchChecklistData({})
    }
  }, [checklistStatus, fetchChecklistData])

  const {data, isLoading} = useQuery({
    queryKey: ['individualTasklist', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchIndividualTasklist({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateIndividualTasklist = async (payload: IndividualTasklistCreatePayload) => {
    const data: IndividualTasklistCreatePayload = {
      name: payload.name,
      type: payload.type,
      individual_id: userId || '',
      checklist_id: payload.checklist_id,
      description: payload.description,
      status: payload.status,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditIndividualTasklist = async (payload: IndividualTasklistUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: IndividualTasklistUpdatePayload = {
      name: payload.name,
      type: payload.type,
      individual_id: userId || '',
      checklist_id: payload.checklist_id,
      description: payload.description,
      status: payload.status,
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: IndividualTasklistUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData.name,
      type: selectedData.type,
      individual_id: selectedData.individual_id._id,
      checklist_id: selectedData.checklist_id?._id,
      description: selectedData.description,
      status: selectedData.status,
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedTasklist) {
    return (
      <IndividualTasklistDetailsCard
        data={selectedTasklist}
        onGoBack={() => setSelectedTasklist(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Individual Tasklist
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
              columns={['Name', 'Type', 'Individual', 'Checklist', 'Status', 'Actions']}
            />
          ) : (
            <TasklistTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectTasklist={setSelectedTasklist}
              data={data?.data}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
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
            name='individualTasklist'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Individual Tasklist'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateIndividualTasklist}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Individual Tasklist'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividualTasklist}
        />
      )}
    </>
  )
}

export default IndividualTasklistCard
