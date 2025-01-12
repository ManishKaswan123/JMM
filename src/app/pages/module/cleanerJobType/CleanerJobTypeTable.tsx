import React from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {CleanerJobType} from 'sr/utils/api/cleanerJobTypeApi'
interface CleanerJobTypeTableProps {
  data: CleanerJobType[] | undefined
  onSelectCleanerJobType: React.Dispatch<React.SetStateAction<CleanerJobType | undefined>>
  setSelectedData: React.Dispatch<React.SetStateAction<CleanerJobType | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const CleanerJobTypeTable: React.FC<CleanerJobTypeTableProps> = ({
  data,
  onSelectCleanerJobType,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Cleaner
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Rate
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Job Type
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((cleaner) => (
            <tr key={cleaner.id} className='odd:bg-white even:bg-gray-50'>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <Link
                  to={`/cleaner/details/${cleaner.cleaner_id._id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {cleaner.cleaner_id.first_name} {cleaner.cleaner_id.last_name}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner.rate}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner.job_type}</p>
              </td>

              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <div className='flex'>
                  <FaEdit
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      setSelectedData(cleaner)
                      setIsUpdateModalOpen(true)
                    }}
                  />
                  <FaEye
                    className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                    onClick={() => {
                      onSelectCleanerJobType(cleaner)
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CleanerJobTypeTable
