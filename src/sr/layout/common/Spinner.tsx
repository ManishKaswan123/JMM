import {useEffect} from 'react'

interface Props {
  text?: string
}

const Spinner = ({text}: Props) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <div
      className='top-0 left-0 w-screen h-screen flex justify-center flex-col fixed bg-[rgba(0,0,0,0.4)] z-50'
      data-testid='spinner-div'
    >
      {text ? <p className='text-center p-4'> {text}</p> : null}
      <div className='w-12 h-12 border-t-2 border-b-2 border-green-700 rounded-full animate-spin mx-auto'></div>
    </div>
  )
}
export default Spinner
