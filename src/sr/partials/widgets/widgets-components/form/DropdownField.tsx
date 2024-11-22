import React, {ChangeEvent, FocusEvent} from 'react'

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
        labelStyle == 'style1' ? 'ml-2 my-2 mr-4' : 'm-2'
      } input-wrapper ${wrapperClassName}`}
    >
      {label && labelStyle == 'style1' && (
        <label htmlFor={id} className='input-label'>
          {label}
          {required && <span className='required-field'>*</span>}
        </label>
      )}
      {label && labelStyle === 'style2' && (
        <div>
          <label
            htmlFor={id}
            className='ml-1 text-center text-sm font-montserrat-regular text-[#7747ff]'
          >
            {label}
            {required && <span className='required-field'>*</span>}
          </label>
        </div>
      )}

      <select
        name={name}
        id={id || name}
        multiple={isMultiselect}
        className={` ${className} ${
          required && error ? 'border-red-500' : 'border-gray-300'
        } placeholder:text-left placeholder-gray-400 placeholder:text-sm placeholder:font-medium  px-1`}
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
        {!isMultiselect && (
          <option className={''} value={''}>
            {placeholder}
          </option>
        )}

        {data &&
          data.length > 0 &&
          data.map((item: any, key: any) => (
            <option key={key} value={item[valueKey]}>
              {item[labelKey]}
            </option>
          ))}
      </select>

      {/* {label && (
        <label
          htmlFor={id}
          className='text-xs text-neutral-50 absolute pt-2 top-0 pointer-events-none -z-10'
        >
          {label}
          {required && <span className='text-error-90'>*</span>}
        </label>
      )} */}
      {required && error && <p className='text-rose-500 font-medium text-center'>{errorText}</p>}
    </div>
  )
}

export default DropdownField
