import React, {useCallback, useEffect} from 'react'
import {FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

interface Props<T> {
  type: 'workorder' | 'favworkorder'
  data?: T[]
}
const WorkOrderTable = <T,>({type, data}: Props<T>) => {
  const navigate = useNavigate()
  const handleWorkorderDetail = (workorder: any) => {
    navigate(`/workorder/${type === 'workorder' ? workorder.id : workorder._id}`)
  }
  const companyStore = useSelector((state: RootState) => state.company)
  const customerStore = useSelector((state: RootState) => state.customer)
  const checklistStore = useSelector((state: RootState) => state.checklist)
  const {fetchCompanyData, fetchCustomersData, fetchChecklistData} = useActions()
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') fetchCompanyData({})
    if (customerStore.status !== 'succeeded') fetchCustomersData({})
    if (checklistStore.status !== 'succeeded') fetchChecklistData({})
  }, [
    companyStore.status,
    fetchCompanyData,
    customerStore.status,
    fetchCustomersData,
    checklistStore.status,
    fetchChecklistData,
  ])
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Title
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Description
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>
            {type === 'workorder' && (
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Contractor Name
              </th>
            )}

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Checklist Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Customer Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((workorder: any) => (
            <tr key={workorder.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>{workorder.title}</td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                {workorder.description}
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>{workorder.type}</td>
              {type === 'workorder' && (
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <Link
                    to={`/contractor/${workorder.contractor_id?._id}`}
                    className='text-blue-500 hover:font-medium'
                  >
                    {workorder.contractor_id?.first_name && workorder.contractor_id?.last_name
                      ? `${workorder.contractor_id.first_name} ${workorder.contractor_id.last_name}`
                      : 'N/A'}
                  </Link>
                </td>
              )}

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${
                    type === 'workorder' ? workorder.company_id?._id : workorder.company_id
                  }`}
                  className='text-blue-500 hover:font-medium'
                >
                  {
                    companyStore.idNameMap[
                      type === 'workorder' ? workorder.company_id?._id : workorder.company_id
                    ]
                  }
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/checklist/${
                    type === 'workorder' ? workorder.checklist_id?._id : workorder.checklist_id
                  }`}
                  className='text-blue-500 hover:font-medium'
                >
                  {
                    checklistStore.idNameMap[
                      type === 'workorder' ? workorder.checklist_id?._id : workorder.checklist_id
                    ]
                  }
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/customer/${
                    type === 'workorder' ? workorder.customer_id?._id : workorder.customer_id
                  }`}
                  className='text-blue-500 hover:font-medium'
                >
                  {
                    customerStore.idNameMap[
                      type === 'workorder' ? workorder.customer_id?._id : workorder.customer_id
                    ]
                  }
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <FaEye
                  className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                  onClick={() => {
                    // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                    handleWorkorderDetail(workorder)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkOrderTable
