import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {BranchType, fetchSingleBranch} from 'sr/utils/api/branchApi'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

const BranchDetails: React.FC<any> = () => {
  const navigate = useNavigate()

  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<BranchType>()
  const [isError, setIsError] = useState(false)
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore.status, fetchCompanyData])

  useEffect(() => {
    fetchSingleBranch(id || '')
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [id])

  const onGoBack = () => {
    navigate('/company/branch')
  }

  if (data === undefined) return <div>Loading...</div>
  if (isError) return <div>Error loading branch details.</div>

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
      {/* Go Back Button */}
      <Button
        onClick={onGoBack}
        label='Go Back 🡸'
        className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full absolute top-4 left-4'
      />

      {/* Title */}
      <h2 className='text-4xl font-bold mb-6 text-center'>Branch Details</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Company Id:</strong>
            <p>{companyStore.idNameMap[data.company_id]}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Branch Type:</strong>
            <p>{data.type}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Default Branch:</strong>
            <p>{data.isDefaultBranch === true ? 'Yes' : 'No'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Phone Number:</strong>
            <p>{data.phone_number}</p>
          </div>
        </div>
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
            <strong className='font-medium text-lg mr-2'>Update At:</strong>
            <p>{data.updatedAt || 'Not Available'}</p>
          </div>
        </div>
      </div>

      <h3 className='text-2xl font-bold mt-8 mb-4'>Branch Address</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 1:</strong>
            <p>{data.address.address_line_1 || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Address Line 2:</strong>
            <p>{data.address.address_line_2 || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Country:</strong>
            <p>{data.address.country || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>City:</strong>
            <p>{data.address.city || 'Not Available'}</p>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>State:</strong>
            <p>{data.address.state || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Postal Code:</strong>
            <p>{data.address.postal || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Latitude:</strong>
            <p>{data.address.lat || 'Not Available'}</p>
          </div>
          <div className='flex items-center'>
            <strong className='font-medium text-lg mr-2'>Longitute:</strong>
            <p>{data.address.lng || 'Not Available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const BranchDetailsCard: React.FC = () => {
  return <DashboardWrapper customComponent={BranchDetails} selectedItem='/job-details' />
}

export default BranchDetailsCard
