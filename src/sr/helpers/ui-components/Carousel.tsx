import React, {useEffect, useState} from 'react'
type Props = {
  children?: any
  slides: any
  autoSlide: boolean
  duration?: number
}

export function Carousel({children, slides, autoSlide, duration = 3000}: Props) {
  const [current, setCurrent] = useState(0)
  const Next = (curr: any) => {
    setCurrent(curr === 0 ? slides.length - 1 : curr - 1)
  }
  const Previous = (curr: any) => {
    setCurrent(curr === slides.length - 1 ? 0 : curr + 1)
  }

  useEffect(() => {
    if (!autoSlide) return
    const AutoSlide = setInterval(
      () => setCurrent(current === 0 ? slides.length - 1 : current - 1),
      duration
    )
    return () => clearInterval(AutoSlide)
  }, [slides, duration, autoSlide, current])

  return (
    <>
      <div className='relative overflow-hidden'>
        <div
          className='flex flex-row transition-transform ease-in-out duration-500'
          //   style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((img: any, i: any) => {
            return (
              <div
                key={i}
                className={`${
                  current === i ? 'block' : 'hidden'
                } bg-cover bg-no-repeat bg-center w-[100%] h-[650px]`}
                style={{backgroundImage: `url(${img})`}}
              ></div>
            )
          })}
          {children}
        </div>
        <div className='absolute flex inset-0 items-center justify-between px-12 z-40'>
          <button
            onClick={() => {
              Next(current)
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-12 h-12 hover:h-16 hover:w-16 shadow hover:bg-rose-200 ease-in-out duration-75 hover:text-white text-gray-700 bg-rose-100 rounded-full p-2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </button>
          <button
            onClick={() => {
              Previous(current)
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-12 h-12 hover:h-16 hover:w-16 shadow hover:bg-rose-200 ease-in-out duration-75 hover:text-white text-gray-700 bg-rose-100 rounded-full p-2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
        <div className='absolute inset-0 flex justify-center items-end pb-4 gap-4'>
          {slides.map((_: any, i: any) => {
            return (
              <div
                key={i}
                className={`w-4 h-4 ${
                  current === i ? 'bg-rose-800 scale-125' : 'bg-white'
                }  rounded-full`}
              ></div>
            )
          })}
        </div>
      </div>
    </>
  )
}
