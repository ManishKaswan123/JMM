import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleFabricTxn} from '../fabricTxnHooks'

const FabricTxnDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleFabricTxn()

  if (isError)
    return <div className='text-red-500 text-center'>Error loading task Fabric Txn details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='FabricTxn Details'
        col1={['Id', 'Reciever', 'From', 'Amount', 'Token', 'Data']}
        col2={['Last 4', 'Brand', 'Type', 'Created At', 'Updated At']}
      />
    )

  const details = [
    [
      {label: 'Id', value: data.id},
      {label: 'Reciever', value: data.to},
      {label: 'From', value: data.from},
      {label: 'Amount', value: data.amount},
      {label: 'Token', value: data.tokenId},
      {label: 'Data', value: data.data},
    ],
    [
      {label: 'Last 4', value: data.last4},
      {label: 'Brand', value: data.brand},
      {label: 'Type', value: data.type},
      {label: 'Created At', value: data.createdAt},
      {label: 'Updated At', value: data.updatedAt},
    ],
  ]

  return (
    <DetailCard
      title='FabricTxn Details'
      details={details}
      onGoBack={() => navigate('/fabrictxn')}
    />
  )
}

export default FabricTxnDetailsCard
