import '../../app/globals.css'
import Link from 'next/link' 
import Person from '../../../public/icons/person-16.svg'
import RetailWholesale from './RetailWholesale'
import Language from './Language'

const UserHeaderTop = () => {
  return (
    <div className='w-full bg-nav'>
      <div className='user-container h-9'>
        <nav className='flex justify-between items-center h-full text-white'>
          <div className='flex gap-8'>
          <Link href='/about' className='hover:text-gr-5 duration-200'>Про компанію</Link>
          <Link href='/payment_delivery' className='hover:text-gr-5 duration-200' >Оплата та доставка</Link>
          <Link href='/warranty_return' className='hover:text-gr-5 duration-200' >Гарантія та повернення</Link>
          <Link href='/contacts' className='hover:text-gr-5 duration-200' >Контакти</Link>
          <Link href='/demo' className='hover:text-gr-5 duration-200'>Demo</Link>
          </div>
          <div className='flex gap-8'>
            <RetailWholesale />
            <Language />
            <Link href='/admin' className='flex gap-1 items-center hover:text-gr-5 duration-200'> 
              <Person />
              <div>Увійти</div>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default UserHeaderTop