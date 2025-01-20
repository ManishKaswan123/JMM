import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {fetchCompanyDetail} from 'sr/utils/api/fetchCompanyAddInfo'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {NoResults} from 'sr/helpers/ui-components/NoResults'
import {FieldsArray} from 'sr/constants/fields'
import {useCreateCompanyDetails} from 'sr/utils/api/createCompanyDetails'
import {useUpdateCompanyDetails} from 'sr/utils/api/updateCompanyDetails'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'

interface CreatePayload {
  company_id: string
  company_website: string
  social_link_fb?: string
  social_link_twitter?: string
  no_of_employees: number
  date_format: string
  date_of_incorporation: string
  annual_revenue: number
  number_of_branches: number
  no_of_clients: number
  about_company: string
}
interface UpdatePayload extends CreatePayload {}

const CompanyAddInfoCard: React.FC<any> = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const {company_id} = useParams<{company_id: string}>()
  const companyMap = useSelector((state: RootState) => state.company.idNameMap)
  const companyStatus = useSelector((state: RootState) => state.company.status)
  const {fetchCompanyData} = useActions()
  const createMutation = useCreateCompanyDetails()
  const updateMutation = useUpdateCompanyDetails()

  const createAndUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Website',
        name: 'company_website',
        placeholder: 'Website',
        required: true,
      },
      {
        type: 'text',
        label: 'Facebook Link',
        name: 'social_link_fb',
        placeholder: 'Facebook Link',
      },
      {
        type: 'text',
        label: 'Twitter Link',
        name: 'social_link_twitter',
        placeholder: 'Twitter Link',
      },

      {
        type: 'date',
        label: 'Date of Incorporation',
        name: 'date_of_incorporation',
        placeholder: 'Date of Incorporation',
        required: true,
      },
      {
        type: 'number',
        label: 'No. of Employees',
        name: 'no_of_employees',
        placeholder: 'No. of Employees',
        required: true,
      },
      {
        type: 'number',
        label: 'Annual Revenue',
        name: 'annual_revenue',
        placeholder: 'Annual Revenue',
        required: true,
      },
      {
        type: 'number',
        label: 'Number of Branches',
        name: 'number_of_branches',
        placeholder: 'Number of Branches',
        required: true,
      },
      {
        type: 'number',
        label: 'Number of Clients',
        name: 'no_of_clients',
        placeholder: 'Number of Clients',
        required: true,
      },
      {
        type: 'textarea',
        label: 'About Company',
        name: 'about_company',
        placeholder: 'About Company',
        required: true,
      },
    ],
    []
  )
  const onSuccess = (action: string) => {
    if (action === 'create') setIsCreateModalOpen(false)
    else if (action === 'update') setIsUpdateModalOpen(false)
  }
  const fetchUserDataIfNeeded = useCallback(() => {
    if (companyStatus !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStatus, fetchCompanyData])
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const {data, isLoading} = useQuery({
    queryKey: ['companyAddInfo', {company_id}],
    queryFn: async () => fetchCompanyDetail(company_id || ''),
  })

  const onGoBack = () => {
    navigate('/company')
  }
  const handleCreateAdditionalInfo = async (payload: Record<string, any>) => {
    const data: CreatePayload = {
      company_id: company_id || '',
      company_website: payload.company_website,
      social_link_fb: payload.social_link_fb,
      social_link_twitter: payload.social_link_twitter,
      no_of_employees: payload.no_of_employees,
      date_format: 'YYYY-MM-DD',
      date_of_incorporation: payload.date_of_incorporation,
      annual_revenue: payload.annual_revenue,
      number_of_branches: payload.number_of_branches,
      no_of_clients: payload.no_of_clients,
      about_company: payload.about_company,
    }
    createMutation.mutate({payload: data, onSuccess})
  }
  const handleEditAdditionalInfo = async (payload: Record<string, any>) => {
    if (!data?.data) {
      setIsUpdateModalOpen(false)
      return
    }
    const payload_data: UpdatePayload = {
      company_id: company_id || '',
      company_website: payload.company_website,
      social_link_fb: payload.social_link_fb,
      social_link_twitter: payload.social_link_twitter,
      no_of_employees: payload.no_of_employees,
      date_format: 'YYYY-MM-DD',
      date_of_incorporation: payload.date_of_incorporation,
      annual_revenue: payload.annual_revenue,
      number_of_branches: payload.number_of_branches,
      no_of_clients: payload.no_of_clients,
      about_company: payload.about_company,
    }
    updateMutation.mutate({payload: payload_data, onSuccess})
  }
  const defaultValues: Record<string, any> | undefined = useMemo(() => {
    if (!data?.data) return undefined
    return {
      company_website: data.data.company_website,
      social_link_fb: data.data.social_link_fb,
      social_link_twitter: data.data.social_link_twitter,
      no_of_employees: data.data.no_of_employees,
      date_format: data.data.date_format,
      date_of_incorporation: (() => {
        const date = new Date(data.data.date_of_incorporation || '')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      })(),
      annual_revenue: data.data.annual_revenue,
      number_of_branches: data.data.number_of_branches,
      no_of_clients: data.data.no_of_clients,
      about_company: data.data.about_company,
    }
  }, [data])
  if (isLoading)
    return (
      <SkeletonCard
        label='Company Details'
        col1={'Company Name,Website,Employees,Date Format,Date of Incorporation'.split(',')}
        col2={'Annual Revenue,Branches,Clients,Created At,Updated At'.split(',')}
      />
    )

  return (
    <>
      {!data ? (
        <div className='w-full h-full'>
          <NoResults />
          <div className='flex items-center justify-center  space-x-4'>
            <Button
              onClick={onGoBack}
              label='Go Back 🡸'
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full'
            />
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              label='Add Info'
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full'
            />
          </div>
        </div>
      ) : (
        <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8 w-full relative'>
          {/* Go Back Button inside the card at the top-left */}
          <div className='flex justify-between items-center mb-6 '>
            <Button
              onClick={onGoBack}
              label='Go Back 🡸'
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full '
            />
            {/* Title centered */}
            <h2 className='text-4xl font-bold text-center'>Company Additional Info</h2>
            <Button
              onClick={() => setIsUpdateModalOpen(true)}
              label='Edit Details'
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full '
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Company Name:</strong>
                <p>{companyMap[data.data.company_id]}</p>
              </div>

              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Website:</strong>
                <a
                  href={data.data.company_website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  {data.data.company_website}
                </a>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Employees:</strong>
                <p>{data.data.no_of_employees}</p>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Date Format:</strong>
                <p>{data.data.date_format || 'Not Available'}</p>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Date of Incorporation:</strong>
                <p>{data.data.date_of_incorporation || 'Not Available'}</p>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Annual Revenue:</strong>
                <p>{data.data.annual_revenue}</p>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Number of Branches:</strong>
                <p>{data.data.number_of_branches}</p>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Number of Clients:</strong>
                <p>{data.data.no_of_clients}</p>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Created At:</strong>
                <p>{new Date(data.data.createdAt).toLocaleString()}</p>
              </div>
              <div className='flex items-center'>
                <strong className='font-medium text-lg mr-2'>Updated At:</strong>
                <p>{new Date(data.data.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className='items-center mt-4'>
            <strong className='font-medium text-lg mr-2'>About Company:</strong>
          </div>
          <div className='items-center'>
            <p>{data.data.about_company}</p>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <DynamicModal
          label='Create Company Details'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createAndUpdateFields}
          onSubmit={handleCreateAdditionalInfo}
        />
      )}
      {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          label='Update Company'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createAndUpdateFields}
          defaultValues={defaultValues}
          onSubmit={handleEditAdditionalInfo}
        />
      )}
    </>
  )
}

export default CompanyAddInfoCard
