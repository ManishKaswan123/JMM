import React, {useCallback, useEffect} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {TaskListDetails} from 'sr/utils/api/fetchTaskList'
import {useActions} from 'sr/utils/helpers/useActions'

interface Props {
  data?: TaskListDetails[]
  setSelectedData: React.Dispatch<React.SetStateAction<TaskListDetails | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskListTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  const companyMap = useSelector((state: RootState) => state.company.idNameMap)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const customerMap = useSelector((state: RootState) => state.customer.idNameMap)
  const customerStatus = useSelector((state: RootState) => state.customer.status)
  const checklistMap = useSelector((state: RootState) => state.checklist.idNameMap)
  const checklistStatus = useSelector((state: RootState) => state.checklist.status)
  const {fetchCompanyData, fetchCustomersData, fetchChecklistData} = useActions()
  const fetchDataIfNeeded = useCallback(() => {
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
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Name
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Checklist
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Customer
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 text-ellipsis'>{item.name}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item.type}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/checklist/${item.checklist_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {checklistMap[item.checklist_id]}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${item.company_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {companyMap[item.company_id]}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/customer/${item.company_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {customerMap[item.customer_id]}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 text-ellipsis'>{item.status}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(item)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <Link to={`/tasklist/${item.id}`} className='text-blue-500 hover:font-medium'>
                    <FaEye
                      className='cursor-pointer text-blue-500 hover:text-gray-700'
                      style={{fontSize: '1.1rem'}}
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskListTable
