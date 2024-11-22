import React, {useState, useEffect, useCallback} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {UserInterface} from 'sr/constants/User'
import {fetchWalletBalance} from 'sr/utils/api/checkWalletBalanceApi'

interface UserTableProps {
  userData: UserInterface[] | undefined
  onSelectUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
  setSelectedData: React.Dispatch<React.SetStateAction<any>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserTable: React.FC<UserTableProps> = (props) => {
  const navigate = useNavigate()
  const [walletBalances, setWalletBalances] = useState<
    Record<string, {balance: number; rewardPointBalance: number}>
  >({} as Record<string, {balance: number; rewardPointBalance: number}>)
  const [loadingBalances, setLoadingBalances] = useState<Record<string, boolean>>({})

  const handleView = (user: UserInterface) => {
    props.onSelectUser(user)
  }

  const handleUserDetail = (user: UserInterface) => {
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
                Role
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Phone
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Seller Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User Detail
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Seller Detail
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Wallet Balance
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Update User
              </th>
            </tr>
          </thead>
          <tbody>
            {props.userData?.map((user: UserInterface) => (
              <tr key={user.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {user.firstName} {user.lastName}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.role}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.email}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.phone}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      user.sellerStatus === 'approved'
                        ? 'text-green-500 font-bold font-sans'
                        : user.sellerStatus === 'rejected'
                        ? 'text-red-500 font-bold font-sans'
                        : user.sellerStatus === 'submitted'
                        ? 'text-yellow-500 font-bold font-sans'
                        : user.sellerStatus === 'pending'
                        ? 'text-pink-400 font-bold font-sans'
                        : 'font-bold font-sans'
                    }
                  >
                    {user.sellerStatus === 'approved'
                      ? 'Approved'
                      : user.sellerStatus === 'rejected'
                      ? 'Rejected'
                      : user.sellerStatus === 'pending'
                      ? 'Pending'
                      : user.sellerStatus === 'submitted'
                      ? 'Submitted'
                      : ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div onClick={() => handleUserDetail(user)}>
                    <FaEye
                      className='cursor-pointer text-blue-500 hover:text-gray-700'
                      style={{fontSize: '1.1rem'}}
                    />
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {user.sellerStatus && user.sellerStatus !== 'pending' ? (
                    <div onClick={() => handleView(user)}>
                      <FaEye
                        className='cursor-pointer text-blue-500 hover:text-gray-700'
                        style={{fontSize: '1.1rem'}}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='wallet-balance space-y-1'>
                    {walletBalances[user.id] ? (
                      <>
                        <p className='text-gray-700 font-semibold'>
                          Balance:{' '}
                          <span className='text-gray-900 font-normal'>
                            {walletBalances[user.id]?.balance}
                          </span>
                        </p>
                        <p className='text-gray-700 font-semibold'>
                          Rewards:{' '}
                          <span className='text-gray-900 font-normal'>
                            {walletBalances[user.id]?.rewardPointBalance}
                          </span>
                        </p>
                      </>
                    ) : (
                      <button
                        onClick={async () => fetchUserWallet(user.id)}
                        className='text-blue-500 hover:text-gray-700 flex items-center space-x-2'
                      >
                        {loadingBalances[user.id] ? (
                          <span>Loading...</span>
                        ) : (
                          <FaEye
                            className='cursor-pointer text-blue-500 hover:text-gray-700'
                            style={{fontSize: '1.1rem'}}
                          />
                        )}
                      </button>
                    )}
                  </div>
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
