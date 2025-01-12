import React, {useCallback, useEffect} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {CleanerPreference} from 'sr/utils/api/cleanerPreferenceApi'
import {useActions} from 'sr/utils/helpers/useActions'
interface CleanerPreferenceTableProps {
  data: CleanerPreference[] | undefined
  onSelectCleanerPreference: React.Dispatch<React.SetStateAction<CleanerPreference | undefined>>
  setSelectedData: React.Dispatch<React.SetStateAction<CleanerPreference | undefined>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const CleanerPreferenceTable: React.FC<CleanerPreferenceTableProps> = ({
  data,
  onSelectCleanerPreference,
  setSelectedData,
  setIsUpdateModalOpen,
}) => {
  const cleanerMap = useSelector((state: RootState) => state.cleaner.idNameMap)
  const cleanerStatus = useSelector((state: RootState) => state.cleaner.status)
  const {fetchCleanerData} = useActions()
  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (cleanerStatus !== 'succeeded') {
      fetchCleanerData({})
    }
  }, [cleanerStatus, fetchCleanerData])
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Cleaner
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Radius
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Shift Type
            </th>

            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Min Hours
            </th>
            <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
              Max Hours
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
                  to={`/cleaner/details/${cleaner.cleaner_id}`}
                  className='text-blue-500 hover:font-medium'
                >
                  {cleanerMap[cleaner.cleaner_id]}
                </Link>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner.radius}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner.shift_type}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner.min_hours}</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{cleaner.max_hours}</p>
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
                      onSelectCleanerPreference(cleaner)
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

export default CleanerPreferenceTable
