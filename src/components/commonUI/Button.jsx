import React from 'react'
import '../../app/globals.css'

const Button = ({variant = 'primary', size = 's', children, className = '', action = null, ...props}) => {

  const baseStyle ='block border-box cursor-pointer flex justify-center items-center p-[2px] rounded-full  transition-all duration-300 hover:shadow-lg hover:scale-103 overflow-hidden font-bold'

  const variants = {
    primary: 'bg-primary text-white',
    bronze: 'bg-bronze text-white', 
    outlined: 'bg-primary ', 
    green: 'bg-bg-green text-white', 
    gost: 'text-gr-2' 
  }

  const sizes = {
    s: 'w-[204px] min-h-[48px] text-xl',
    m: 'w-[242px] min-h-[56px] text-xl',
    l: 'w-[280px] min-h-[48px] text-xl',
    xl: 'w-[340px] min-h-[48px] sm:w-[280px] text-xl',
    xxl: 'w-[340px] min-h-[52px] sm:w-[280px] sm:min-h-[48px]'
  }

  const combined = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  return (
    <button className={combined} onClick={action} >
      <div className={`${variant === 'outlined' && 'bg-bg-light w-full rounded-full h-full flex justify-center items-center'}`}>
        <span className={`${(variant === 'outlined' || variant === 'gost') && 'bg-primary bg-clip-text text-transparent'}`}>
          {children}
        </span>
      </div>
    </button>
  )
}

export default Button