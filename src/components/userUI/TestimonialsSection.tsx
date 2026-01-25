import { Locale } from '@/types/baseTypes'

import Baby from '../../../public/images/baby.png'

import TestimonialsCarousel from './TestimonialsCarousel'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import Image from 'next/image'

interface Props {
	locale: Locale
}

const TestimonialsSection = ({ locale }: Props) => {
	return (
		<BaseSection className='grid grid-cols-1 lg:grid-cols-2 py-14 lg:gap-10 lg:min-h-[720px]'>
			<Title tag='h2' styles='mb-2 lg:hidden'>
				{locale === 'uk' ? 'Відгуки про нас' : 'Reviews about us'}
			</Title>
			<p className='mb-8 lg:hidden'>
				{locale === 'uk'
					? 'Що пишуть про нашу роботу'
					: 'What people are saying about our work'}
			</p>
			<div className='flex items-center justify-center'>
				<Image
					src={Baby}
					alt='baby'
					width={600}
					height={600}
					className='max-w-[600px] h-auto'
				/>
			</div>
			<div className='flex flex-col'>
				<Title tag='h2' styles='mb-6 hidden lg:block'>
					{locale === 'uk' ? 'Відгуки про нас' : 'Reviews about us'}
				</Title>

				<p className='mb-6 hidden lg:block'>
					{locale === 'uk'
						? 'Що пишуть про нашу роботу'
						: 'What people are saying about our work'}
				</p>
				<div className='grow'>
					<TestimonialsCarousel locale={locale} />
				</div>
			</div>
		</BaseSection>
	)
}

export default TestimonialsSection
