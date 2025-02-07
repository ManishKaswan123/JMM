import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {fetchSingleTaskList, TaskListDetails} from 'sr/utils/api/fetchTaskList'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {Status} from 'sr/utils/api/globalInterface'

const TaskListDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<TaskListDetails>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleTaskList(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/task')
  }

  if (!data)
    return (
      <SkeletonCard
        label='TaskList Details'
        col1={'TaskList ID,Name,Description,Type,Checklist ID'.split(',')}
        col2={'Status,Company ID,Customer ID,Created At,Updated At'.split(',')}
      />
    )
  if (isError) return <div>Error loading task details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Task Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Task ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Name:</strong>
            <p>{data.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Description:</strong>
            <p>{data.description}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Type:</strong>
            <p>{data.type}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Checklist ID:</strong>
            <p>{data.checklist_id?.name}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{getStatusName(data.status as Status)}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company ID:</strong>
            <p>{data.company_id?.company_name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Customer ID:</strong>
            <p>{data.customer_id?.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Images and Videos */}
      <div className='mt-8'>
        <h3 className='text-2xl font-semibold mb-4'>Media</h3>

        {/* Images */}
        <div className='space-y-2'>
          <strong className='block'>Images:</strong>
          {data.images.length > 0 ? (
            <div className='grid grid-cols-2 gap-4'>
              {data.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Task Image ${idx + 1}`}
                  className='w-full h-auto rounded-lg shadow-md'
                />
              ))}
            </div>
          ) : (
            <p>No Images Available</p>
          )}
        </div>

        {/* Videos */}
        <div className='mt-4'>
          <strong className='block'>Videos:</strong>
          {data.videos.length > 0 ? (
            <div className='space-y-4'>
              {data.videos.map((video, idx) => (
                <video key={idx} controls src={video} className='w-full rounded-lg shadow-md'>
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          ) : (
            <p>No Videos Available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskListDetailsCard
