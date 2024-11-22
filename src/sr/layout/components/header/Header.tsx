import {FC} from 'react'
import {MenuInner} from './MenuInner'

const Header: FC = () => {
  return (
    <div id='kt_header_menu'>
      <div className='d-flex flex-row justify-content-center py-4 gap-4'>
        <MenuInner />
      </div>
    </div>
  )
}

export {Header}
