import AddSectionFirst from '@/components/userUI/AddSectionFirst'
import AddSectionSecond from '@/components/userUI/AddSectionSecond'
import DiscountsSection from '@/components/userUI/DiscountsSection'
import FormSection from '@/components/userUI/FormSection'
import NewsSection from '@/components/userUI/NewsSection'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProducts from '@/components/userUI/PopularProducts'
import TestimonialsSection from '@/components/userUI/TestimonialsSection'

import { Locale } from '@/types/baseTypes'

import { getTranslations } from 'next-intl/server'

const Main = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	const t = await getTranslations({ locale, namespace: 'HomePage.discounts' })

	return (
		<main className='min-h-[80vh]'>
			<AddSectionFirst />
			<PopularProducts />

			<AddSectionSecond />

			<DiscountsSection btn={t('btn')} title={t('title')} />
			<PopularCategories />

			<FormSection />

			<TestimonialsSection locale={locale} />
			<NewsSection section='main' />
		</main>
	)
}

export default Main
