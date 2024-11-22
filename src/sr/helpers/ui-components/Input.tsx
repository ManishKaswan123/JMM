import {useState} from 'react'
import {FiEye, FiEyeOff} from 'react-icons/fi'
export function InputBox(props: any) {
  const {
    label,
    placeholder,
    onChange,
    className,
    dropdownOptions,
    selectedValue,
    handleDropdownChange,
    isDropdownOnly = false,
    isPassword = false,
  } = props
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='flex flex-col'>
      <div className='text-sm font-medium text-left py-2'>{label}</div>
      <div className='relative'>
        {isDropdownOnly ? (
          <select
            value={selectedValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleDropdownChange(e.target.value)
            }
            className='w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            {dropdownOptions.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div className='flex items-center'>
            <input
              onChange={onChange}
              placeholder={placeholder}
              type={isPassword ? (showPassword ? 'text' : 'password') : 'text'} // Conditional input type
              className={`w-full px-2 py-1 border ${className || ''}`}
            />
            {/* Eye icon for toggling password visibility */}
            {isPassword && (
              <div className='absolute right-2 cursor-pointer' onClick={togglePasswordVisibility}>
                {!showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
