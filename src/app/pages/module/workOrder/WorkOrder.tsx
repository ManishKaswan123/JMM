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
import WorkOrderTable from './WorkOrderTable'
import {fetchWorkOrder, WorkOrderResponse} from 'sr/utils/api/fetchWorkOrder'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useParams} from 'react-router-dom'
import {jobTypes, locations} from 'sr/constants/jobsConstants'
import {fetchCustomers} from 'sr/utils/api/customerApi'
import {fetchCustomerLocations} from 'sr/utils/api/customerLocationApi'
import {useCreateWorkorder} from 'sr/utils/api/createWorkorder'

const WorkOrder: React.FC = () => {
  const {cleanerId} = useParams<{cleanerId: string}>()
  const [selectedData, setSelectedData] = useState()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<any>({
    cleaner_id: cleanerId,
    min_pay_type_rate: 1,
    max_pay_type_rate: 100,
  })
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const companyData = useSelector((state: RootState) => state.company.data)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const customerData = useSelector((state: RootState) => state.customer.data)
  const customerStatus = useSelector((state: RootState) => state.customer.status)
  const checklistData = useSelector((state: RootState) => state.checklist.data)
  const checklistStatus = useSelector((state: RootState) => state.checklist.status)
  const [selectedCompany, setSelectedCompany] = useState<string>()
  const [selectedCustomer, setSelectedCustomer] = useState<string>()
  const [filteredCustomerData, setFilteredCustomerData] =
    useState<{customer_name: string; id: string}[]>()
  const [filteredCustomerLocationData, setFilteredCustomerLocationData] =
    useState<{customer_location_name: string; id: string}[]>()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const {fetchUserData, fetchCustomersData, fetchChecklistData, fetchCompanyData} = useActions()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const createMutation = useCreateWorkorder()

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Draft', id: 'draft'},
          {name: 'Publish', id: 'publist'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Title',
        name: 'title',
        placeholder: 'Title',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select Company',
        labelKey: 'company_name',
        id: 'id',
        onChange: (e: any) => setSelectedCompany(e.target.value),
        required: true,
      },
      {
        type: 'dropdown',
        label: 'customer_id',
        name: filteredCustomerData,
        topLabel: 'Customer',
        placeholder: 'Select Customer',
        labelKey: 'customer_name',
        id: 'id',
        onChange: (e: any) => setSelectedCustomer(e.target.value),
        required: true,
      },
      {
        type: 'dropdown',
        label: 'customer_location_id',
        name: filteredCustomerLocationData,
        topLabel: 'Customer Location',
        placeholder: 'Select Customer Location',
        labelKey: 'customer_location_name',
        id: 'id',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'type',
        name: [
          {name: 'Open', id: 'open'},
          {name: 'Individual', id: 'individual'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'number',
        label: 'Work Completion Time',
        name: 'time_for_work_completion',
        placeholder: 'Work Completion Time',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'pay_type',
        name: [
          {value: 'Fixed Rate', label: 'Fixed Rate'},
          {value: 'Hourly Rate', label: 'Hourly Rate'},
        ],
        topLabel: 'Pay Type',
        placeholder: 'Select Pay Type',
        labelKey: 'label',
        valueKey: 'value',
        id: 'id',
        required: true,
      },

      {
        type: 'number',
        label: 'Pay type rate',
        name: 'pay_type_rate',
        placeholder: 'Pay type rate in $',
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
        label: 'Entry Time',
        name: 'entry_time',
        placeholder: 'HH:MM format',
        required: true,
      },
      {
        type: 'text',
        label: 'Exit Time',
        name: 'exit_time',
        placeholder: 'HH:MM format',
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
        label: 'recurring',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Recurring',
        placeholder: 'Select Recurring',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
      {
        type: 'date',
        label: 'One Time Date',
        name: 'one_time_date',
        placeholder: 'One Time Date',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'workorder_status',
        name: [
          {name: 'Scheduled', id: 'scheduled'},
          {name: 'Pending', id: 'pending'},
          {name: 'Completed', id: 'completed'},
        ],
        topLabel: 'WorkOrder Status',
        placeholder: 'Select WorkOrder Status',
        labelKey: 'name',
        id: 'id',
        required: true,
      },
    ],
    [companyData, filteredCustomerData, filteredCustomerLocationData]
  )

  // const updateFields: FieldsArray = useMemo(
  //   () => [
  //     {
  //       type: 'dropdown',
  //       label: 'receiverId',
  //       name: userData?.results || [],
  //       topLabel: 'Receiver',
  //       placeholder: 'Select Receiver',
  //       required: true,
  //     },
  //     {
  //       type: 'dropdown',
  //       label: 'eightySixResponseId',
  //       name: eightySixResponse,
  //       topLabel: '86 Response',
  //       placeholder: 'Select 86 Response',
  //       required: true,
  //     },
  //     {
  //       type: 'dropdown',
  //       label: 'msgType',
  //       name: msgType,
  //       topLabel: 'Msg Type',
  //       placeholder: 'Select Msg Type',
  //       required: true,
  //     },
  //     {type: 'text', label: 'Message', name: 'message', placeholder: 'Message', required: true},
  //     {
  //       type: 'text',
  //       label: 'Source Type',
  //       name: 'sourceType',
  //       placeholder: 'Source Type',
  //       required: true,
  //     },
  //     {
  //       type: 'file',
  //       label: 'Images',
  //       name: 'images',
  //       wrapperLabel: 'Upload image',
  //       topLabel: 'Images',
  //       placeholder: 'Select Images',
  //       required: true,
  //     },
  //   ],
  //   [userData, msgType, eightySixResponse]
  // )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'multi',
        options: [
          {value: 'Fixed Rate', label: 'Fixed Rate'},
          {value: 'Hourly Rate', label: 'Hourly Rate'},
        ],
        label: 'pay_type',
        name: 'Pay Type',
        placeholder: 'Select Pay Type',
      },
      {
        type: 'multi',
        options: locations,
        label: 'location',
        name: 'Location',
        placeholder: 'Select Location',
      },
      {
        type: 'number',
        label: 'Min. Pay Type Rate',
        name: 'min_pay_type_rate',
        placeholder: '$1 to $100',
      },
      {
        type: 'number',
        label: 'Max. Pay Type Rate',
        name: 'max_pay_type_rate',
        placeholder: '$1 to $100',
      },
      {
        type: 'dropdown',
        label: 'company_id',
        name: companyData,
        topLabel: 'Company',
        placeholder: 'Select company',
        labelKey: 'company_name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'customer_id',
        name: customerData,
        topLabel: 'Customer',
        placeholder: 'Select Customer',
        labelKey: 'customer_name',
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
        label: 'type',
        name: [
          {name: 'Open', id: 'open'},
          {name: 'Individual', id: 'individual'},
        ],
        topLabel: 'Type',
        placeholder: 'Select Type',
        labelKey: 'name',
        id: 'id',
      },

      {
        type: 'dropdown',
        label: 'recurring',
        name: [
          {name: 'Yes', id: true},
          {name: 'No', id: false},
        ],
        topLabel: 'Recurring',
        placeholder: 'Select Recurring',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'payment_status',
        name: [
          {name: 'Scheduled', id: 'scheduled'},
          {name: 'Pending', id: 'pending'},
          {name: 'Completed', id: 'completed'},
        ],
        topLabel: 'Payment Status',
        placeholder: 'Select Payment Status',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'workorder_status',
        name: [
          {name: 'Scheduled', id: 'scheduled'},
          {name: 'Pending', id: 'pending'},
          {name: 'Completed', id: 'completed'},
        ],
        topLabel: 'WorkOrder Status',
        placeholder: 'Select WorkOrder Status',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: [
          {name: 'Draft', id: 'draft'},
          {name: 'Publish', id: 'publist'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },

      {
        type: 'number',
        label: 'Work Completion Time',
        name: 'time_for_work_completion',
        placeholder: 'Work Completion Time',
      },
    ],
    [companyData, customerData, checklistData]
  )

  useEffect(() => {
    if (selectedCompany === undefined) {
      setFilteredCustomerData([])
      return
    }
    fetchCustomers({limit: 0, company_id: selectedCompany})
      .then((res) => {
        setFilteredCustomerData(
          res.data.map((item) => {
            return {
              customer_name: item.name,
              id: item.id,
            }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [selectedCompany])
  useEffect(() => {
    if (selectedCustomer === undefined) {
      setFilteredCustomerLocationData([])
      return
    }
    fetchCustomerLocations({limit: 0, customer_id: selectedCustomer})
      .then((res) => {
        setFilteredCustomerLocationData(
          res.data.map((item) => {
            return {
              customer_location_name: item.name,
              id: item.id,
            }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [selectedCustomer])
  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['workorder', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchWorkOrder({limit: itemsPerPage, page: currentPage, ...filters}),
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
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
    if (customerStatus !== 'succeeded') {
      fetchCustomersData({})
    }
    if (checklistStatus !== 'succeeded') {
      fetchChecklistData({})
    }
  }, [
    companyStatus,
    fetchCompanyData,
    customerStatus,
    fetchCustomersData,
    checklistStatus,
    fetchChecklistData,
  ])

  const onCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setSelectedCompany(undefined)
    setFilteredCustomerData([])
    setSelectedCustomer(undefined)
    setFilteredCustomerLocationData([])
  }
  const onSuccess = (action: string) => {
    if (action === 'create') onCloseCreateModal()
    else if (action === 'update') setIsUpdateModalOpen(false)
  }

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

  const handleCreateWorkorder = async (payload: Record<string, any>) => {
    createMutation.mutate({payload, onSuccess})
  }
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
              Work Orders
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
                    cleaner_id: cleanerId,
                    min_pay_type_rate: 1,
                    max_pay_type_rate: 100,
                  })
                }}
              />
            </div>
          )}
          {isLoading ? (
            <SkeletonTable
              columns={[
                'Title',
                'Description',
                'Type',
                'Contractor Name',
                'Company Name',
                'Checklist Name',
                'Customer Name',
                'Actions',
              ]}
            />
          ) : (
            <WorkOrderTable<WorkOrderResponse>
              //   setSelectedData={setSelectedData}
              //   setIsUpdateModalOpen={setIsUpdateModalOpen}
              type='workorder'
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
              name='Work Order'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create Work Order'
          // imageType='images'
          isOpen={isCreateModalOpen}
          onClose={onCloseCreateModal}
          fields={createFields}
          onSubmit={handleCreateWorkorder}
        />
      )}
      {/* {isUpdateModalOpen && (
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

export default WorkOrder
