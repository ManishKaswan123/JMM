type Props = {
  title: any
  user: any
}

const DefaultHeader = ({title, user}: Props) => {
  return (
    <div className='flex justify-between px-4 py-4 bg-[#F1F5F9]'>
      <div className='m-2'>
        <p className='font-semibold text-xl'>{title}</p>
      </div>
      <div className='m-2'>
        <p className='font-medium text-l'>Welcome {user}</p>
      </div>
    </div>
  )
}

export {DefaultHeader}
