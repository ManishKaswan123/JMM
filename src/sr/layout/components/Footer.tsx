import clsx from 'clsx'
import {useLayout} from 'sr/layout/master-layout'

const Footer = () => {
  const {classes} = useLayout()
  return (
    <div className={'footer py-4 d-flex flex-lg-column'} id=''>
      <div
        className={clsx(
          'd-flex flex-column flex-md-row align-items-end justify-content-between text-right'
        )}
      >
        <div className='text-primary px-8 text-right'>
          <span className=' fw-bold me-1'>{new Date().getFullYear()}&copy;</span>
          86DeadStock
        </div>
      </div>
    </div>
  )
}

export {Footer}
