import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {
  fetchSingleWorkorderApplication,
  WorkorderApplication,
} from 'sr/utils/api/workorderApplicationApi'
import {Link} from 'react-router-dom'

const WorkOrderApplicationDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<WorkorderApplication | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleWorkorderApplication(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/workorderapplication')
  }

  if (!data)
    return (
      <SkeletonCard
        label='Work Order Application Details'
        col1={'Id,Work Order,Cleaner'.split(',')}
        col2={'Status,Created At,Updated At'.split(',')}
      />
    )
  if (isError) return <div>Error loading workorder application details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Work Order Application Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Id:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Work Order:</strong>
            <Link
              to={`/workorder/${data.workorder_id._id}`}
              className='text-blue-500 hover:font-medium'
            >
              {data.workorder_id.title}
            </Link>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Cleaner:</strong>
            <Link
              to={`/cleaner/details/${data.cleaner_id._id}`}
              className='text-blue-500 hover:font-medium'
            >
              {data.cleaner_id.first_name} {data.cleaner_id.last_name}
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{data.createdAt}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{data.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkOrderApplicationDetailsCard
