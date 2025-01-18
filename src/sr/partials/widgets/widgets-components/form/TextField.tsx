import React, {ChangeEvent, FocusEvent} from 'react'

interface Props {
  label?: string
  type: string
  required?: boolean
  id?: string
  name: string
  step?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: any
  value?: string | boolean
  autoComplete?: string
  errorText?: string
  testId?: string
  className?: string
  maxLength?: number
  minLength?: number
  wrapperClassName?: string
  placeholder?: string
  autofocus?: boolean
  register?: any
  width?: string
  height?: string
  labelStyle?: 'style1' | 'style2' | 'style3'
}

const TextField = ({
  label,
  className = ' p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500',
  wrapperClassName,
  name,
  required,
  type,
  id,
  onChange,
  onBlur,
  disabled,
  error,
  step,
  autoComplete = 'off',
  errorText,
  value,
  testId,
  maxLength,
  minLength,
  autofocus,
  register,
  placeholder,
  labelStyle = 'style2',
  width,
  height,
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

      <div className='flex justify-center items-center'>
        <input
          type={type}
          step={step}
          name={name}
          id={id || name}
          className={` w-full basic-single px-2 pt-2 pb-3 rounded-md border-2 border-gray-200 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={placeholder ? `Enter ${placeholder}` : `Enter ${name}`}
          onChange={onChange}
          style={{
            width: width || '100%',
            height: height || 'auto',
          }}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
          autoComplete={autoComplete}
          data-testid={testId}
          autoFocus={autofocus}
          minLength={minLength}
          maxLength={maxLength}
          {...register}
        />
      </div>
      {required && error && <p className='text-rose-500 font-medium text-center'>{errorText}</p>}
    </div>
  )
}

export default TextField
