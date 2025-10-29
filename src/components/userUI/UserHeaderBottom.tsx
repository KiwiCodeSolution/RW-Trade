import CartIcon from '@/assets/icons/cart-bronze-50.svg'
import HeartIcon from '@/assets/icons/heart-primary-50.svg'
import PhoneIcon from '@/assets/icons/phone-primary-50.svg'

import HeaderSearch from './HeaderSearch'
import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import Image from 'next/image'

const UserHeaderBottom = () => {
	return (
		<div className='w-full header-shadow'>
			<div className='user-container'>
				<div className='flex items-center h-[72px]'>
					<Link href='/' className='hidden sm:block mr-4'>
						<Image
							src='/logos/LOGO_152_blue.png'
							width={156}
							height={58}
							alt='rw-logo'
						/>
					</Link>
					<div className='grow sm:mr-6'>
						<HeaderSearch />
					</div>
					<div className='hidden sm:flex items-center gap-6'>
						<Link
							href='/favorites'
							className='rounded-full hover:shadow-lg hover:scale-102 duration-200'
						>
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
