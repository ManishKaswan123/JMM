import React from 'react'
import {useQuery} from '@tanstack/react-query'
import {fetchWalletBalance} from 'sr/utils/api/checkWalletBalanceApi'

const CheckWalletBalance: React.FC = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['walletBalance'],
    queryFn: async () => fetchWalletBalance({}),
  })

  if (isLoading) return <p>Loading balance...</p>
  if (isError) return <p>Error fetching wallet balance.</p>

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <h2 className='text-2xl font-semibold mb-4'>Wallet Balance</h2>
      <div className='bg-gray-100 p-4 rounded shadow'>
        <p>
          <strong>Balance:</strong> {data?.balance.balance}
        </p>
        <p>
          <strong>Reward Points:</strong> {data?.balance.rewardPointBalance}
        </p>
      </div>
    </div>
  )
}

export default CheckWalletBalance
