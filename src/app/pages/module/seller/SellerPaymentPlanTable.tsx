import React from 'react'
import {FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {UserInterface} from 'sr/constants/User'
import {Button} from 'sr/helpers'

interface sellerPaymentPlanApiResponse {
  settlementDays?: number
  convenienceFee?: number
  planName?: string
  planDetails?: string
  createdBy?: UserInterface
  isActive?: boolean
  createdAt: string
  updatedAt: string
  id: string
}
interface SellerPaymentPlanTableProps {
  data: sellerPaymentPlanApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const SellerPaymentPlanTable: React.FC<SellerPaymentPlanTableProps> = (props) => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Settlement Days
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Plan Name
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Plan Details
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created By
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Convenience Fee
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {props.data?.map((plan: sellerPaymentPlanApiResponse) => (
              <tr key={plan.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{plan.settlementDays}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.planName}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.planDetails}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {plan.createdBy && (
                    <Link to={`/user/${plan.createdBy.id}`} replace>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {plan.createdBy.firstName} {plan.createdBy.lastName}
                      </p>
                    </Link>
                  )}
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.createdAt}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{plan.convenienceFee}</p>
                </td>
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

export default SellerPaymentPlanTable
