import React from 'react'
import {Link} from 'react-router-dom'
import {IconType} from 'react-icons'

interface TableAction<T> {
  icon: IconType
  onClick?: (item: T) => void
  linkPrefix?: string
  tooltip?: string
}

interface TableColumn<T> {
  label: string
  key: keyof T
  nestedKey?: keyof T
  linkProps?: {
    isLink: boolean
    linkPrefix: string
    linkValueKey: string
  }

  statusColors?: Record<string, string>
  getStatusName?: (statusId: any) => string
  render?: (item: T) => React.ReactNode
  actions?: TableAction<T>[] // New: Support for dynamic actions
}

interface TableProps<T> {
  data: T[] | undefined
  columns: TableColumn<T>[]
}

const GlobalTable = <T,>({data, columns}: TableProps<T>) => {
  return (
    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
      <table className='min-w-full leading-normal'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className='odd:bg-white even:bg-gray-50'>
              {columns.map((col) => {
                let cellContent: React.ReactNode

                // Ensure the value is safe for rendering
                let value = item[col.key]
                // If a nestedKey exists, extract the nested value
                if (col.nestedKey && typeof value === 'object') {
                  value = (value as any)[col.nestedKey] // Access nested field
                }

                if (value === undefined || value === null) {
                  cellContent = ''
                } else if (typeof value === 'object' && !col.linkProps?.isLink) {
                  cellContent = JSON.stringify(value) // Convert objects to strings if not a link
                } else {
                  cellContent = value as React.ReactNode
                }

                // If column is a link
                if (col.linkProps?.isLink && typeof value === 'object' && (value as any)?._id) {
                  cellContent = (
                    <Link
                      to={`${col.linkProps.linkPrefix}/${(value as any)._id}`}
                      className='text-blue-500 hover:font-medium'
                    >
                      {(value as any)[col.linkProps.linkValueKey]}
                    </Link>
                  )
                }

                // If column is a status with colors
                if (col.statusColors && typeof value === 'string') {
                  cellContent = (
                    <span className={`${col.statusColors?.[value]} font-semibold text-sm`}>
                      {col.getStatusName ? col.getStatusName(value) : value}
                    </span>
                  )
                }

                // If column has actions (icons)
                if (col.actions) {
                  cellContent = (
                    <div className='flex space-x-3'>
                      {col.actions.map((action, actionIndex) =>
                        action.linkPrefix ? (
                          <Link
                            key={actionIndex}
                            to={`${action.linkPrefix}/${(item as any).id || (item as any)._id}`}
                            title={action.tooltip}
                          >
                            <action.icon className='cursor-pointer text-blue-500 hover:text-gray-700 h-4 w-4' />
                          </Link>
                        ) : (
                          <action.icon
                            key={actionIndex}
                            className='cursor-pointer text-blue-500 hover:text-gray-700 h-4 w-4'
                            onClick={() => action.onClick?.(item)}
                            title={action.tooltip}
                          />
                        )
                      )}
                    </div>
                  )
                }

                // If custom render is provided
                if (col.render) {
                  cellContent = col.render(item)
                }

                return (
                  <td
                    key={col.key as string}
                    className='px-5 py-5 border-b border-gray-200 text-sm'
                  >
                    {cellContent}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GlobalTable
