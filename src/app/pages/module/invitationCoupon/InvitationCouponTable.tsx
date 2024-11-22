import React from 'react'
import {FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {UserInterface} from 'sr/constants/User'
interface invitationCodeApiResponse {
  title?: string
  descriptions?: string
  noOfTimeUsed?: number
  noOfTimeUses?: number
  code?: string
  expiryDate?: string
  createdBy?: UserInterface
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  id: string
}
interface invitationCodeTableProps {
  invCoupons: invitationCodeApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const InvitationCouponTable: React.FC<invitationCodeTableProps> = ({invCoupons, onDelete}) => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Title
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Invitation Code
              </th>
              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Description
              </th> */}
              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Usage Type
              </th> */}
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                No. of Max Usage
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                No. of Times Used
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Exp Date
              </th>

              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created By
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
            {invCoupons?.map((coupon: invitationCodeApiResponse) => (
              <tr key={coupon.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  {coupon.title ? (
                    <p className='text-gray-900 whitespace-no-wrap'>{coupon.title}</p>
                  ) : (
                    <p className='text-gray-500'>...</p>
                  )}
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{coupon.code}</p>
                </td>
                {/* <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{coupon.descriptions}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{coupon.noOfTimeUses > 1 ? 'Multiple' : 'One Time'}</p>
                </td> */}
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{coupon.noOfTimeUses}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{coupon.noOfTimeUsed}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm '>
                  <p>{coupon.expiryDate}</p>
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{coupon.createdAt}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {coupon.createdBy && (
                    <Link to={`/user/${coupon.createdBy.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {coupon.createdBy.firstName}
                      </p>
                    </Link>
                  )}
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      coupon.isActive === true
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {coupon.isActive === true ? 'Active' : 'Inactive'}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm items-start '>
                  {coupon.isActive == true && (
                    <FaTrash
                      className='text-red-500 cursor-pointer h-4 w-4'
                      onClick={async () => {
                        await onDelete(coupon.id)
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

export default InvitationCouponTable
