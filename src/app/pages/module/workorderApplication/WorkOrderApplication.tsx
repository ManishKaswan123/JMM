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
import {getPreSignedURL} from 'sr/utils/api/media'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useParams} from 'react-router-dom'
import {
  fetchWorkorderApplications,
  WorkorderApplication,
} from 'sr/utils/api/workorderApplicationApi'
import WorkorderApplicationTable from './WorkOrderApplicationTable'

const WorkOrderApplication: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string}>()
  const [selectedData, setSelectedData] = useState<WorkorderApplication>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<any>({cleaner_id: cleanerId})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const cleanerStore = useSelector((state: RootState) => state.cleaner)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchCleanerData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const eightySixResponse = useMemo(
    () => [
      {firstName: 'Devid', id: '65bbf2df9aa9785b019d87b2'},
      {firstName: 'Devid', id: '65bbf2df9aa9785b019d87b2'},
    ],
    []
  )
  const msgType = useMemo(
    () => [
      {name: '1', id: 1},
      {name: '2', id: 2},
      {name: '3', id: 3},
    ],
    []
  )

  const createFields: FieldsArray = useMemo(() => [], [])

  const updateFields: FieldsArray = useMemo(() => [], [])

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'cleaner_id',
        name: cleanerStore.data,
        topLabel: 'Cleaner',
        placeholder: 'Select cleaner',
        labelKey: 'cleaner_name',
        id: 'id',
      },

      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Active', id: 'active'},
          {name: 'Accept', id: 'accept'},
          {name: 'Publish', id: 'publist'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },
    ],
    [cleanerStore.data]
  )

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['workorderApplication', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchWorkorderApplications({limit: itemsPerPage, page: currentPage, ...filters}),
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

  // const defaultValues: defaultData | undefined = useMemo(() => {
  //   if (!selectedData) return undefined
  //   return {
  //     eightySixResponseId: selectedData.eightySixResponseId?.id,
  //     sourceType: selectedData.sourceType,
  //     message: selectedData.message,
  //     images: selectedData.images,
  //     msgType: selectedData.msgType,
  //     receiverId: selectedData.receiverId?.id,
  //   }
  // }, [selectedData])
  const fetchUserDataIfNeeded = useCallback(() => {
    if (cleanerStore.status !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStore.status, fetchCleanerData])

  const onDeleteChat = async (id: string) => {
    const res = await deleteChat(id)
    if (!res) {
      return
    }
    refetch()
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

  // const handleCreateChat = async (payload: chatCreatePayload) => {
  //   setIsCreateModalOpen(false)
  //   const res = await createChat(payload)
  //   if (!res) {
  //     setIsCreateModalOpen(false)
  //     return
  //   }
  //   refetch()
  // }
  // const handleEditChat = async (payload: chatUpdatePayload) => {
  //   if (!selectedData) {
  //     setIsUpdateModalOpen(false)
  //     return
  //   }
  //   setIsUpdateModalOpen(false)
  //   const res = await updateChat(payload, selectedData.id)
  //   if (!res) {
  //     setIsUpdateModalOpen(false)
  //     return
  //   }
  //   refetch()
  // }

  const handleView = async (fileUrl: string) => {
    const response: any = await getPreSignedURL({fileName: fileUrl})
    window.open(response.results.url.toString(), '_blank')
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Workorder Application
            </h2>
            <div className='flex items-center'>
              {/* <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button> */}
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
            <SkeletonTable columns={['Workorder', 'Cleaner', 'Status', 'Actions']} />
          ) : (
            <WorkorderApplicationTable
              //   setSelectedData={setSelectedData}
              //   setIsUpdateModalOpen={setIsUpdateModalOpen}
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
            name='Work Order Application'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {/* {isCreateModalOpen && (
        <DynamicModal
          label='Create Work Order'
          imageType='images'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateChat}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          imageType='images'
          label='Update Job'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditChat}
        />
      )} */}
    </>
  )
}

export default WorkOrderApplication
