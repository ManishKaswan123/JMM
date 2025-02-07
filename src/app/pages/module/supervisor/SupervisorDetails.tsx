import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams, Link} from 'react-router-dom'
import {FieldsArray} from 'sr/constants/fields'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {UserContext} from 'sr/context/UserContext'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {
  fetchSingleSupervisor,
  SupervisorDetails,
  useUpdateSupervisor,
} from 'sr/utils/api/supervisorApi'
import {FaEdit} from 'react-icons/fa'
import {getStatusName} from 'sr/helpers/globalHelpers'

interface Access {
  view: boolean
  add: boolean
  update: boolean
  delete: boolean
}
type AccessType = 'job' | 'work_order' | 'customer' | 'contractor'

const managementTypes = [
  {key: 'job', label: 'Job Management', accessKey: 'job_management'},
  {key: 'work_order', label: 'Workorder Management', accessKey: 'work_order_management'},
  {key: 'contractor', label: 'Contractor Management', accessKey: 'contractor_management'},
  {key: 'customer', label: 'Customer Management', accessKey: 'customer_management'},
] as const

const accessFieldsData = [
  {id: true, name: 'Yes'},
  {id: false, name: 'No'},
]

const accessTypes = ['view', 'add', 'update', 'delete'] as const

const RenderAccess = ({data, type}: {data: Record<string, boolean>; type: AccessType}) => {
  const allowedAccess = accessTypes.filter((accessType) => data[`${accessType}_${type}`])

  if (allowedAccess.length === 0) return <p className='text-gray-500 italic'>No Access Granted</p>

  return (
    <div className='flex flex-wrap gap-2'>
      {allowedAccess.map((accessType) => (
        <span
          key={accessType}
          className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm border border-blue-300'
        >
          {accessType.charAt(0).toUpperCase() + accessType.slice(1)}
        </span>
      ))}
    </div>
  )
}

const SupervisorDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const {supervisor_id} = useParams<{supervisor_id: string}>()
  const [data, setData] = useState<SupervisorDetails>()
  const [isError, setIsError] = useState(false)
  const [refetch, setRefetch] = useState<boolean>(false)
  const [openModals, setOpenModals] = useState<Record<AccessType, boolean>>({
    job: false,
    work_order: false,
    contractor: false,
    customer: false,
  })
  const AccessFields: FieldsArray = useMemo(
    () =>
      accessTypes.map((type) => ({
        type: 'dropdown',
        label: type,
        name: accessFieldsData,
        topLabel: type.charAt(0).toUpperCase() + type.slice(1),
        placeholder: `Select ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        required: true,
      })),
    []
  )
  const updateMutation = useUpdateSupervisor()

  useEffect(() => {
    fetchSingleSupervisor(supervisor_id || '')
      .then((res) => setData(res.data))
      .catch(() => setIsError(true))
    setUser(supervisor_id)
  }, [supervisor_id, refetch])

  const onSuccess = () => {
    setRefetch((prev) => !prev)
    setOpenModals({job: false, work_order: false, contractor: false, customer: false})
  }

  const handleEditAccess = async (payload: Access, type: AccessType) => {
    if (!data || !data.access) return
    const updatedAccess = {
      ...data.access,
      [`${type}_management`]: accessTypes.reduce(
        (acc, accessType) => ({...acc, [`${accessType}_${type}`]: payload[accessType]}),
        {}
      ),
    }
    updateMutation.mutate({payload: {...data, access: updatedAccess}, onSuccess})
  }

  const defaultValues: Access | undefined = useMemo(() => {
    const activeType = Object.entries(openModals).find(([, isOpen]) => isOpen)?.[0] as AccessType
    if (!data?.access?.[`${activeType}_management`]) return undefined
    return accessTypes.reduce(
      (acc, accessType) => ({
        ...acc,
        [accessType]: (data.access[`${activeType}_management`] as Record<string, boolean>)[
          `${accessType}_${activeType}`
        ],
      }),
      {} as Access
    )
  }, [data, openModals])

  if (!data)
    return (
      <SkeletonCard
        label='Supervisor Details'
        col1={['Id', 'Mobile', 'Company', 'Username', 'Created At']}
        col2={['Name', 'Email', 'UserId', 'Status', 'Updated At']}
      />
    )
  if (isError) return <div>Error loading supervisor details.</div>

  return (
    <>
      <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
        <Button
          onClick={() => navigate('/supervisor')}
          label='Go Back 🡸'
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
        />
        <h2 className='text-4xl font-bold mb-6 text-center'>Supervisor Details</h2>

        <div className='grid grid-cols-2 md:grid-cols-2 gap-4 mb-8'>
          {[
            {label: 'Id', value: data.id},
            {label: 'Name', value: `${data.first_name} ${data.last_name}`},
            {label: 'Mobile', value: data.mobile_number},
            {label: 'Email', value: data.email},
            {
              label: 'Company',
              value: (
                <Link
                  to={`/company/details/${data.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {data.company_id?.company_name}
                </Link>
              ),
            },
            {label: 'UserId', value: data.user_id},
            {label: 'Username', value: data.username},
            {label: 'Status', value: getStatusName(data.status)},
            {label: 'Created At', value: data.createdAt},
            {label: 'Updated At', value: data.updatedAt},
          ].map(({label, value}) => (
            <div key={label} className='flex items-center'>
              <strong className='font-medium text-lg mr-2'>{label}:</strong>
              <p>{value}</p>
            </div>
          ))}
        </div>

        {/* Access Section Heading */}
        <h3 className='text-2xl font-semibold mb-4'>Access Management</h3>

        {managementTypes.map(({key, label, accessKey}) => (
          <div key={key} className='mb-8'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <h4 className='text-xl font-semibold text-gray-700'>{label}</h4>
                <FaEdit
                  className='text-blue-500 cursor-pointer'
                  size={20}
                  onClick={() => setOpenModals((prev) => ({...prev, [key]: true}))}
                />
              </div>
            </div>
            <RenderAccess data={data.access[accessKey]} type={key} />
          </div>
        ))}
      </div>

      {managementTypes.map(({key, label}) =>
        openModals[key] ? (
          <DynamicModal
            key={key}
            label={label}
            isOpen={openModals[key]}
            onClose={() => setOpenModals((prev) => ({...prev, [key]: false}))}
            fields={AccessFields}
            defaultValues={defaultValues}
            onSubmit={(payload) => handleEditAccess(payload, key)}
          />
        ) : null
      )}
    </>
  )
}

export default SupervisorDetailsCard
