import HeroProductPageComponent from '@/components/userUI/HeroProductPageComponent'
import OtherInformation from '@/components/userUI/OtherInformation'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'
import Title from '@/components/userUI/baseComponents/Title'

import { BASE_URL } from '@/utils/config'

import { LangField, Locale, Product } from '@/types/baseTypes'

import { getTranslations, setRequestLocale } from 'next-intl/server'

type Params = { locale: Locale; slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
	const { slug, locale } = await params
	const productRes = await fetch(`${BASE_URL}/products/slug/${slug}`, {
		next: { revalidate: 60 }
	})
	const product: Product = await productRes.json()

	if (!product) return null
	const seo = product.seo

	if (!product || !seo) return null

	return {
		title: product.title[locale] ?? product.title.uk,
		description: seo.description?.[locale] ?? seo.description?.uk,
		keywords: (seo.keywords as LangField)[locale] ?? (seo.keywords as string[])
	}
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
	const { slug, locale } = await params

	setRequestLocale(locale)
	const t = await getTranslations({ locale })

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

	const popularRes = await fetch(
		`${BASE_URL}/products/popular-products` +
			`?subCategoryId=${product.subCategoryId ?? ''}` +
			`&categoryId=${product.categoryId}` +
			`&excludeProductId=${product._id}`,
		{ next: { revalidate: 60 } }
	)

	const popularProducts: Product[] = popularRes.ok ? await popularRes.json() : []

	if (!product)
		return (
			<BaseSection className='flex flex-col pt-4 pb-8'>
				<Title isPageTitle tag='h1' styles='text-center'>
					{locale === 'uk' ? 'Вибачте, товар не знайдено' : 'Sorry, product not found'}
				</Title>
			</BaseSection>
		)
	const secondName = locale === 'uk' ? 'каталог' : 'catalog'

	const deliveryMethods = [
		{
			title: t('PaymentAndDeliveryPage.delivery.novaPoshta.title'),
			description: t('PaymentAndDeliveryPage.delivery.novaPoshta.desc')
		},
		{
			title: t('PaymentAndDeliveryPage.delivery.ukrPoshta.title'),
			description: t('PaymentAndDeliveryPage.delivery.ukrPoshta.desc')
		},
		{
			title: t('PaymentAndDeliveryPage.delivery.pickup.title'),
			description: t('PaymentAndDeliveryPage.delivery.pickup.desc')
		},
		{
			title: t('PaymentAndDeliveryPage.delivery.meest.title'),
			description: t('PaymentAndDeliveryPage.delivery.meest.desc')
		}
	]

	const deliveryTextByComponent = {
		title: t('DeliveryPayment.title'),
		methods_title: t('DeliveryPayment.methods_title'),
		methods: [
			t('DeliveryPayment.methods.0'),
			t('DeliveryPayment.methods.1'),
			t('DeliveryPayment.methods.2'),
			t('DeliveryPayment.methods.3'),
			t('DeliveryPayment.methods.4')
		],
		guarantee_title: t('DeliveryPayment.guarantee_title'),
		guarantee: [t('DeliveryPayment.guarantee.0')],
		delivery_title: t('DeliveryPayment.delivery_title'),
		delivery: [
			t('DeliveryPayment.delivery.0'),
			t('DeliveryPayment.delivery.1'),
			t('DeliveryPayment.delivery.2')
		]
	}

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

			<HeroProductPageComponent
				product={product}
				locale={locale}
				deliveryTextByComponent={deliveryTextByComponent}
			/>
			<OtherInformation
				product={product}
				locale={locale}
				partnersProducts={partnerProducts}
				popularProducts={popularProducts}
				baseDeliveryTexts={deliveryMethods}
				deliveryTextByComponent={deliveryTextByComponent}
			/>
		</main>
	)
}
