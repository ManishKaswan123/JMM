import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import AppVersionHistoryTable from './AppVersionHistoryTable'
import {deleteAppVersion} from 'sr/utils/api/deleteAppVersion'
import {fetchAppVersion} from 'sr/utils/api/fetchAppVersion'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
import {createAppVersion} from 'sr/utils/api/createAppVersion'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useQuery} from '@tanstack/react-query'
import AppVersionHistorySkeleton from './AppVersionHistorySkeleton'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
// interface appVersionHistoryApiResponse {
//   title?: string
//   descriptions?: string
//   code?: number
//   isForceUpdate?: boolean
//   isActive?: boolean
//   platform?: string
//   link?: string
//   createdAt: string
//   updatedAt: string
//   id: string
// }
interface appVersionHistoryFilters {
  title?: string
  code?: number
  isActive?: boolean
}
interface appVersionHistoryPayload {
  title: string
  descriptions: string
  code: number
  isForceUpdate: boolean
  platform: string
  link: string
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<appVersionHistoryFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  // const userData = useSelector((state: RootState) => state.user.data)
  // const userStatus = useSelector((state: RootState) => state.user.status)
  // const {fetchUserData} = useActions()

  const isActive = useMemo(
    () => [
      {id: true, name: 'Active'},
      {id: false, name: 'Inactive'},
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'isActive',
        name: isActive,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
      {type: 'text', label: 'Title', name: 'title', placeholder: 'Title'},
      {type: 'text', label: 'Code', name: 'code', placeholder: 'Code'},
    ],
    [isActive]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Title',
        name: 'title',
        placeholder: 'Title',
        required: true,
      },
      {
        type: 'text',
        label: 'Descriptions',
        name: 'descriptions',
        placeholder: 'Descriptions',
        required: true,
      },
      {
        type: 'text',
        label: 'Code',
        name: 'code',
        placeholder: 'Code',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'platform',
        name: [
          {id: 'android', name: 'Android'},
          {id: 'ios', name: 'IOS'},
        ],
        topLabel: 'Platform',
        placeholder: 'Select Platform',
        required: true,
      },
      {
        type: 'text',
        label: 'Link',
        name: 'link',
        placeholder: 'Link',
        required: true,
      },
      {
        type: 'checkbox',
        label: 'Is Force Update',
        name: 'isForceUpdate',
      },
    ],
    []
  )
  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['appVersionHistory', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchAppVersion({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
  })
  // useEffect(() => {
  //   fetchUserDataIfNeeded()
  // }, [])

  // const fetchUserDataIfNeeded = useCallback(() => {
  //   if (userStatus !== 'succeeded') {
  //     fetchUserData({})
  //   }
  // }, [userStatus])

  const handleApplyFilter = (newFilters: appVersionHistoryFilters) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
    setCurrentPage(1)
  }
  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const onDeleteAppVersionHistory = async (id: string) => {
    const res = await deleteAppVersion(id)
    if (!res) {
      return
    }
    refetch()
  }
  const handleCreateAppVersionHistory = async (payload: appVersionHistoryPayload) => {
    setIsCreateModalOpen(false)
    const res = await createAppVersion(payload)
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Mobile App Version History
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label='Filter'
                Icon={AiOutlineFilter}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
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
            <AppVersionHistorySkeleton />
          ) : (
            <AppVersionHistoryTable data={data?.results} onDelete={onDeleteAppVersionHistory} />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
            totalResults={data?.totalResults}
            itemsPerPage={itemsPerPage}
            name='App Version History'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {/* {showPopup && <BusinessCategoryForm />} */}
      {isCreateModalOpen && (
        <DynamicModal
          label='Create App Version'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateAppVersionHistory}
        />
      )}
    </>
  )
}
const AppVersionHistory: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/mobile-app-version-history'}
      ></DashboardWrapper>
    </>
  )
}

export default AppVersionHistory
