import React from 'react'
import {FaEye} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {WorkorderApplication} from 'sr/utils/api/workorderApplicationApi'

interface Props {
  data?: WorkorderApplication[]
}
const WorkorderApplicationTable: React.FC<Props> = ({data}) => {
  const navigate = useNavigate()
  const handleWorkorderApplicationDetail = (workorderApplicagtion: WorkorderApplication) => {
    navigate(`/workorderapplication/${workorderApplicagtion.id}`)
  }

  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Workorder
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Cleaner
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
          {data?.map((workorder) => (
            <tr key={workorder.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/workorder/${workorder.workorder_id._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {workorder.workorder_id.title}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/cleaner/details/${workorder.cleaner_id._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {workorder.cleaner_id.first_name} {workorder.cleaner_id.last_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>{workorder.status}</td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <FaEye
                  className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                  onClick={() => {
                    // setUser(type === 'cleaner' ? cleaner.id : cleaner._id)
                    handleWorkorderApplicationDetail(workorder)
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

export default WorkorderApplicationTable
