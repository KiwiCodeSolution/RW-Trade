'use client'
import '../../app/globals.css'

const BtnSolid = ({variant = 'primary', size = 's', children, className = '', action = null, btnType = 'button'}) => {

  const baseStyle ='block border-box cursor-pointer flex justify-center items-center p-[2px] rounded-full  transition-all duration-300 hover:shadow-lg hover:scale-103 overflow-hidden font-bold'

  const variants = {
    primary: 'bg-primary text-white',
    bronze: 'bg-bronze text-white', 
    green: 'bg-bg-green text-white', 
  }

  const sizes = {
    s: 'w-[204px] min-h-[48px]',
    m: 'w-[242px] min-h-[56px] text-xl',
    l: 'w-[280px] min-h-[48px] text-xl',
    xl: 'w-[340px] min-h-[48px] sm:w-[280px] text-xl',
    xxl: 'w-[340px] min-h-[52px] sm:w-[280px] sm:min-h-[48px]',
    xxxl: 'w-full max-w-[436px] min-h-[56px] text-xl sm:text-2xl'
  }

  const combined = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  const handleClick = (e) => {
    console.log('Click!')
  }

  return (
    <button className={combined} onClick={handleClick} type={btnType} >
      {children}
    </button>
  )
}

export default BtnSolid