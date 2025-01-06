import React, {useState, useMemo} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'

import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import ChecklistTable from './IndividualChecklistTable'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {
  fetchIndividualChecklist,
  IndividualChecklist,
  IndividualChecklistFilters,
  useCreateIndividualChecklist,
  useUpdateIndividualChecklist,
} from 'sr/utils/api/individualChecklistApi'
import {IndividualChecklistDetailsCard} from './IndividualChecklistDetails'
import {useParams} from 'react-router-dom'

interface IndividualChecklistCreatePayload {
  name: string
  type: string
  sub_type: string
  individual_id: string
}
interface IndividualChecklistUpdatePayload extends IndividualChecklistCreatePayload {
  id: string
}

const Custom: React.FC = () => {
  const {userId} = useParams<{userId: string | undefined}>()
  const [selectedData, setSelectedData] = useState<IndividualChecklist>()
  const [selectedChecklist, setSelectedChecklist] = useState<IndividualChecklist>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<IndividualChecklistFilters>({individual_id: userId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const createMutation = useCreateIndividualChecklist()
  const updateMutation = useUpdateIndividualChecklist()

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
          {name: 'Daily', id: 'Daily'},
          {name: 'Weekly', id: 'Weekly'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'sub_type',
        name: [
          {name: 'Office', id: 'Office'},
          {name: 'Hospital', id: 'Hospital'},
        ],
        topLabel: 'Sub Type',
        placeholder: 'Select Sub Type',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Weekly', id: 'Weekly'},
          {name: 'Daily', id: 'Daily'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
      },
      {
        type: 'dropdown',
        label: 'subtype',
        name: [
          {name: 'Office', id: 'Office'},
          {name: 'Hospital', id: 'Hospital'},
        ],
        topLabel: 'Sub Type',
        placeholder: 'Select Sub Type',
      },
    ],
    []
  )

  const {data, isLoading} = useQuery({
    queryKey: ['individualChecklist', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchIndividualChecklist({limit: itemsPerPage, page: currentPage, ...filters}),
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

  const handleCreateIndividualChecklist = async (payload: IndividualChecklistCreatePayload) => {
    const data: IndividualChecklistCreatePayload = {
      name: payload.name,
      type: payload.type,
      sub_type: payload.sub_type,
      individual_id: userId || '',
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditIndividualChecklist = async (payload: IndividualChecklistUpdatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    const data: IndividualChecklistUpdatePayload = {
      name: payload.name,
      type: payload.type,
      sub_type: payload.sub_type,
      individual_id: userId || '',
      id: selectedData.id,
    }
    updateMutation.mutate({payload: data, onSuccess})
  }
  const defaultValues: IndividualChecklistUpdatePayload | undefined = useMemo(() => {
    if (!selectedData) return undefined
    return {
      name: selectedData.name,
      type: selectedData.type,
      sub_type: selectedData.sub_type,
      individual_id: selectedData.individual_id._id,
      id: selectedData.id,
    }
  }, [selectedData])
  if (selectedChecklist) {
    return (
      <IndividualChecklistDetailsCard
        data={selectedChecklist}
        onGoBack={() => setSelectedChecklist(undefined)}
      />
    )
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Individual Checklist
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
            <SkeletonTable columns={['Name', 'Type', 'SubType', 'Individual', 'Actions']} />
          ) : (
            <ChecklistTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onSelectChecklist={setSelectedChecklist}
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
            name='individualChecklist'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Individual Checklist'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateIndividualChecklist}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Individual Checklist'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditIndividualChecklist}
        />
      )}
    </>
  )
}
const IndividualChecklistCard: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/individual/checklist'}
      ></DashboardWrapper>
    </>
  )
}

export default IndividualChecklistCard
