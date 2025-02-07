import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {statusColors} from 'sr/constants/common'
import {getStatusName} from 'sr/helpers/globalHelpers'
import {AddressData} from 'sr/utils/api/addressApi'

interface AddressTableProps {
  addressData: AddressData[] | undefined
  onSelectAddress: React.Dispatch<React.SetStateAction<AddressData | undefined>>
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
                Address 1
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Address 2
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                City
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                State
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Zip Code
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Country
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
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {address.address.address_line_1}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.address.address_line_2}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.address.city}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.address.city}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.address.postal}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{address.address.country}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className={`${statusColors[address.status]} font-semibold text-sm`}>
                    {getStatusName(address.status)}
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
                        props.onSelectAddress(address)
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
