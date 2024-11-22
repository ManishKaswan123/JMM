export const NoResults = (props: {title: string}) => {
  return (
    <div className='flex flex-col items-center justify-center h-64 text-center bg-gray-100 rounded-lg p-4'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='w-12 h-12 text-red-500 mb-4'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 8v4m0 4h.01M4.93 4.93a10 10 0 0 1 14.14 0l-14.14 14.14a10 10 0 0 1 0-14.14zm14.14 14.14a10 10 0 0 1-14.14 0l14.14-14.14a10 10 0 0 1 0 14.14z'
        />
      </svg>
      <h3 className='text-xl font-semibold text-gray-600'>{props.title}</h3>
      <p className='text-gray-500'>Please check back later or try a different selection.</p>
    </div>
  )
}
