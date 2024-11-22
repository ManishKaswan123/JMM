interface Props {
  label?: string
  wrapperLabel?: string
  filePath?: string
  required?: boolean
  id?: string
  name: string
  onChange?: any
  disabled?: boolean
  isProfilePic?: string
  error?: any
  signedPhoto?: string
  errorText?: string
  className?: string
  wrapperClassName?: string
  value?: string
  autoComplete?: string
  autofocus?: boolean
  register?: any
  labelStyle?: 'style1' | 'style2'
}

const FileField = ({
  label,
  wrapperLabel,
  className,
  signedPhoto,
  wrapperClassName,
  disabled,
  name,
  id,
  onChange,
  register,
  error,
  errorText,
  required,
  labelStyle = 'style1',
}: Props) => {
  return (
    <div className={`${wrapperClassName}`}>
      <label htmlFor={id}>
        <label
          className={` ${labelStyle === 'style2' && 'text-[#7747ff] font-montserrat-regular'} ml-1`}
        >
          Upload Attachment
          {required && <span className='required-field'>*</span>}
        </label>
        <div className='upload-land-btn-wrapper relative'>
          <div className='upload-land-btn flex flex-col items-center justify-center text-sm'>
            <>
              <span className='fa fa-upload text-2xl'></span>
              <p className='mb-2 text-sm text-[#B3B3B3] font-medium'>{'attachment'}</p>
            </>

            <p className='text-xs text-gray-500 dark:text-gray-400 text-center'>
              Image(jpeg, jpg, png), txt or pdf (max size 1MB)
            </p>
          </div>

          <input
            type='file'
            name={name}
            id={id || name}
            className={`${className} hover:cursor-pointer`}
            placeholder=''
            disabled={disabled}
            onChange={onChange}
            {...register}
          />
          {required && error && <p className='error-cls mt-4'>{errorText}</p>}
        </div>
      </label>
      {signedPhoto && (
        <a className='float-right mt-[70px]' href={signedPhoto} target='_blank' rel='noreferrer'>
          {' '}
          View{' '}
        </a>
      )}
    </div>
  )
}

export default FileField
