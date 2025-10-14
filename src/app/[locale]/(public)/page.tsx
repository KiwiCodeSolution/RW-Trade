import AddSectionFirst from '@/components/userUI/AddSectionFirst'
import AddSectionSecond from '@/components/userUI/AddSectionSecond'
import DiscountsSection from '@/components/userUI/DiscountsSection'
import FormSection from '@/components/userUI/FormSection'
import NewsSection from '@/components/userUI/NewsSection'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProducts from '@/components/userUI/PopularProducts'
import TestimonialsSection from '@/components/userUI/TestimonialsSection'

import { Locale } from '@/types/baseTypes'

const Main = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	return (
		<main>
			<div className='user-container'>
				<AddSectionFirst />
				<PopularProducts />
			</div>
			<AddSectionSecond />
			<div className='user-container'>
				<DiscountsSection />
				<PopularCategories />
			</div>
			<FormSection />
			<div className='user-container'>
				<TestimonialsSection locale={locale} />
				<NewsSection isMain={true} locale={locale} />
			</div>
		</main>
	)
}

export default Main
