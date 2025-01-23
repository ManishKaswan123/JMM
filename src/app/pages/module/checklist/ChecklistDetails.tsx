import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {Checklist, fetchSingleChecklist} from 'sr/utils/api/checklistApi'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

const ChecklistDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<Checklist>()
  const [isError, setIsError] = useState(false)
  const taskStore = useSelector((state: RootState) => state.task)
  const {fetchTaskData} = useActions()
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  const fetchDataIfNeeded = useCallback(() => {
    if (taskStore.status !== 'succeeded') {
      fetchTaskData({})
    }
  }, [fetchTaskData, taskStore.status])

  useEffect(() => {
    fetchSingleChecklist(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/checklist')
  }

  if (!data)
    return (
      <SkeletonCard
        label='Checklist Details'
        col1={'Checklist ID,Name,Type,Subtype,Status,Remarks'.split(',')}
        col2={'Company Name,Customer Name,Task IDs,Created At,Updated At'.split(',')}
      />
    )
  if (isError) return <div>Error loading checklist details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Checklist Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Checklist ID:</strong>
            <p>{data.id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Name:</strong>
            <p>{data.name}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Type:</strong>
            <p>{data.type}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Subtype:</strong>
            <p>{data.subtype || 'N/A'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Remarks:</strong>
            <p>{data.remarks}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company Name:</strong>
            <p>{data.company_id?.company_name || 'N/A'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Customer Name:</strong>
            <p>{data.customer_id?.name || 'N/A'}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Taks IDs:</strong>
            <p>{data.task_ids.map((item) => taskStore.idNameMap[item]).join(', ') || 'No tasks'}</p>
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
    </div>
  )
}

export default ChecklistDetailsCard
