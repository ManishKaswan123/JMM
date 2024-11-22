import {Spinner} from './Spinner'

type Props = {
  onClick?: any
  id?: any
  className?: any
  style?: any
  cardBody?: any
  titleClass?: any
  icon?: any
  title?: any
  childClass?: any
  children?: any
  spinner?: any
}

export function Card({
  onClick,
  id,
  className,
  style,
  cardBody,
  titleClass,
  icon,
  title,
  childClass,
  children,
  spinner,
}: Props) {
  return (
    <>
      <div
        onClick={onClick}
        id={id}
        className={`card flex justify-center flex-col px-4 shadow-md border-2 md:text-2xl sm:text-md rounded-md hover:border-rose-800 focus:bg-rose-800 hover:border-2 duration-500 ease-in-out  ${className} `}
        style={style}
      >
        <img className='card-img-top' src='holder.js/100x180/' alt='' />
        <div className='flex justify-between w-100'>
          <div className={` ${cardBody} card-body`}>
            <h3 className={` ${titleClass} card-title divide-y divide-green-900`}>
              {icon ? <span>{icon}</span> : ''}
              {title}
            </h3>
            <p className={`${childClass} card-text`}>{children}</p>
          </div>
          {spinner ? <Spinner /> : ''}
        </div>
      </div>
    </>
  )
}
