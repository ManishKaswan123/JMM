type Props = {
  labelClass?: any
  label?: any
  name?: any
  onChange?: any
  className?: any
  required?: any
  value?: any
  children?: any
  error?: any
  type?: any
  labelMargin?: any
}

export default function DropDown({
  labelClass,
  label,
  name,
  onChange,
  className,
  required,
  children,
  error,
  labelMargin,
  value,
}: Props) {
  return (
    <>
      <label
        className={` ${labelClass}  block text-normal text-gray-600 font-semibold `}
        htmlFor={name}
      >
        {label ? <p className={` ${labelMargin} `}>{label}</p> : ''}
        <select
          id={name}
          onChange={onChange}
          className={` ${className} md:px-4 sm:px-1 md:py-2 sm:py-1 mt-2 block w-full  sm:text-sm md:text-md text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-sm
                         focus:border-rose-200 focus:ring-rose-200 focus:outline-none focus:ring focus:ring-opacity-40 `}
          name={name}
          value={value}
          required={required}
        >
          {children}
        </select>
        {error ? <p className='mt-1 text-red-400 md:text-sm sm:text-[.65rem]'>{error}</p> : ''}
      </label>
    </>
  )
}

DropDown.defaultProps = {
  className: 'md:px-4 sm:px-1 md:py-2 sm:py-1 mt-2',
  labelClass: 'mb-2',
  label: '',
  name: '',
  type: '',
  onChange: '',
  value: '',
  required: false,
  error: '',
  children: '',
  labelMargin: '',
}
