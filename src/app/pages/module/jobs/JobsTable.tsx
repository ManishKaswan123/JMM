import React from 'react'
import {FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'

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

interface JobAdvancedDetails {
  _id: string
  job_id: string
  reporting_address: {
    address_line_1: string
    address_line_2: string
    country: string
    city: string
    state: string
    postal: string
    lat: number
    lng: number
  }
  hire_count: number
  supplemental_pay: string[]
  recruitment_timeline?: string
  application_deadline?: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ApplicationDetails {
  _id: string
  job_id: string
  cleaner_id: string
  answers: string[]
  status: string
  createdAt: string
  updatedAt: string
}

interface JobResponse {
  company_id: CompanyDetails
  job_title: string
  job_type: string[]
  schedule: string[]
  employment_type: string[]
  start_date: string
  show_pay_by: string
  min_amount?: number
  max_amount: number
  rate: string
  benefits: string[]
  range: {
    min: number
    max: number
  }
  job_description: string
  application_call_mobile_number: string
  require_resume: boolean
  notifications: boolean
  email: string
  application_ids: ApplicationDetails[]
  status: string
  createdAt: string
  updatedAt: string
  job_advanced_id: JobAdvancedDetails
  application_status_counts: {
    hired: number
    active: number
  }
  id: string
}

interface Props {
  data?: JobResponse[]
}

const JobsTable: React.FC<Props> = ({data}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Company Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Job Title
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Start Date
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Max Amount
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Min Amount
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Rate
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
          {data?.map((job) => (
            <tr key={job?.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/company/${job?.company_id?._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {job?.company_id?.company_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{job.job_title}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(job?.start_date).toLocaleDateString()}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${job?.max_amount}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${job?.min_amount}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{job?.rate}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p
                  className={`whitespace-no-wrap ${
                    job?.status === 'active'
                      ? 'text-green-500'
                      : job?.status === 'open'
                      ? 'text-blue-500'
                      : job?.status === 'assigned'
                      ? 'text-yellow-500'
                      : job?.status === 'pause'
                      ? 'text-purple-500'
                      : job?.status === 'closed'
                      ? 'text-red-600'
                      : job?.status === 'pending'
                      ? 'text-orange-300'
                      : 'text-gray-500' // Default color for unknown statuses
                  }`}
                >
                  {job?.status}
                </p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link to={`/job/${job?.id}`} className='text-blue-500 hover:font-medium'>
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

export default JobsTable
