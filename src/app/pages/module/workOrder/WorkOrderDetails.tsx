import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchSingleWorkOrder, WorkOrderResponse} from 'sr/utils/api/fetchWorkOrder'

const WorkOrderDetails: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<WorkOrderResponse | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchSingleWorkOrder(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/workorder')
  }

  if (!data) return <div>Loading...</div>
  if (isError) return <div>Error loading workorder details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Work Order Details</h2>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Column 1 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Title:</strong>
            <p>{data.title}</p>
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
            <strong className='font-medium text-lg mr-2'>Job Type:</strong>
            <p>{data.job_type}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Payment Status:</strong>
            <p>{data.payment_status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Work Order Status:</strong>
            <p>{data.workorder_status}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Status:</strong>
            <p>{data.status}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Pay Type:</strong>
            <p>{data.pay_type}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Pay Type Rate:</strong>
            <p>${data.pay_type_rate}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Entry Time:</strong>
            <p>{data.entry_time}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Exit Time:</strong>
            <p>{data.exit_time}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>One-Time Date:</strong>
            <p>{new Date(data.one_time_date).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Time for Work Completion:</strong>
            <p>{data.time_for_work_completion} hours</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Recurring:</strong>
            <p>{data.recurring ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Associated Entities */}
      <h3 className='text-2xl font-bold mt-8 mb-4'>Associated Entities</h3>
      <div className='space-y-4'>
        <div>
          <strong className='font-medium text-lg'>Contractor:</strong>
          <p>{`${data.contractor_id?.first_name} ${data.contractor_id?.last_name}`}</p>
        </div>
        <div>
          <strong className='font-medium text-lg'>Checklist Name:</strong>
          <p>{data.checklist_id?.name || 'N/A'}</p>
        </div>
        <div>
          <strong className='font-medium text-lg'>Customer:</strong>
          <p>{data.customer_id?.name || 'N/A'}</p>
        </div>
        <div>
          <strong className='font-medium text-lg'>Company Name:</strong>
          <p>{data.company_id?.company_name || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

const WorkOrderDetailsCard: React.FC = () => {
  return <DashboardWrapper customComponent={WorkOrderDetails} selectedItem='/workorder' />
}

export default WorkOrderDetailsCard
