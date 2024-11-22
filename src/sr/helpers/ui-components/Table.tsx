// import Input from '../input'
// import Checkbox from '../checkbox'

type Props = {
  label: any
  labelClass?: any
  thead: any
  tbody: any
  actionButton?: any
  topMargin?: any
  rounded?: any
  color?: any
  bgColor?: any
}

export function index({
  label,
  thead,
  tbody,
  labelClass,
  actionButton,
  topMargin,
  rounded,
  color,
  bgColor,
}: Props) {
  return (
    <>
      <div>
        <h4
          className={`  ${labelClass} capitalize text-xl px-2 py-4 ${color}  ${topMargin} rounded-sm flex justify-between`}
        >
          {label}
          {actionButton}
        </h4>
        <div className='flex flex-col overflow-x-auto'>
          <div className={`shadow-md sm:rounded-${rounded} ${bgColor}`}>
            <div className='inline-block min-w-full align-middle '>
              <div className='max-h-screen'>
                <table className='border-collapse min-w-full divide-y p-2 border-[0.5px] divide-gray-200 table-fixed '>
                  {thead}
                  {tbody}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

index.defaultProps = {
  topMargin: 'mt-4',
  rounded: 'lg',
  bgColor: 'bg-white',
  color: 'bg-gray-300',
}
