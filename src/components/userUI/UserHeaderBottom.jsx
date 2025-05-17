import '../../app/globals.css'
import Link from 'next/link' 
import HeartIcon from '../../../public/icons/heart-primary-50.svg'
import PhoneIcon from '../../../public/icons/phone-primary-50.svg' 
import CartIcon from '../../../public/icons/cart-bronze-50.svg' 
import HeaderSearch from './HeaderSearch'

const UserHeaderBottom = () => {
  return (
    <div className='w-full'>
      <div className='user-container'>
        <div className='flex items-center h-[72px]'>
          <Link href='/' className='hidden sm:block mr-4'>
            <img src='logos/LOGO 152 blue.png' />
          </Link>
          <div className='grow sm:mr-6'>
            <HeaderSearch />
          </div>
          <div className='hidden sm:flex items-center gap-6'>
            <Link href='/favorites' className='rounded-full hover:shadow-lg hover:scale-102 duration-200'>
              <HeartIcon />
            </Link>
            <div className='rounded-full hover:shadow-lg hover:scale-102 duration-200'>
              <PhoneIcon />
            </div>
            <div className='rounded-full hover:shadow-lg hover:scale-102 duration-200'>
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHeaderBottom