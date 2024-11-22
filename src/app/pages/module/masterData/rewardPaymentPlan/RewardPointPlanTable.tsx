import React from 'react'
import {FaTrash} from 'react-icons/fa'
// import {Link} from 'react-router-dom'
// import {UserInterface} from 'sr/constants/User'
// import {Button} from 'sr/helpers'
import {rewardPointPlanApiResponse} from 'sr/utils/api/rewardPointPlanApi'

interface RewardPointPlanTableProps {
  data: rewardPointPlanApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const RewardPointPlanTable: React.FC<RewardPointPlanTableProps> = (props) => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Plan Name
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Plan Details
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Max Discount Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Min Discount Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Max Discount Percentage
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Max Earned Percentage
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Max Earned Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Min Order Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Initial Reward
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Expiry Days
              </th>
              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Is Default
              </th> */}
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {props.data?.map((plan: rewardPointPlanApiResponse) => (
              <tr key={plan.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{plan.planName}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.planDetails}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.maxDiscountValue}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.minDiscountValue}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.maxDiscountPercentage}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.maxEarnedPercentage}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.maxEarnedValue}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.minOrderValue}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.defaultValue}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.defaultExpiryDays}</p>
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
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
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
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      plan.isDefault
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {plan.isDefault ? 'Yes' : 'No'}
                  </p>
                </td> */}

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

export default RewardPointPlanTable
