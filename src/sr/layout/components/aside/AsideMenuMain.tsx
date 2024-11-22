import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

type Props = {
  getScenarios?: any
  AdjustWidth?: any
}
// import { useRouter } from "next/router";

export default function AsideMenuMain({getScenarios, AdjustWidth}: Props) {
  const scenarios = getScenarios ? JSON.parse(getScenarios) : []

  // find current url
  const location = useLocation()
  // redux
  // states
  const [path, setPath] = useState<string | null>('')
  const [subPath, setSubPath] = useState<string | null>('')
  const [fullPath, setFullPath] = useState<any | null>([])
  const [sideCollapse, setSideCollapse] = useState<any | null>('sm:w-full md:w-1/6')
  const [sideCollapseItem, setSideCollapseItem] = useState<any | null>('show')
  const [collapseShow, setCollapseShow] = useState('hidden')
  const [width, setWidth] = useState<any | null>(
    'sm:mt-20 md:mt-[75px] md:w-5/6 bg-gray-100 sm:w-full duration-1000 ease-in-out'
  )
  // const [sideCollapseItemPadding, setSideCollapseItemPadding] = useState("");
  // function

  const backUrl = () => {
    // navigate.push(-1)
  }
  // function

  const SidebarCollapsible = () => {
    if (sideCollapseItem === 'show') {
      setSideCollapseItem('hidden')
      setSideCollapse('w-[7%] duration-1000 ease-in-out')
      AdjustWidth()
    } else {
      setSideCollapse('sm:w-full md:w-1/6 duration-1000 ease-in-out')
      setSideCollapseItem('show')
      AdjustWidth()
    }
  }

  // const logout = () => {
  //   window.localStorage.clear()
  //   clearSession()
  //   window.location.reload()
  //   return <Redirect to={`/login`} />
  // }

  // use effect
  useEffect(() => {
    const uri = location.pathname.split('/')
    setFullPath(uri)
    setPath(uri[1])
    setSubPath(uri[2])
  }, [location])

  return (
    <>
      <div className={` md:block md:relative sm:absolute  ${sideCollapse}`}>
        <nav
          className={` ${sideCollapse} fixed sm:h-[5rem] md:h-full z-50 md:left-0 md:block md:top-0 md:bottom-0 md:overflow-hidden md:flex-row md:flex-nowrap shadow-xl bg-white flex flex-wrap items-center justify-between xl:px-2  md:px-2`}
        >
          <div className='md:flex-col md:items-stretch md:min-h-screen md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto h-full'>
            {/* Toggler */}
            <div className='sm:flex sm:flex-row sm:items-center'>
              <button
                className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                type='button'
                onClick={() => setCollapseShow('bg-white my-2 py-3 px-6')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                onClick={backUrl}
                className='h-5 w-5 cursor-pointer text-rose-800 md:hidden sm:show'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
            </div>

            {/* Brand */}
            <div className='flex items-center justify-around'>
              <Link to='/dashboard' className='flex items-end justify-center py-2'>
                <button className='text-rose-800 md:block text-left text-blueGray-600 mr-0 inline-block whitespace-nowrap sm:text-xl md:text-4xl font-bold sm:pr-2 md:pr-0'>
                  {sideCollapseItem === 'show' ? (
                    <img className='w-[8rem]' src={''} alt='xyz.com' />
                  ) : (
                    'Y'
                  )}
                </button>
              </Link>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                onClick={SidebarCollapsible}
                className='mt-[10px] sm:hidden md:block h-8 w-8 mx-2 cursor-pointer text-rose-800'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h8m-8 6h16' />
              </svg>
            </div>
            {/* Collapse */}
            <div
              className={
                'h-[100vh] md:pt-4 sm:pt-0 md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden  items-center flex-1 rounded justify-between ' +
                collapseShow
              }
            >
              <div className='md:min-w-full  md:hidden  py-4 border-b-[0.5px] border-rose-600 mb-2'>
                <div className='flex flex-wrap'>
                  <div className='w-full flex justify-between items-center'>
                    <Link to='/dashboard'>
                      <button className='md:block text-left md:pb-2 text-rose-800 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold px-0'>
                        xyz.com
                      </button>
                    </Link>
                    <button
                      type='button'
                      className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                      onClick={() => setCollapseShow('hidden')}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {/* Divider */}
                <hr className='md:min-w-full bg-rose-600 text-rose-600' />
                <h6
                  className={`lg:hidden md:block pl-[0.2rem] md:min-w-full text-rose-800 text-sm uppercase font-bold block md:pt-4 sm:pt-4 pb-2 no-underline `}
                >
                  {sideCollapseItem === 'show' ? 'DOCUMENTATION' : 'DOC'}
                </h6>
                <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
                  <li className='items-center lg:hidden md:block'>
                    <div
                      onClick={() => {}}
                      className={` flex text-sm uppercase py-3 font-bold hover:text-rose-600 text-gray-500 `}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      <span className=''>{sideCollapseItem === 'show' ? 'LogOut' : 'LogOut'}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
