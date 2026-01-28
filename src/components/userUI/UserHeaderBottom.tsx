import { HeartIcon, PhoneIcon } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import HeaderCartButton from './HeaderCartButton'
import HeaderSearch from './HeaderSearch'
import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import Image from 'next/image'

const UserHeaderBottom = ({ locale }: { locale: Locale }) => {
	return (
		<div className='w-full header-shadow'>
			<section className='w-full mx-auto xl:max-w-[1980px] px-4 xl:px-8'>
				<div className='flex items-center h-[72px]'>
					<Link href='/' className='hidden sm:block mr-4'>
						<Image
							src='/logos/LOGO_152_blue.png'
							width={156}
							height={58}
							alt='rw-logo'
						/>
					</Link>
					<div className='grow sm:mr-6 '>
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

						<HeaderCartButton locale={locale} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default UserHeaderBottom
