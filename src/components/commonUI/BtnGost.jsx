'use client'
import '../../app/globals.css'

const BtnGost = ({variant = 'gost', children, className = '', action = null}) => {

  const baseStyle ='block border-box cursor-pointer flex justify-center items-center p-[2px] transition-all duration-300 hover:shadow-lg hover:scale-103 overflow-hidden font-bold min-h-[48px]'

  const variants = {
    gost: 'text-gr-2 w-[160px] rounded-full',
    outlined: 'bg-primary w-[204px] rounded-full', 
    block: 'bg-primary w-full min-w-[162px] rounded-lg'
  }

  const divStyle = {
    gost: '',
    outlined: 'rounded-full',
    block: 'rounded-md'
  }

  const combined = `${baseStyle} ${variants[variant]} ${className}`.trim()

  const handleClick = (e) => {
    alert('Click!')
  }

  return (
    <button className={combined} onClick={handleClick} >
      <div className={`bg-bg-light w-full h-full flex justify-center items-center ${divStyle[variant]}`} >
        <span className='bg-primary bg-clip-text text-transparent'>
          {children}
        </span>
      </div>
    </button>
  )
}

export default BtnGost