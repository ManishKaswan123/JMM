export function TextArea(props: any) {
  return (
    <>
      <label htmlFor={props.name} className='block mb-2 text-normal text-gray-700  font-semibold'>
        {props.label}
      </label>
      <textarea
        value={props.value}
        id={props.name}
        rows={props.rows == null ? '2' : props.row}
        onChange={props.onChange}
        className='block w-full md:px-4 sm:px-1 md:py-2 sm:py-1 mt-2 sm:text-sm md:text-md text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-sm
         focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 '
        placeholder={props.placeholder}
      ></textarea>
    </>
  )
}
