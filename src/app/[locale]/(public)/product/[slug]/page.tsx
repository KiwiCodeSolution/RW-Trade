import HeroProductPageComponent from '@/components/userUI/HeroProductPageComponent'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'
import Title from '@/components/userUI/baseComponents/Title'

import { BASE_URL } from '@/utils/config'

import { Locale, Product } from '@/types/baseTypes'

export default async function ProductPage({
	params
}: {
	params: { slug: string; locale: Locale }
}) {
	const { slug, locale } = await params
	const res = await fetch(`${BASE_URL}/products/slug/${slug}`, {
		next: { revalidate: 60 } // ISR кешування
	})

	if (!res.ok) throw new Error('Failed to fetch product')
	const product: Product = await res.json()

	const secondName = locale === 'uk' ? 'каталог' : 'catalog'

	return (
		<main className='w-full min-h-[80vh]'>
			<BaseSection className=''>
				<Path secondName={secondName} thirdName={product.title[locale]} locale={locale} />
			</BaseSection>
			<BaseSection className='flex flex-col pt-4 pb-8'>
				<Title isPageTitle tag='h1' styles='text-center'>
					{product.title[locale]}
				</Title>
			</BaseSection>
			<BaseSection className=''>
				<HeroProductPageComponent product={product} locale={locale} />
			</BaseSection>
		</main>
	)
}
