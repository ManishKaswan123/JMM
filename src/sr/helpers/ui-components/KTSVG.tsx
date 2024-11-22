import React from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from 'sr/helpers/AssetHelpers'
type Props = {
  className?: string
  path: string
  svgClassName?: string
  onClick?: any
}

const KTSVG: React.FC<Props> = ({className = '', path, svgClassName = 'mh-50px', onClick}) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} onClick={onClick} />
    </span>
  )
}

export {KTSVG}
