import React, {useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {useNavigate, useParams} from 'react-router-dom'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import ApiResponse from './86ResponseTypes'
import {fetchSingle86Response} from 'sr/utils/api/86Response'

const Custom: React.FC<any> = () => {
  const navigate = useNavigate()
  const {responseId} = useParams<{responseId: string}>()
  const [eightySixResponse, setEightySixResponse] = useState<ApiResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        if (responseId) {
          const response = await fetchSingle86Response(responseId)

          setEightySixResponse(response)
        }
      } catch (error) {
        console.error('Error fetching 86 eightySixResponse:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [responseId])

  const onGoBack = () => {
    navigate('/86-Response')
  }

  return (
    <>
      {!isLoading ? (
        <>
          {eightySixResponse && (
            // <div className=' w-full flex justify-center items-center h-screen'>
            <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
              <h2 className='text-2xl font-bold mb-6'>86 eightySixResponse Details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='mb-4'>
                    <strong className='font-medium'>Sender Read:</strong>{' '}
                    {eightySixResponse.senderIsRead ? 'Yes' : 'No'}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Receiver Read:</strong>{' '}
                    {eightySixResponse.receiverIsRead ? 'Yes' : 'No'}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Cart Status:</strong>{' '}
                    {eightySixResponse.cartStatus}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Type:</strong> {eightySixResponse.type}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Message:</strong> {eightySixResponse.message}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Offer Amount:</strong> $
                    {eightySixResponse.offerAmount}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Status:</strong> {eightySixResponse.status}
                  </p>
                </div>
                <div>
                  <p className='mb-4'>
                    <strong className='font-medium'>Delivery Type:</strong>{' '}
                    {eightySixResponse.deliveryType}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Created At:</strong>{' '}
                    {new Date(eightySixResponse.createdAt || '').toLocaleString()}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Updated At:</strong>{' '}
                    {new Date(eightySixResponse.updatedAt || '').toLocaleString()}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>EightySix Details:</strong>{' '}
                    {eightySixResponse.eightySix && (
                      <a href={`/86/${eightySixResponse.eightySix?.id}`} className='text-blue-500'>
                        View
                      </a>
                    )}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Sender Details:</strong>{' '}
                    {eightySixResponse.senderId && (
                      <a href={`/user/${eightySixResponse.senderId?.id}`} className='text-blue-500'>
                        View
                      </a>
                    )}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Receiver Details:</strong>{' '}
                    {eightySixResponse.receiverId && (
                      <a
                        href={`/user/${eightySixResponse.receiverId?.id}`}
                        className='text-blue-500'
                      >
                        View
                      </a>
                    )}
                  </p>
                </div>
              </div>

              <div className='mt-8 flex justify-between items-center'>
                <Button
                  className='bg-white text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                  onClick={onGoBack}
                  label={'Go Back 🡸'}
                />
              </div>
            </div>
            // </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

const EightySixResponseDetailsCard: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/eightySixResponse' />
}

export default EightySixResponseDetailsCard
