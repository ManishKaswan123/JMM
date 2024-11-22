import React, {useEffect, useState} from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {UserInterface} from 'sr/constants/User'

interface chatApiResponse {
  eightySixResponseId?: any
  senderId?: UserInterface
  receiverId?: UserInterface
  sourceType?: string
  message?: string
  images?: string[]
  msgType?: number
  createdAt: string
  updatedAt: string
  id: string
}

interface Props {
  setSelectedData: React.Dispatch<React.SetStateAction<chatApiResponse | undefined>>
  data?: chatApiResponse[]
  handleDelete: (id: string) => Promise<void>
  handleView: (fileUrl: string) => Promise<void>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatsTable: React.FC<Props> = (props) => {
  return (
    <>
      <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Sender
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Reciever
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Message
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Images
              </th>
              <th className='px-5 py-3  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                86 Response
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Source Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Msg Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data?.map((chat: chatApiResponse) => (
              <tr key={chat.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {chat.senderId && (
                    <Link to={`/user/${chat.senderId.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {chat.senderId.firstName} {chat.senderId.lastName}
                      </p>
                    </Link>
                  )}
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {chat.receiverId && (
                    <Link to={`/user/${chat.receiverId.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>
                        {chat.receiverId.firstName} {chat.receiverId.lastName}
                      </p>
                    </Link>
                  )}
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{chat.message}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p
                    className={`${
                      chat.images?.length === 0
                        ? 'text-gray-900'
                        : 'text-blue-500 hover:cursor-pointer hover:font-medium'
                    }  whitespace-no-wrap  `}
                    onClick={async () => {
                      if (props.handleView && chat.images && chat.images.length > 0)
                        await props.handleView(chat.images[0])
                    }}
                  >
                    {chat.images?.length === 0 ? '' : 'View'}
                  </p>
                </td>
                {/* <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <Link to={`/86-response/${chat.eightySixResponseId.id}`}>
                    <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>View</p>
                  </Link>
                </td> */}
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {chat.eightySixResponseId && (
                    <Link to={`/86-response/${chat.eightySixResponseId.id}`}>
                      <p className='text-blue-500 whitespace-no-wrap hover:font-medium'>View</p>
                    </Link>
                  )}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{chat.sourceType}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{chat.msgType}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{chat.createdAt}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        props.setSelectedData(chat)
                        props.setIsUpdateModalOpen(true)
                      }}
                    />
                    <FaTrash
                      className='text-red-500 cursor-pointer ml-4 h-4 w-4'
                      onClick={async () => {
                        await props.handleDelete(chat.id)
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ChatsTable
