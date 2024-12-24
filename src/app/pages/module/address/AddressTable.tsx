import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Address, AddressData} from 'sr/utils/api/addressApi'

interface AddressTableProps {
  addressData: AddressData[] | undefined
  onSelectAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedData: React.Dispatch<React.SetStateAction<AddressData | undefined>>
}

const AddressTable: React.FC<AddressTableProps> = (props) => {
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Address Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Rooms Count
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Bathroom Count
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Total Area
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Remark
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.addressData?.map((address) => (
              <tr key={address.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{address.address_type}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.no_of_rooms}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.no_of_bath}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.total_area}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.remark}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p
                    className={`whitespace-no-wrap ${
                      address.status === 'active'
                        ? 'text-green-500'
                        : address.status === 'inactive'
                        ? 'text-red-500'
                        : 'text-gray-500' // Default color for unknown statuses
                    }`}
                  >
                    {address.status}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        props.setSelectedData(address)
                        props.setIsUpdateModalOpen(true)
                      }}
                    />
                    <FaEye
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        props.onSelectAddress(address.address)
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

export default AddressTable
