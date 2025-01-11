import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {fetchSingleProposalDetails, ProposalDetails} from 'sr/utils/api/fetchProposalDetails'

const ProposalDetailCard: React.FC<any> = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<ProposalDetails | null>(null)
  const [isError, setIsError] = useState(false)
  const cleanerMap = useSelector((state: RootState) => state.cleaner.idNameMap)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const {fetchCleanerData} = useActions()
  const fetchDataIfNeeded = useCallback(() => {
    if (cleanerStatus !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStatus, fetchCleanerData])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  useEffect(() => {
    fetchSingleProposalDetails(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/proposaldetails')
  }

  if (!data) return <div>Loading...</div>
  if (isError) return <div>Error loading workorder details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button inside the card at the top-left */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title centered */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Proposal Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Proposal ID:</strong>
            <p>{data.id}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Description:</strong>
            <p>{data.descrption}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Expected Rate:</strong>
            <p>${data.expected_rate}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Cleaner ID:</strong>
            <p>{cleanerMap[data.cleaner_id]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalDetailCard
