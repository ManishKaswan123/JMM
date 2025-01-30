import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {fetchSingleNote, NotesResponse} from 'sr/utils/api/notesApi'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'

const NotesDetails: React.FC<any> = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<NotesResponse>()
  const [isError, setIsError] = useState(false)
  const companyMap = useSelector((state: RootState) => state.company.idNameMap)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const {fetchCompanyData} = useActions()
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  useEffect(() => {
    fetchSingleNote(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/notes')
  }
  if (data === undefined)
    return (
      <SkeletonCard
        label='Note Details'
        col1={'Note ID,Company,Applicant ID,Notes'.split(',')}
        col2={'Created At,Updated At,Version'.split(',')}
      />
    )
  if (isError) return <div>Error loading note details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button inside the card at the top-left */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title centered */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Note Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Note ID:</strong>
            <p>{data.id}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company:</strong>
            <p>{companyMap[data.company_id]}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Applicant ID:</strong>
            <p>{data.applicant_id}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Notes:</strong>
            <p>{data.notes}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Updated At:</strong>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>
          </div>

          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Version:</strong>
            <p>{data.__v}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesDetails
