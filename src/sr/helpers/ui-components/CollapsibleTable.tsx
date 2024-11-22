import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'
import {Spinner} from './Spinner'

type Props = {
  title?: any
  thead?: any
  tbody?: any
  tableTitle?: any
  data?: any
  titleClass?: any
  actionButton?: any
  topMargin?: any
  rounded?: any
  color?: any
  bgColor?: any
  loader?: any
  buttonGroup?: any
  headerTable?: any
  tableHeight?: any
  downloadFile?: any
  buttonGroupStatus?: any
  parentClass?: any
}
export default function CollapsibleTable({
  data,
  title,
  tableTitle,
  titleClass,
  actionButton,
  topMargin,
  rounded,
  color,
  bgColor,
  thead,
  tbody,
  buttonGroup,
  headerTable,
  tableHeight,
  downloadFile,
  buttonGroupStatus,
  parentClass,
  loader,
}: Props) {
  // state
  const [show, setShow] = useState('hidden')

  // functions
  const showModel = () => {
    if (show === 'hidden') {
      setShow('show')
    } else {
      setShow('hidden')
    }
  }

  return (
    <>
      <div className={`${parentClass} rounded-md  shadow border-[0.5px] border-gray-200`}>
        {headerTable ? (
          <>
            <h4
              className={`  ${titleClass} lg:flex-row md:flex-row sm:flex-col capitalize items-center text-xl px-2 py-4  ${topMargin} rounded-sm flex justify-between`}
            >
              <span className='flex items-center md:whitespace-nowrap sm:whitespace-pre-wrap'>
                {tableTitle}
                {loader ? (
                  ''
                ) : (
                  <div className='ml-4'>
                    <Spinner />
                  </div>
                )}
              </span>
              {actionButton}
              <div className='flex sm:mt-4 md:mt-0 w-full sm:flex-col md:flex-row justify-end'>
                <div className='relative'>
                  <div
                    className={`${show} absolute -top-[8.5rem] dropdown h-[8rem] bg-gray-100 text-start  w-[15rem] z-50 rounded-lg overflow-auto  border-[0.5px] border-gray-200 p-4 `}
                  >
                    <ul className=''>
                      <li className=' pb-2 '>
                        <Link
                          to='/control-tower/operational/aggregated/F1'
                          className='text-blue-400 hover:text-blue-600 duration-150 ease-in-out text-sm font-semibold'
                        >
                          Operational Aggregated
                        </Link>
                      </li>
                      <li className=' pb-2 '>
                        <Link
                          to='/control-tower/operational/long-relocation-cost/F1'
                          className='text-blue-400 hover:text-blue-600 duration-150 ease-in-out text-sm font-semibold'
                        >
                          Operational Relocation
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {buttonGroupStatus ? (
                    <button onClick={showModel} name='Navigation' className='w-fit'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1 '
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'
                        />
                      </svg>
                    </button>
                  ) : (
                    ''
                  )}
                </div>
                {buttonGroupStatus ? (
                  <button className='w-fit mr-0'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1 '
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                    <a download href={downloadFile}>
                      Export to Excel
                    </a>
                  </button>
                ) : (
                  ''
                )}
              </div>
            </h4>
          </>
        ) : (
          ''
        )}
        <div className='flex flex-col overflow-x-auto bg-white'>
          <div className={`w-full`}>
            <div className={`inline-block min-w-full align-middle  ${tableHeight}`}>
              <div className={`overflow-scroll ${tableHeight} `}>
                <table className='border-collapse min-w-full divide-y p-2 border-[0.5px] divide-gray-200 table-fixed'>
                  {thead}
                  {tbody}
                </table>
              </div>
            </div>
          </div>
        </div>
        {buttonGroup ? (
          <div
            className={` bottom flex md:flex-row sm:flex-col py-2 sm:flex-wrap ${
              data.length > 0 ? 'justify-between' : 'justify-end'
            } w-full mt-4 `}
          >
            <div className='flex md:flex-row sm:flex-col sm:flex-wrap justify-end relative'>
              {buttonGroup}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

CollapsibleTable.defaultProps = {
  topMargin: '',
  rounded: 'lg',
  bgColor: 'bg-white',
  color: 'bg-gray-300',
  buttonGroup: '',
  tableHeight: 'h-[80vh]',
  headerTable: true,
  loader: true,
  downloadFile: '',
  data: [],
  parentClass: 'p-4 sm:mt-0 lg:mt-4 m-4  bg-stone-100',
  buttonGroupStatus: true,
}
