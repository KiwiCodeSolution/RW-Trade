import { Locale } from '@/types/baseTypes'

import { fetchDiscountProductsCached } from '@/api/api-fetch/discountProducts'

import DiscountsSectionClient from './DiscountsSectionClient'

const DiscountsSectionServer = async ({
	title,
	btn,
	locale
}: {
	title: string
	btn: string
	locale: Locale
}) => {
	const data = await fetchDiscountProductsCached()

	if (!data.items.length) return null

	return <DiscountsSectionClient data={data} title={title} btn={btn} locale={locale} />
}

export default DiscountsSectionServer
