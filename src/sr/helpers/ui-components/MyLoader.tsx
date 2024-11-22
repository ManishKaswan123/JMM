import React from 'react'

const Loader: React.FC = () => {
  console.log('inside loader')
  return (
    <div className='loader-container'>
      <div className='loader-overlay'></div>
      <div className='loader-spinner'></div>
    </div>
  )
}

export default Loader
