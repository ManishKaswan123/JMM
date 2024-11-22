import React from 'react'
import {FaCheck, FaEdit, FaTimes, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {EightySixApiResponse} from 'sr/utils/api/fetch86'

interface EightySixTableProps {
  setSelectedData: React.Dispatch<React.SetStateAction<EightySixApiResponse | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  eightSixItems: EightySixApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const EightSixTable: React.FC<EightySixTableProps> = ({
  setSelectedData,
  setIsUpdateModalOpen,
  eightSixItems,
  onDelete,
}) => {
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
                Quantity
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Willing To Pay
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Delivery
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Published
              </th>

              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {eightSixItems?.map((item: EightySixApiResponse) => (
              <tr key={item.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{item.title}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.quantity}</p>
                </td>
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <Link to={`/user/${item.userId}`}>
                    <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                      {item?.userId?.firstName}
                    </p>
                  </Link>
                </td> */}
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {item.userId && (
                    <Link to={`/user/${item?.userId?.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {item.userId.firstName} {item.userId.lastName}
                      </p>
                    </Link>
                  )}
                </td>
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      item?.isWillingToPay === true
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {item?.isWillingToPay === true ? 'Yes' : 'No'}
                  </p>
                </td> */}
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {item.isWillingToPay ? (
                    <FaCheck className='text-green-500' />
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{item.status}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.delivery}</p>
                </td>
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      item?.isPublished === true
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {item?.isPublished === true ? 'Yes' : 'No'}
                  </p>
                </td> */}
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {item.isPublished ? (
                    <FaCheck className='text-green-500' />
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{item.description}</p>
                </td>

                <td className='p-5 border-b border-gray-200 text-sm'>
                  <div className='flex'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        setSelectedData(item)
                        setIsUpdateModalOpen(true)
                      }}
                    />
                    <FaTrash
                      className='text-red-500 cursor-pointer ml-4 h-4 w-4'
                      onClick={async () => {
                        await onDelete(item?.id)
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EightSixTable
