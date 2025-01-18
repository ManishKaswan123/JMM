import React from 'react'
import Select, {ActionMeta, StylesConfig} from 'react-select'

export interface OptionType {
  value: string
  label: string
}

export interface MultiSelectFieldProps {
  id?: string
  labelStyle?: 'style1' | 'style2'
  className?: string
  wrapperClassName?: string
  options: OptionType[]
  label: string
  name: string
  value: OptionType[]
  onChange: (selectedOptions: OptionType[], actionMeta: ActionMeta<OptionType>) => void
  placeholder?: string
  error?: boolean
  errorText?: string
  required?: boolean
}

const customStyles: StylesConfig<OptionType, true> = {
  control: (base, state) => ({
    ...base,
    padding: '4px',
    borderRadius: '4px',
    border: state.isFocused ? '1px solid #7747ff' : '1px solid #ccc',
    boxShadow: state.isFocused ? '0 0 3px rgba(119, 71, 255, 0.5)' : 'none',
    fontSize: '14px',
    minHeight: '40px',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '15px',
    fontWeight: '500',
    color: '#999',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '4px',
    zIndex: 5,
  }),
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  id,
  labelStyle = 'style1',
  className = 'custom-input form-input p-2 border rounded placeholder:text-[15px]',
  wrapperClassName,
  required = false,
  options,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  errorText,
}) => {
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
          {name}
          {required && <span className='text-red-500'> *</span>}
        </label>
      )}

      {/* Dropdown with custom styling */}
      <Select
        isMulti
        name={label}
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
        className={`basic-single  ${error ? 'border-red-500' : ''}`}
        classNamePrefix='select'
        placeholder={placeholder}
      />

      {/* Error message */}
      {required && error && <p className='text-rose-500 font-medium text-center'>{errorText}</p>}
    </div>
  )
}

export default MultiSelectField
