export function Model(props: any) {
  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id='defaultModal'
        aria-hidden='true'
        className={`${props.show} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center bg-slate-100/75 inset-0 items-center h-modal md:h-full md:inset-0`}
      >
        {/* <div className="absolute  px-4 w-full max-w-2xl h-full md:h-auto" style = {{'top': '50%', 'left': '50%', 'transform' : 'translate(-50%,-32%)'}} > */}
        <div
          className={`${props.modelClass} absolute  px-4 max-w-[100%] h-full md:h-auto`}
          style={{top: '50%', left: '50%', transform: `translate(-50%,${props.transitionTop}%)`}}
        >
          {/* <!-- Modal content --> */}
          <div className='relative bg-white rounded-lg border-2 border-gray-200 shadow-new'>
            {/* <!-- Modal header --> */}
            <div className='flex justify-between items-start p-5 rounded-t border-b '>
              <h3 className='text-xl font-semibold text-gray-900 lg:text-2xl'>{props.header}</h3>
              <button
                onClick={props.close}
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
                data-modal-toggle='defaultModal'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className='p-6 space-y-6'>{props.children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

Model.defaultProps = {
  transitionTop: '-32',
  modelClass: 'w-[40%]',
}
