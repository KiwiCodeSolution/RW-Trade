import HeartIcon from '@/assets/icons/heart-primary-50.svg'
import PhoneIcon from '@/assets/icons/phone-primary-50.svg'

import { Locale } from '@/types/baseTypes'

import HeaderCartButton from './HeaderCartButton'
import HeaderSearch from './HeaderSearch'
import BaseSection from './baseComponents/BaseSection'
import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import Image from 'next/image'

const UserHeaderBottom = ({ locale }: { locale: Locale }) => {
	return (
		<div className='w-full header-shadow'>
			<BaseSection>
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
						<HeaderSearch locale={locale} />
					</div>
					<div className='hidden sm:flex items-center gap-6'>
						<Link
							href='/favorites'
							className='rounded-full hover:shadow-lg hover:scale-102 duration-200'
						>
							<HeartIcon />
						</Link>
						<div className='rounded-full hover:shadow-lg hover:scale-102 duration-200'>
							<Link
								href='/contacts'
								className='rounded-full hover:shadow-lg hover:scale-102 duration-200'
							>
								<PhoneIcon />
							</Link>
						</div>

						<HeaderCartButton />
					</div>
				</div>
			</BaseSection>
		</div>
	)
}

export default UserHeaderBottom
