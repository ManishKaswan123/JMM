import React from 'react'

type Props = {
  label: any
  onChange?: any
  id: any
  parentId?: any
  level?: any
  labelClass?: any
  icon?: any
  name?: any
  inputClass?: any
  value?: any
}

export function Checkbox({
  label,
  onChange,
  id,
  parentId,
  level,
  labelClass,
  icon,
  name,
  inputClass,
  value,
}: Props) {
  return (
    <>
      <div className='flex items-center'>
        <label htmlFor={id} className={`${labelClass}`}>
          <input
            type='checkbox'
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            data-level={level}
            data-parentid={parentId}
            className={`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 ${inputClass}`}
          />
          {icon}
          {label}
        </label>
      </div>
    </>
  )
}

Checkbox.defaultProps = {
  label: 'Default Labe',
  labelClass: 'ml-2',
}
