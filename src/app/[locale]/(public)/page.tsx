import AddSectionSecondServer from '@/components/userUI/AddSectionSecondServer'
import BannersPageComponent from '@/components/userUI/BannersPageComponent'
import DiscountsSectionServer from '@/components/userUI/DiscountsSectionServer'
import FormSection from '@/components/userUI/FormSection'
import NewsSectionServer from '@/components/userUI/NewsSectionServer'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProductsServer from '@/components/userUI/PopularProductsServer'
import RetailWholesaleModal from '@/components/userUI/RetailWholesaleModal'
import TestimonialsSection from '@/components/userUI/TestimonialsSection'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'

import { Locale } from '@/types/baseTypes'

import { fetchPublicBanners } from '@/api/api-fetch/banners'

import { getTranslations } from 'next-intl/server'

const Main = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	const t = await getTranslations({ locale })
	const titles = [
		t('NewsSectionAllPages.title_homePage'),
		t('NewsSectionAllPages.title_newsPage')
	]

	const banners = await fetchPublicBanners()

	return (
		<main className='min-h-[80vh]'>
			<BaseSection className='min-h-[200px] xl:min-h-[400px]'>
				<BannersPageComponent banners={banners} />
			</BaseSection>

			<PopularProductsServer locale={locale} />

			<AddSectionSecondServer locale={locale} />

			<DiscountsSectionServer
				btn={t('HomePage.discounts.btn')}
				title={t('HomePage.discounts.title')}
				locale={locale}
			/>

			<PopularCategories />

			<FormSection />

			<TestimonialsSection locale={locale} />

			<BaseSection>
				<NewsSectionServer
					section='main'
					locale={locale}
					title={titles}
					subtitle={t('NewsSectionAllPages.subtitle_homePage')}
					bntText={t('NewsSectionAllPages.btn_homePage')}
				/>
			</BaseSection>
			<RetailWholesaleModal locale={locale} />
		</main>
	)
}

export default Main
