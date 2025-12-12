import AddSectionFirst from '@/components/userUI/AddSectionFirst'
import AddSectionSecond from '@/components/userUI/AddSectionSecond'
import DiscountsSection from '@/components/userUI/DiscountsSection'
import FormSection from '@/components/userUI/FormSection'
import NewsSection from '@/components/userUI/NewsSection'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProducts from '@/components/userUI/PopularProducts'
import RetailWholesaleModal from '@/components/userUI/RetailWholesaleModal'
import TestimonialsSection from '@/components/userUI/TestimonialsSection'

import { Locale } from '@/types/baseTypes'

import { getTranslations } from 'next-intl/server'

const Main = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	const t = await getTranslations({ locale })
	const titles = [
		t('NewsSectionAllPages.title_homePage'),
		t('NewsSectionAllPages.title_newsPage')
	]

	return (
		<main className='min-h-[80vh]'>
			<AddSectionFirst />
			<PopularProducts />

			<AddSectionSecond />

			<DiscountsSection
				btn={t('HomePage.discounts.btn')}
				title={t('HomePage.discounts.title')}
				locale={locale}
			/>
			<PopularCategories />

			<FormSection />

			<TestimonialsSection locale={locale} />
			<NewsSection
				section='main'
				locale={locale}
				title={titles}
				subtitle={t('NewsSectionAllPages.subtitle_homePage')}
				bntText={t('NewsSectionAllPages.btn_homePage')}
			/>
			<RetailWholesaleModal locale={locale} />
		</main>
	)
}

export default Main
