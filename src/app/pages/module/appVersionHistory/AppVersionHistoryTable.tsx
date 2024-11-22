import React from 'react'
import {FaCheck, FaTimes, FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'

interface appVersionHistoryApiResponse {
  title?: string
  descriptions?: string
  code?: number
  isForceUpdate?: boolean
  isActive?: boolean
  platform?: string
  link?: string
  createdAt: string
  updatedAt: string
  id: string
}
interface AppVersionHistoryTableProps {
  data: appVersionHistoryApiResponse[] | undefined
  onDelete: (id: string) => Promise<void>
}

const AppVersionHistoryTable: React.FC<AppVersionHistoryTableProps> = (props) => {
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
              {/* <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Description
              </th> */}
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Code
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Url
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Platform
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Force Update
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
            {props.data?.map((version: appVersionHistoryApiResponse) => (
              <tr key={version.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{version.title}</p>
                </td>
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.descriptions ? version.descriptions : 'N/A'}</p>
                </td> */}
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.code}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {version.link ? (
                    <a
                      href={version.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline'
                    >
                      {version.link}
                    </a>
                  ) : (
                    <p>{version.link}</p>
                  )}
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.platform}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.createdAt}</p>
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {version.isForceUpdate ? (
                    <FaCheck className='text-green-500' />
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      version.isActive
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {version.isActive ? 'Active' : 'Inactive'}
                  </p>
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm items-start'>
                  {version.isActive && (
                    <FaTrash
                      className='text-red-500 cursor-pointer h-4 w-4'
                      onClick={async () => {
                        await props.onDelete(version.id)
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

export default AppVersionHistoryTable
