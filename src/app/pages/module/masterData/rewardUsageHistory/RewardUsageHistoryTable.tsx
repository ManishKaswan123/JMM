import React, {useCallback, useEffect} from 'react'
import {FaTrash} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
// import {Link} from 'react-router-dom'
// import {UserInterface} from 'sr/constants/User'
// import {Button} from 'sr/helpers'
import {rewardPointPlanApiResponse} from 'sr/utils/api/rewardPointPlanApi'
import {rewardUsageApiResponse} from 'sr/utils/api/rewardUsageHistory'
import {formatAmountToDollars} from 'sr/utils/helpers/formatDate'
import {useActions} from 'sr/utils/helpers/useActions'

interface RewardUsageTableProps {
  data: rewardUsageApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const RewardUsageHistoryTable: React.FC<RewardUsageTableProps> = (props) => {
  const userMap = useSelector((state: RootState) => state.user.userMap)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const rewardPointData = useSelector((state: RootState) => state.rewardPointMap.data)
  const rewardPointStatus = useSelector((state: RootState) => state.rewardPointMap.status)
  const {fetchUserData, fetchRewardPointMap} = useActions()
  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') fetchUserData({})
    if (rewardPointStatus !== 'succeeded') fetchRewardPointMap({})
  }, [userStatus, fetchUserData, rewardPointStatus, fetchRewardPointMap])
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
                Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Remarks
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Reward Earning
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created By
              </th>
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
            {props.data?.map((plan: rewardUsageApiResponse) => (
              <tr key={plan.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {formatAmountToDollars(plan.amount)}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan?.remarks}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{userMap[plan.userId]?.firstName + ' ' + userMap[plan.userId]?.lastName}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.rewardPointId.details}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>
                    {userMap[plan.createdBy]?.firstName + ' ' + userMap[plan.createdBy]?.lastName}
                  </p>
                </td>

                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {plan.createdBy && (
                    <Link to={`/user/${plan.createdBy.id}`} replace>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {plan.createdBy.firstName} {plan.createdBy.lastName}
                      </p>
                    </Link>
                  )}
                </td> */}
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.createdAt}</p>
                </td> */}
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.convenienceFee}</p>
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

export default RewardUsageHistoryTable
