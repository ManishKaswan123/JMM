import clsx from 'clsx'

// green-50,green,orange-50,orange
// css will be in _helper.scss

type Props = {
  color?: string
  className?: string
  width?: number
  height?: number
}
export function RectangularBox({className, color, width, height}: Props) {
  return (
    <>
      <div
        className={clsx('box_rect rounded', className, color)}
        style={{width: width + 'rem', height: height + 'rem'}}
      ></div>
    </>
  )
}

RectangularBox.defaultProps = {
  width: 1.25,
  height: 1.25,
  color: 'green',
}
