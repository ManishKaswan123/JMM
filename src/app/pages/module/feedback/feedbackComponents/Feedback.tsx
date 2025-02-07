import React, {useState} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineClose, AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {FeedbackDetails, FeedbackFilters} from '../feedbackInterfaces'
import {
  useFeedbackDefaultValues,
  useFeedbackFields,
  useFeedbackMutations,
  useFeedbackQuery,
} from '../feedbackHooks'
import {onLimitChange, onPageChange, toggleModal} from 'sr/helpers/globalHelpers'
import {handleApplyFeedbackFilter, useFeedbackModalConfig} from '../feedbackHelpers'
import FeedbackTable from './FeedbackTable'
import {FeedbackSkeletonTableColumns} from '../feedbackConstants'

const Feedback: React.FC = () => {
  const [selectedData, setSelectedData] = useState<FeedbackDetails | null>(null)
  const [pagination, setPagination] = useState({currentPage: 1, itemsPerPage: 8})
  const [filters, setFilters] = useState<FeedbackFilters>({})
  const [isCreatingUpdating, setIsCreatingUpdating] = useState(false)
  const [modals, setModals] = useState({create: false, update: false, filter: false})
  const {createMutation, updateMutation} = useFeedbackMutations()
  const {createAndUpdateFields, filterFields} = useFeedbackFields()
  const {data, isLoading} = useFeedbackQuery({pagination, filters})
  const defaultValues = useFeedbackDefaultValues(selectedData)
  const modalConfig = useFeedbackModalConfig(
    setModals,
    createMutation,
    updateMutation,
    selectedData,
    setIsCreatingUpdating
  )

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Feedback</h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => toggleModal('create', true, setModals)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              <Button
                label={modals.filter ? 'Close' : 'Filters'}
                Icon={modals.filter ? AiOutlineClose : AiOutlineFilter}
                onClick={() => toggleModal('filter', !modals.filter, setModals)}
                className={`text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center ${
                  modals.filter ? 'bg-red-400 hover:bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              ></Button>
            </div>
          </div>
          {modals.filter && (
            <div className='relative'>
              <Filter
                onApplyFilter={(newFilters: FeedbackFilters) =>
                  handleApplyFeedbackFilter(newFilters, setFilters, setPagination, setModals)
                }
                setIsFilterVisible={(action: boolean) => toggleModal('filter', action, setModals)}
                preFilters={filters}
                fields={filterFields}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable columns={FeedbackSkeletonTableColumns} />
          ) : (
            <FeedbackTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={(value: boolean) => toggleModal('update', value, setModals)}
              data={data?.data}
            />
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          data?.pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              pagination={data.pagination}
              onPageChange={(page) => {
                onPageChange(page, setPagination)
              }}
              name='Feedback'
              onLimitChange={(limit) => {
                onLimitChange(limit, setPagination)
              }}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {modalConfig.map(({key, label, onSubmit}) =>
        modals[key] ? (
          <DynamicModal
            key={key}
            label={label}
            isOpen={modals[key]}
            onClose={() => toggleModal(key, false, setModals)}
            fields={createAndUpdateFields}
            defaultValues={key === 'update' ? defaultValues : undefined} // Only pass `defaultValues` for update
            onSubmit={onSubmit}
            isCreatingUpdating={isCreatingUpdating}
          />
        ) : null
      )}
    </>
  )
}

export default Feedback
