import React from 'react'

interface ButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' // Make type prop optional and restrict values to button types
  disabled?: boolean // Make disabled prop optional
  label: string
  className?: string
  Icon?: React.ElementType // Icon prop is optional and should be a valid React component
}

export function Button({
  onClick,
  type = 'button',
  disabled = false,
  label,
  className,
  Icon,
}: ButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {Icon && <Icon className='w-4 h-4 mr-2' />} {/* Render Icon if provided */}
      {label}
    </button>
  )
}
