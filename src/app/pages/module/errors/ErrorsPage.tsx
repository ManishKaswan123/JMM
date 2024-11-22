import React from 'react'

export default function ErrorsPage({error}: any) {
  return (
    <>
      <div className='container-fluid min-h-[100vh] text-center'>
        <div className='notfound'>
          <div className='notfound-404 mt-8'>
            <h1 className=''>404</h1>
          </div>
          {/* <h2>Oops! This Page Could Not Be Found</h2>
          <p>
            Sorry but the page you are looking for does not exist, have been removed. name changed
            or is temporarily unavailable
          </p> */}
          <h2>{error.message}</h2>
          <a href='/dashboard'>Go To Homepage</a>
        </div>
      </div>
    </>
  )
}
