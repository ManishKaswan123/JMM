import React, {useCallback, useEffect} from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from 'sr/redux/store'
import {BranchType} from 'sr/utils/api/branchApi'
import {useActions} from 'sr/utils/helpers/useActions'

interface BranchTableProps {
  data?: BranchType[]
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedData: React.Dispatch<React.SetStateAction<BranchType | undefined>>
}

const BranchTable: React.FC<BranchTableProps> = (props) => {
  const companyStore = useSelector((state: RootState) => state.company)
  const {fetchCompanyData} = useActions()
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  const fetchDataIfNeeded = useCallback(() => {
    if (companyStore.status !== 'succeeded') {
      fetchCompanyData({})
    }
  }, [companyStore.status, fetchCompanyData])
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Branch Name
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Company
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Type
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Default Branch
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
            {props.data?.map((branch) => (
              <tr key={branch.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{branch.branch_name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <Link
                    to={`/company/${branch.company_id}`}
                    className='text-blue-500 hover:font-medium'
                  >
                    {companyStore.idNameMap[branch.company_id]}
                  </Link>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{branch.type}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{branch.isDefaultBranch === true ? 'Yes' : 'No'}</p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p
                    className={`whitespace-no-wrap ${
                      branch.status === 'ACTIVE'
                        ? 'text-green-500'
                        : branch.status === 'inactive'
                        ? 'text-red-500'
                        : 'text-gray-500' // Default color for unknown statuses
                    }`}
                  >
                    {branch.status}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                      onClick={() => {
                        props.setSelectedData(branch)
                        props.setIsUpdateModalOpen(true)
                      }}
                    />
                    <Link
                      to={`/company/branch/${branch.id}`}
                      className='text-blue-500 hover:font-medium'
                    >
                      <FaEye
                        className='cursor-pointer text-blue-500 hover:text-gray-700'
                        style={{fontSize: '1.1rem'}}
                      />
                    </Link>
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

export default BranchTable
