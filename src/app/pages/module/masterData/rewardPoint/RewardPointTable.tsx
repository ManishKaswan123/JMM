import React, {useCallback, useEffect} from 'react'
import {FaTrash} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
// import {Link} from 'react-router-dom'
// import {UserInterface} from 'sr/constants/User'
// import {Button} from 'sr/helpers'
import {rewardPointApiResponse} from 'sr/utils/api/rewardPointApi'
import {formatAmountToDollars, formatDateToMMDDYYYYWithET} from 'sr/utils/helpers/formatDate'
import {useActions} from 'sr/utils/helpers/useActions'

interface RewardPointTableProps {
  data: rewardPointApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const RewardPointTable: React.FC<RewardPointTableProps> = (props) => {
  const userMap = useSelector((state: RootState) => state.user.userMap)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const rewardPlanMap = useSelector((state: RootState) => state.rewardPlanMap.planMap)
  const rewardPlanMapStatus = useSelector((state: RootState) => state.rewardPlanMap.status)
  const {fetchUserData, fetchRewardPlanMap} = useActions()
  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') fetchUserData({})
    if (rewardPlanMapStatus !== 'succeeded') fetchRewardPlanMap({})
  }, [userStatus, fetchUserData, rewardPlanMapStatus, fetchRewardPlanMap])
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [fetchUserDataIfNeeded])
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Max Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Details
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Expiry Date(MM/DD/YYYY, ET)
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Reward Point Plan
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Expired
              </th>
              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created By
              </th> */}
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {props.data?.map((plan: rewardPointApiResponse) => (
              <tr key={plan.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {formatAmountToDollars(plan.maxValue)}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.details}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{formatDateToMMDDYYYYWithET(plan.expiryDate)}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{rewardPlanMap[plan.rewardPointPlanId]?.planName}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{userMap[plan.userId]?.firstName + ' ' + userMap[plan.userId]?.lastName}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      plan.isExpired
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {plan.isExpired ? 'Yes' : 'No'}
                  </p>
                </td>
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.createdBy}</p>
                </td> */}
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      plan.isActive
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {plan.isActive && (
                    <FaTrash
                      className='text-red-500 cursor-pointer h-4 w-4'
                      onClick={async () => {
                        await props.onDelete(plan.id)
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RewardPointTable
