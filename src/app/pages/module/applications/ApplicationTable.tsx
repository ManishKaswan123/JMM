import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {statusColors} from 'sr/constants/common'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {Status} from 'sr/utils/api/globalInterface'

interface JobApplication {
  _id: string
  job_id: JobDetails
  cleaner_id: CleanerDetails
  answers: any[] // Update the type if answers structure is known
  status: Status
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

interface JobDetails {
  _id: string
  company_id: CompanyDetails
  job_title: string
  job_type: string[]
  schedule: string[]
  employment_type: string[]
  start_date: string
  show_pay_by: string
  max_amount: number
  rate: string
  benefits: string[]
  job_description: string
  application_call_mobile_number: string
  require_resume: boolean
  notifications: boolean
  email: string
  application_ids: string[]
  status: Status
  createdAt: string
  updatedAt: string
  __v: number
  job_advanced_id: string
  id: string
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
  status: Status
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

interface CleanerDetails {
  _id: string
  username: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
  date_of_birth: string
  user_id: string
  status: Status
  createdAt: string
  updatedAt: string
  __v: number
  address: AddressDetails
  id: string
}

interface AddressDetails {
  address_line_1: string
  address_line_2: string
  country: string
  city: string
  state: string
  postal: number
  lat: number
  lng: number
  _id: string
}

interface Props {
  data?: JobApplication[]
  setSelectedData: React.Dispatch<React.SetStateAction<JobApplication | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ApplicationTable: React.FC<Props> = ({data, setSelectedData, setIsUpdateModalOpen}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Job Id
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Cleaner Id
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Status
            </th>
            {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Created At
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Updated At
            </th> */}

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((job) => (
            <tr key={job._id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link to={`/job/${job.job_id._id}`} className='text-blue-500 hover:font-medium'>
                  {job.job_id.job_title}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/cleaner/details/${job?.cleaner_id._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {`${job.cleaner_id.first_name} ${job.cleaner_id.last_name}`}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className={`${statusColors[job.status]} font-semibold text-sm`}>
                  {getStatusName(job.status)}
                </p>
              </td>

              {/* <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {new Date(job.updatedAt).toLocaleDateString()}
                </p>
              </td> */}

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(job)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <Link to={`/application/${job.id}`} className='text-blue-500 hover:font-medium'>
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

export default ApplicationTable
