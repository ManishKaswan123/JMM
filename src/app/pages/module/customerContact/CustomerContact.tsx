import React, {useState, useEffect, useMemo} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import {
  ContactsType,
  Customer,
  fetchSingleCustomer,
  useCreateCustomer,
  useUpdateCustomer,
} from 'sr/utils/api/customerApi'
import SkeletonTable from 'sr/helpers/ui-components/SkeletonTable'
import {useParams} from 'react-router-dom'
import ContactTable from '../contact/ContactTabel'

interface Filters {
  limit?: number
  page?: number
  company_id?: string
  status?: string
}

interface CustomerCreatePayload extends Omit<Customer, 'id'> {}
interface ContactFormPayload extends Omit<ContactsType, '_id'> {}
interface CustomerUpdatePayload extends Omit<Customer, 'contacts'> {
  contacts: ContactFormPayload[]
}
const CustomerContactCard: React.FC = () => {
  const {customer_id} = useParams<{customer_id: string}>()
  const [data, setData] = useState<Customer>()
  const [refetch, setRefetch] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const [selectedData, setSelectedData] = useState<ContactsType>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<Filters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const createMutation = useCreateCustomer()
  const updateMutation = useUpdateCustomer()

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'First Name',
        name: 'first_name',
        placeholder: 'First Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Last Name',
        name: 'last_name',
        placeholder: 'Last Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Mobile Number',
        name: 'phone',
        placeholder: 'Mobile Number',
        required: true,
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },
      {
        type: 'text',
        label: 'Type',
        name: 'type',
        placeholder: 'Type',
        required: true,
      },
    ],
    []
  )

  const fields: FieldsArray = useMemo(() => [], [])

  useEffect(() => {
    fetchSingleCustomer(customer_id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [customer_id, refetch])
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') {
      setIsCreateModalOpen(false)
      setRefetch(!refetch)
    }
  }

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }
  const handleDeleteContact = async (contact: ContactsType) => {
    if (!data) return
    const updatedContacts =
      data.contacts
        ?.filter((c) => c._id !== contact._id)
        .map((contact) => {
          const {_id, ...rest} = contact
          return rest
        }) || []
    const updatedData: CustomerUpdatePayload = {
      ...data,
      contacts: updatedContacts,
    }
    updateMutation.mutate({payload: updatedData, onSuccess})
  }

  const handleEditCustomer = async (payload: ContactFormPayload) => {
    if (!data) return
    const oldContacts =
      data.contacts?.map((contact) => {
        const {_id, ...rest} = contact
        return rest
      }) || []
    const updateData: CustomerUpdatePayload = {
      ...data,
      contacts: [...oldContacts, payload],
    }
    updateMutation.mutate({payload: updateData, onSuccess})
  }

  // const defaultValues: ContactFormPayload | undefined = useMemo(() => {
  //   if (!selectedData) return undefined
  //   return {
  //     company_id: selectedData.company_id,
  //     name: selectedData.name,
  //     email: selectedData.email,
  //     mobile_number: selectedData.mobile_number,
  //     type: selectedData.type,
  //     contacts: [] as string[],
  //     status: selectedData.status,
  //     remarks: selectedData.remarks,
  //     location_ids: [] as string[],
  //     checklist_ids: [] as string[],
  //     id: selectedData.id,
  //   }
  // }, [selectedData])
  if (isError) return <div>Error loading customer details.</div>

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Contacts</h2>
            <div className='flex items-center'>
              <Button
                label='Add new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              ></Button>
              {/* <Button
                label={`${isFilterVisible ? 'Close' : 'Filters'}`}
                Icon={!isFilterVisible ? AiOutlineFilter : AiOutlineClose}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className={`text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center ${
                  isFilterVisible ? 'bg-red-400 hover:bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              ></Button> */}
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
          {!data ? (
            <SkeletonTable
              columns={['First Name', 'Last Name', 'Phone', 'Email', 'Type', 'Actions']}
            />
          ) : (
            <ContactTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              data={data.contacts || []}
              onDelete={handleDeleteContact}
              //   handleDelete={onDeleteChat}
              //   handleView={handleView}
            />
          )}
        </div>
        {/* {isLoading ? (
          <PaginationSkeleton />
        ) : (
          data?.pagination && (
            <Pagination
              currentPage={currentPage}
              pagination={data.pagination}
              onPageChange={onPageChange}
              name='customer'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )} */}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Add Contact'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleEditCustomer}
        />
      )}
      {/* {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Customer'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createFields}
          defaultValues={defaultValues}
          onSubmit={handleEditCustomer}
        />
      )} */}
    </>
  )
}

export default CustomerContactCard
