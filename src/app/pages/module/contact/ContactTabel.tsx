import React from 'react'
import {FaTrash} from 'react-icons/fa'
import {containerCSS} from 'react-select/dist/declarations/src/components/containers'
import {ContactsType} from 'sr/utils/api/customerApi'
interface ContactTableProps {
  data: ContactsType[] | undefined
  //   onSelectContact: React.Dispatch<React.SetStateAction<ContactsType | undefined>>
  onDelete: (contact: ContactsType) => Promise<void>
  setSelectedData: React.Dispatch<React.SetStateAction<ContactsType | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ContactTable: React.FC<ContactTableProps> = ({
  data,
  onDelete,
  //   onSelectContact,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              First Name
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Last Name
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Phone
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((Contact) => (
            <tr key={Contact._id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{Contact.first_name}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{Contact.last_name}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{Contact.phone}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 text-ellipsis'>{Contact.email}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 text-ellipsis'>{Contact.type}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaTrash
                    className='text-rose-600 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      onDelete(Contact)
                    }}
                  />
                  {/* <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                    //   onSelectContact(Contact)
                    }}
                  /> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactTable
