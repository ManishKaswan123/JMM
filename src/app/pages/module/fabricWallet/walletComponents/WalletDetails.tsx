import React from 'react'
import {useNavigate} from 'react-router-dom'
import SkeletonCard from 'sr/helpers/ui-components/SkeletonCard'
import DetailCard from 'sr/helpers/ui-components/DetailCard'
import {useFetchSingleWallet} from '../walletHooks'

const WalletDetailsCard: React.FC = () => {
  const navigate = useNavigate()
  const {data, isError} = useFetchSingleWallet()

  if (isError) return <div className='text-red-500 text-center'>Error loading Wallet details.</div>

  if (!data)
    return (
      <SkeletonCard
        label='Wallet Details'
        col1={['ID', 'Type', 'Owner Type', 'Owner ID', 'Wallet DB Id']}
        col2={['Address', 'Status', 'Created At', 'Updated At']}
      />
    )

  const details = [
    [
      {label: 'ID', value: data.id},
      {label: 'Type', value: data.type},
      {label: 'Owner Type', value: data.owner_type},
      {label: 'Owner ID', value: data.owner_id},
      {label: 'Wallet DB Id', value: data.wallet_db_id},
    ],
    [
      {label: 'Address', value: data.address},
      {label: 'Status', value: data.status},
      {label: 'Created At', value: new Date(data.createdAt).toLocaleString()},
      {label: 'Updated At', value: new Date(data.updatedAt).toLocaleString()},
    ],
  ]

  return (
    <DetailCard title='Wallet Details' details={details} onGoBack={() => navigate('/wallet')} />
  )
}

export default WalletDetailsCard
