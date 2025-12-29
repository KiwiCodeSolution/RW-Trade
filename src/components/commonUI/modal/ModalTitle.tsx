import Image from 'next/image'

type Props = {
	title: string
	isShowLogo?: boolean
}

const ModalTitle = ({ title, isShowLogo }: Props) => {
	return (
		<div className='flex flex-col'>
			<div className={`grid ${isShowLogo ? 'grid-cols-3' : 'grid-cols-1'} h-12 items-center`}>
				<h3
					className={`${isShowLogo ? 'text-[32px] font-bold' : 'text-xl font-medium text-center'}`}
				>
					{title}
				</h3>

				{isShowLogo && (
					<div className='col-span-2'>
						<Image src='/logos/LOGO_252_blue.png' width={252} height={96} alt='logo' />
					</div>
				)}
			</div>
			<div className='h-0.5 w-full bg-primary' />
		</div>
	)
}

export default ModalTitle
