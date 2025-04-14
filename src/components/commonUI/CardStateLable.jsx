'use client'
import CartPlus from '../../../public/icons/cart-plus.svg'
import Clock from '../../../public/icons/clock.svg'

const CardStateLabel = ({variant = 'green', size = 's', className = ''}) => {

  const baseStyle = 'flex justify-center items-center rounded-lg hover:shadow-lg hover:scale-102 duration-300'

  const variants = {
    green: 'bg-bg-green text-white',
    yellow: 'bg-sc-3 text-[#606975]',
    grey: 'bg-sc-2 text-white'
  }

  const sizes = {
    s: 'size-11',
    m: 'size-11 sm:size-16'
  }

  const combined = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  return (
    <button className={combined}>
      {variant === 'yellow' ? <Clock /> : <CartPlus />}
    </button>
  )
}

export default CardStateLabel