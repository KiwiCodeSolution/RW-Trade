import KiwiCodeLogo from '@/assets/logos/KIWICode.svg'

const UserFooterBottom = () => {
	return (
		<div className='mb-2'>
			<div className='flex justify-center items-center gap-2'>
				<p className='text-gray-500'>Designed and Development by</p>
				<KiwiCodeLogo />
			</div>
			<p className='text-sm text-center'>
				By using this website, you agree to the Terms of Service and Privacy Policy
			</p>
		</div>
	)
}

export default UserFooterBottom
