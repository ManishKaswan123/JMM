import React from 'react'
import {FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'

interface ChecklistDetails {
  _id: string
  name: string
  type: string
  subtype: string
  company_id: string
  customer_id: string
  task_ids: string[]
  status: string
  createdAt: string
  updatedAt: string
}

interface CompanyDetails {
  _id: string
  username: string
  email: string
  mobile_number: string
  company_name: string
  business_type: string[]
  intent: string[]
  candidate_msg: boolean
  user_id: string
  status: string
  createdAt: string
  updatedAt: string
}

interface CustomerDetails {
  _id: string
  company_id: string
  email: string
  mobile_number: string
  name: string
  type: string
  remarks: string
  location_ids: string[]
  checklist_ids: string[]
  status: string
  contacts: string[]
  createdAt: string
  updatedAt: string
}

interface CustomerLocationDetails {
  _id: string
  customer_id: string
  company_id: string
  address: {
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    postal: string
    country: string
    lat: number
    lng: number
  }
  checklist_ids: string[]
  geofence_ids: string[]
  contacts: string[]
  createdAt: string
  updatedAt: string
}

interface WorkOrderResponse {
  title: string
  description: string
  type: string
  contractor_id: Record<string, any>
  checklist_id: ChecklistDetails
  company_id: CompanyDetails
  customer_id: CustomerDetails
  customer_location_id: CustomerLocationDetails
  job_type: string
  pay_type: string
  pay_type_rate: number
  entry_time: string
  exit_time: string
  one_time_date: string
  time_for_work_completion: number
  recurring: boolean
  payment_status: string
  workorder_status: string
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

interface Props {
  data?: WorkOrderResponse[]
}

const WorkOrderTable: React.FC<Props> = ({data}) => {
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
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Contractor Name
            </th>
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
          {data?.map((workorder) => (
            <tr key={workorder.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>{workorder.title}</td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                {workorder.description}
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>{workorder.type}</td>
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

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${workorder.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {workorder.company_id?.company_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/checklist/${workorder.checklist_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {workorder.checklist_id?.name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/customer/${workorder.customer_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {workorder.customer_id?.name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link to={`/workorder/${workorder.id}`} className='text-blue-500 hover:font-medium'>
                  <FaEye
                    className='cursor-pointer text-blue-500 hover:text-gray-700'
                    style={{fontSize: '1.1rem'}}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkOrderTable
