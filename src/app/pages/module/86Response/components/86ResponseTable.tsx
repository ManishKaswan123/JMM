import React from 'react'
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import ApiResponse from './86ResponseTypes'
interface EightSixTableProps {
  setSelectedData: React.Dispatch<React.SetStateAction<ApiResponse | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  eightySixResponseItems: ApiResponse[] | undefined
  onDelete: (id: string) => void
}

const EightSixResponseTable: React.FC<EightSixTableProps> = ({
  setSelectedData,
  setIsUpdateModalOpen,
  eightySixResponseItems,
  onDelete,
}) => {
  const navigate = useNavigate()
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Sender
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Receiver
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Eighty Six
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Cart Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Type
              </th>
              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Eighty Six
              </th> */}
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Read By Sender
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Read By Receiver
              </th>

              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Message
              </th> */}
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Offer Amount
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Delivery Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {eightySixResponseItems?.map((item: ApiResponse) => (
              <tr key={item.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {item.senderId?.firstName ? (
                    <Link to={`/user/${item.senderId.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {item.senderId.firstName}
                      </p>
                    </Link>
                  ) : (
                    <p className='text-gray-900 whitespace-no-wrap'>NA</p>
                  )}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {item.receiverId?.firstName ? (
                    <Link to={`/user/${item.receiverId.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {item.receiverId.firstName}
                      </p>
                    </Link>
                  ) : (
                    <p className='text-gray-900 whitespace-no-wrap'>NA</p>
                  )}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {item.eightySix ? (
                    <Link to={`/86/${item.eightySix.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>View</p>
                    </Link>
                  ) : (
                    <p className='text-gray-900 whitespace-no-wrap'>NA</p>
                  )}
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.cartStatus ? item.cartStatus : 'NA'}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.type ? item.type : 'NA'}</p>
                </td>
                {/* <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.eightySix ? item.eightySix.id : 'NA'}</p>
                </td> */}
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.senderIsRead ? (item.senderIsRead == true ? 'Yes' : 'No') : 'NA'}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.receiverIsRead ? (item.receiverIsRead == true ? 'Yes' : 'No') : 'NA'}</p>
                </td>
                {/* <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.message ? item.message : 'NA'}</p>
                </td> */}
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.offerAmount ? item.offerAmount : 'NA'}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.status ? item.status : 'NA'}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{item.deliveryType ? item.deliveryType : 'NA'}</p>
                </td>

                <td className='p-5 border-b border-gray-200 text-sm'>
                  <div className='flex'>
                    <FaEye
                      className='text-blue-500 cursor-pointer mr-2 h-4 w-4'
                      onClick={() => {
                        // Replace '/path-to-details-page' with the actual path
                        navigate(`/86-response/${item.id}`)
                        // window.location.href = `/eightySixResponse/${item.id}`
                      }}
                    />
                    <FaEdit
                      className='text-blue-500 cursor-pointer mx-2 h-4 w-4'
                      onClick={() => {
                        setSelectedData(item)
                        setIsUpdateModalOpen(true)
                      }}
                    />

                    <FaTrash
                      className='text-red-500 cursor-pointer ml-2 h-4 w-4'
                      onClick={() => onDelete(item?.id)}
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

export default EightSixResponseTable
