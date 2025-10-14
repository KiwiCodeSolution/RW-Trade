import { Locale } from '@/types/baseTypes'

import BabyImg from '../../../public/images/baby.svg'

import TestimonialsCarousel from './TestimonialsCarousel'

interface Props {
	locale: Locale
}

const TestimonialsSection = ({ locale }: Props) => {
	return (
		<section className='grid grid-cols-2 py-14 gap-10 min-h-[720px]'>
			<div className='flex items-center justify-center'>
				<BabyImg className='max-w-[600px] h-auto' />
			</div>
			<div className='flex flex-col'>
				<h3 className='text-[40px] font-bold mb-6'>
					{locale === 'uk' ? 'Відгуки про нас' : 'Reviews about us'}
				</h3>
				<p className='mb-6'>
					{locale === 'uk'
						? 'Що пишуть про нашу роботу'
						: 'What people are saying about our work'}
				</p>
				<div className='grow'>
					<TestimonialsCarousel />
				</div>
			</div>
		</section>
	)
}

export default TestimonialsSection
