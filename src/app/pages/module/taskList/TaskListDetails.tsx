import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {fetchSingleTaskList, TaskListDetails} from 'sr/utils/api/fetchTaskList'

const TaskListDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<TaskListDetails>()
  const [isError, setIsError] = useState(false)
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
    navigate('/tasklist')
  }

  if (!data) return <div>Loading...</div>
  if (isError) return <div>Error loading tasklist details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>TaskList Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>TaskList ID:</strong>
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
            <p>{checklistMap[data.checklist_id]}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company ID:</strong>
            <p>{companyMap[data.company_id]}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Customer ID:</strong>
            <p>{customerMap[data.customer_id]}</p>
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
