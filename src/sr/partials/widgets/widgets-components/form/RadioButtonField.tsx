import React, {ChangeEvent, FocusEvent} from 'react'

interface Props {
  type: string
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
  data: []
}

const RadioButtonField = ({
  type,
  label,
  className,
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
}: Props) => {
  return (
    <div className={`${wrapperClassName}`}>
      {label && (
        <p className='input-label'>
          {label}
          {required && <span className='required-field'>*</span>}
        </p>
      )}
      <div className={``}>
        {data &&
          data.length > 0 &&
          data.map((item: any, key: any) => (
            <div className='flex items-center mr-4 mt-2' key={key}>
              <div className='float-left'>
                <input
                  type={type}
                  name={name}
                  id={item[labelKey]}
                  className={`w-[25px] h-[25px] ${className} ${
                    error ? 'border-error-90' : 'border-neutral-30'
                  }`}
                  placeholder=' '
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={disabled}
                  value={item[labelKey]}
                  autoComplete={autoComplete}
                  data-testid={testId}
                  autoFocus={autofocus}
                  {...register}
                />
              </div>
              <label htmlFor={item[labelKey]} className='ml-4 text-base'>
                {item[valueKey]}
              </label>
            </div>
          ))}
      </div>

      {required && error && <p className='error-cls mt-4'>{errorText}</p>}
    </div>
  )
}

export default RadioButtonField
