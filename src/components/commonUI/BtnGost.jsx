'use client'
import '../../app/globals.css'

const BtnGost = ({variant = 'gost', children, className = '', action = null, btnType = 'button'}) => {

  const baseStyle ='block border-box cursor-pointer flex justify-center items-center transition-all duration-300 hover:shadow-lg hover:scale-101 overflow-hidden font-bold min-h-[48px]'

  const variants = {
    gost: 'bg-bg-light text-gr-2 min-w-[160px] rounded-full',
    outlined: 'bg-primary min-w-[204px] rounded-full p-[2px]', 
    block: 'bg-primary w-full min-w-[162px] rounded-lg p-[2px]'
  }

  const divStyle = {
    gost: 'rounded-full',
    outlined: 'rounded-full',
    block: 'rounded-md'
  }

  const combined = `${baseStyle} ${variants[variant]} ${className}`.trim()

  const handleClick = (e) => {
    alert('Click!')
  }

  return (
    <button className={combined} onClick={handleClick} type={btnType} >
      <div className={`bg-bg-light w-full h-[44px] flex justify-center items-center ${divStyle[variant]}`} >
        <div className='bg-primary bg-clip-text text-transparent flex gap-2 justify-center items-center'>
          {children}
        </div>
      </div>
    </button>
  )
}

export default BtnGost