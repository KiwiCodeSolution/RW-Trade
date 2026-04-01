import { KiwiCodeLogo } from '@/assets/icons_logos'

import { Link } from '@/i18n/navigation'

const UserFooterBottom = () => {
	return (
		<div className='mb-2'>
			<div className='flex justify-center items-center gap-2'>
				<p className='text-gray-500'>Designed and Development by</p>
				<KiwiCodeLogo />
			</div>
			<p className='text-sm text-center'>
				By using this website, you agree to the{' '}
				<Link
					href='/terms-of-use'
					className='underline cursor-pointer hover:text-link-blue transition-colors duration-300'
				>
					Terms of Service
				</Link>{' '}
				and{' '}
				<Link
					href='/privacy-policy'
					className='underline cursor-pointer hover:text-link-blue transition-colors duration-300'
				>
					Privacy Policy
				</Link>
			</p>
		</div>
	)
}

export default UserFooterBottom
