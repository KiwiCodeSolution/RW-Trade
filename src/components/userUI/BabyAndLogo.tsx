import Image from 'next/image'

const BabyAndLogo = ({ styles }: { styles?: string }) => {
	return (
		<div className={`flex flex-col items-center ${styles}`}>
			<div className='mx-auto w-fit mb-20'>
				<Image src='/logos/LOGO_252_orange.png' width={252} height={96} alt='logo' />
			</div>
			<div className='w-full max-w-[600px]'>
				<Image src='/images/baby.svg' alt='baby' width={600} height={400} />
			</div>
		</div>
	)
}

export default BabyAndLogo
