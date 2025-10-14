import { Locale } from '@/types/baseTypes'

import BabyImg from '../../../../../public/images/baby.svg'

import Image from 'next/image'

const Contacts = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	return (
		<div>
			<div className='header-shadow'></div>
			<div className='user-container'>
				<h1 className='page-title text-center'>Контакты</h1>

				<div className='grid grid-cols-2 py-4 gap-10 sm:gap-24'>
					<div className='flex flex-col items-center'>
						<div className='mx-auto w-fit mb-20'>
							<Image
								src='/logos/LOGO 252 orange.png'
								width={252}
								height={96}
								alt='logo'
							/>
						</div>
						<div className='w-full max-w-[600px]'>
							<BabyImg className='w-full h-auto' />
						</div>
					</div>

					<div className='max-w-[660px] text-2xl'>
						<p className='gradient-text font-semibold mb-8'>
							RW Trade - товари високої якості!
						</p>

						<p className='font-bold'>Відділ продажу</p>
						<p className='mb-8'>
							вул. Дмитра Коцюбайла (Державінська), 38, 2 поверх, офіс 215, Харків,
							Україна
						</p>

						<p className='font-bold'>+380 (99) 444-58-33</p>
						<p className='mb-8'>Консультація, замовлення (Viber)</p>

						<p className='font-bold'>+380 (93) 509-03-99</p>
						<p className='mb-8'>Замовлення, якість обслуговування</p>

						<p className='font-bold'>+380 (97) 336-89-00</p>
						<p className='mb-8'>Консультація, замовлення</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contacts
