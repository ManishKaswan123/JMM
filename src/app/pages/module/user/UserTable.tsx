import React, {useState, useEffect, useCallback} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {fetchWalletBalance} from 'sr/utils/api/checkWalletBalanceApi'
import {Individual} from 'sr/utils/api/individualApi'

interface UserTableProps {
  userData: Individual[] | undefined
  onSelectUser: React.Dispatch<React.SetStateAction<Individual | undefined>>
  setSelectedData: React.Dispatch<React.SetStateAction<any>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserTable: React.FC<UserTableProps> = (props) => {
  const navigate = useNavigate()
  const [walletBalances, setWalletBalances] = useState<
    Record<string, {balance: number; rewardPointBalance: number}>
  >({} as Record<string, {balance: number; rewardPointBalance: number}>)
  const [loadingBalances, setLoadingBalances] = useState<Record<string, boolean>>({})

  const handleView = (user: Individual) => {
    props.onSelectUser(user)
  }

  const handleUserDetail = (user: Individual) => {
    navigate(`/user/${user.id}`)
  }

  const fetchUserWallet = useCallback(async (userId: string) => {
    setLoadingBalances((prev) => ({...prev, [userId]: true}))
    try {
      const res = await fetchWalletBalance({userId})
      setWalletBalances((prev) => ({
        ...prev,
        [userId]: {
          balance: res.balance.balance,
          rewardPointBalance: res.balance.rewardPointBalance,
        },
      }))
    } catch (error) {
      console.error('Failed to fetch wallet balance', error)
    } finally {
      setLoadingBalances((prev) => ({...prev, [userId]: false}))
    }
  }, [])

  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              {/* Table headers */}

              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User Name
              </th>

              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Phone
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>

              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Update User
              </th>
            </tr>
          </thead>
          <tbody>
            {props.userData?.map((user: Individual) => (
              <tr key={user.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {user.first_name} {user.last_name}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.email}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.mobile_number}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.status}</p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      props.setSelectedData(user)
                      props.setIsUpdateModalOpen(true)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable
