import React, {useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import {BreadcrumbItem} from './BreadcrumbItem'

const Breadcrumb: React.FC = () => {
  const location = useLocation()

  const crumbs: {path: string; label: string}[] = useMemo(() => {
    let currLink = '' // Initialize currLink here
    return location.pathname
      .split('/')
      .filter((crumb) => crumb !== '' && !/^[a-fA-F0-9]{24}$/.test(crumb)) // Ignore ID-like parameters
      .map((crumb) => {
        currLink += '/' + crumb
        return {
          path: currLink,
          label: crumb.charAt(0).toUpperCase() + crumb.slice(1).toLowerCase(),
        }
      })
  }, [location.pathname])

  const getBasePath = (path: string) => {
    // Remove the dynamic part of the path (parameters)
    return path
      .split('/')
      .filter((segment) => !/^[a-fA-F0-9]{24}$/.test(segment))
      .join('/')
  }

  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        {crumbs.map((crumb, index) => {
          // Get the base path without parameters for comparison
          const basePath = getBasePath(crumb.path)

          return (
            <BreadcrumbItem
              key={index}
              index={index}
              item={crumb}
              isActive={getBasePath(location.pathname) === basePath}
            />
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
