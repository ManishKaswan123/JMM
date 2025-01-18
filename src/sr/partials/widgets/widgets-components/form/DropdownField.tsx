import React, {ChangeEvent, FocusEvent} from 'react'
import {StylesConfig} from 'react-select'
import {OptionType} from '../Multiselect'

interface Props {
  label?: string
  required?: boolean
  id?: string
  name: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void
  disabled?: boolean
  error?: any
  autoComplete?: string
  errorText?: string
  testId?: string
  className?: string
  wrapperClassName?: string
  placeholder?: string
  labelKey: string
  valueKey: string
  autofocus?: boolean
  isMultiselect?: boolean
  register?: any
  rules?: any
  data: any[]
  value?: any
  labelStyle?: 'style1' | 'style2'
}

const DropdownField = ({
  labelStyle = 'style1',
  label,
  className = 'custom-input form-input p-2 border rounded placeholder:text-[15px]',
  wrapperClassName,
  name,
  required,
  data,
  id,
  onChange,
  onBlur,
  disabled,
  error,
  autoComplete = 'off',
  errorText,
  testId,
  autofocus,
  register,
  rules,
  placeholder,
  labelKey,
  valueKey,
  isMultiselect,
  value,
}: Props) => {
  return (
    <div
      className={`${
        labelStyle === 'style1' ? 'ml-2 my-2 mr-4' : 'm-2'
      } input-wrapper ${wrapperClassName}`}
    >
      {label && (
        <label
          htmlFor={id || name}
          className={`${
            labelStyle === 'style1'
              ? 'text-sm font-medium text-gray-700 mb-1 block'
              : 'text-center text-sm font-medium text-[#7747ff]'
          }`}
        >
          {label}
          {required && <span className='text-red-500'> *</span>}
        </label>
      )}

      <select
        name={name}
        id={id || name}
        multiple={isMultiselect}
        className={` w-full basic-single px-2 py-3 rounded-md border-2 border-gray-200 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder=' '
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        data-testid={testId}
        autoFocus={autofocus}
        {...register}
        value={value}
      >
        {!isMultiselect && <option value=''>{placeholder || 'Select an option'}</option>}
        {data &&
          data.map((item: any, index: number) => (
            <option key={index} value={item[valueKey]}>
              {item[labelKey]}
            </option>
          ))}
      </select>

      {required && error && <p className='text-red-500 text-sm mt-1'>{errorText}</p>}
    </div>
  )
}

export default DropdownField
