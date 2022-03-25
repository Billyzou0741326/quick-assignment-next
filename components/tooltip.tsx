import React from 'react'


interface TooltipProps {
  text?: string
  children?: React.ReactNode
}

const Tooltip = (props: TooltipProps): JSX.Element => {
  const {
    text = null,
    children = <></>,
  } = props
  const tipRef = React.useRef(null)
  const [ show, setShow ] = React.useState(false)

  const onMouseEnter = () => {
    setShow(true)
  }
  const onMouseLeave = () => {
    setShow(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`absolute whitespace-nowrap ml-4 left-full px-4 py-2
          bg-gradient-to-r from-black to-gray-700 text-white rounded flex items-center
          transition-all duration-150
          ${show ? '' : 'hidden'}`}
        ref={tipRef}
      >
        {text}
      </div>
      {children}
    </div>
  )
}

export default Tooltip
