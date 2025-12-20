import HeroProductPageComponent from '@/components/userUI/HeroProductPageComponent'
import OtherInformation from '@/components/userUI/OtherInformation'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'
import Title from '@/components/userUI/baseComponents/Title'

import { BASE_URL } from '@/utils/config'

import { Locale, Product } from '@/types/baseTypes'

export default async function ProductPage({
	params
}: {
	params: Promise<{ slug: string; locale: Locale }>
}) {
	const { slug, locale } = await params

	const productRes = await fetch(`${BASE_URL}/products/slug/${slug}`, {
		next: { revalidate: 60 }
	})

	if (!productRes.ok) throw new Error('Failed to fetch product')
	const product: Product = await productRes.json()

	const partnersRes = await fetch(
		`${BASE_URL}/products/partners` +
			`?subCategoryId=${product.subCategoryId ?? ''}` +
			`&categoryId=${product.categoryId}` +
			`&excludeProductId=${product._id}`,
		{ next: { revalidate: 60 } }
	)

	const partnerProducts: Product[] = partnersRes.ok ? await partnersRes.json() : []

	// console.log('partnerProducts', partnerProducts.length, partnerProducts)

	const popularRes = await fetch(
		`${BASE_URL}/products/popular-products` +
			`?subCategoryId=${product.subCategoryId ?? ''}` +
			`&categoryId=${product.categoryId}` +
			`&excludeProductId=${product._id}`,
		{ next: { revalidate: 60 } }
	)

	const popularProducts: Product[] = popularRes.ok ? await popularRes.json() : []

	console.log('popularProducts', popularProducts.length, popularProducts)

	if (!product)
		return (
			<BaseSection className='flex flex-col pt-4 pb-8'>
				<Title isPageTitle tag='h1' styles='text-center'>
					{locale === 'uk' ? 'Вибачте, товар не знайдено' : 'Sorry, product not found'}
				</Title>
			</BaseSection>
		)
	const secondName = locale === 'uk' ? 'каталог' : 'catalog'

	return (
		<main className='w-full min-h-[80vh]'>
			<BaseSection className='hidden lg:flex'>
				<Path secondName={secondName} thirdName={product.title[locale]} locale={locale} />
			</BaseSection>
			<BaseSection className='lg:hidden'>
				<Path secondName={secondName} locale={locale} />
			</BaseSection>
			<BaseSection className='flex flex-col pt-4 pb-8'>
				<Title isPageTitle tag='h1' styles='text-center'>
					{product.title[locale]}
				</Title>
			</BaseSection>

			<HeroProductPageComponent product={product} locale={locale} />
			<OtherInformation
				product={product}
				locale={locale}
				partnersProducts={partnerProducts}
				popularProducts={popularProducts}
			/>
		</main>
	)
}
