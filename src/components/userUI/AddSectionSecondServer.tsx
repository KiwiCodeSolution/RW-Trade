import { Locale } from '@/types/baseTypes'

import { fetchPromoBannerCached } from '@/api/api-fetch/promoBanner'

import AddSectionSecondClient from './AddSectionSecondClient'

const AddSectionSecondServer = async ({ locale }: { locale: Locale }) => {
	const banner = await fetchPromoBannerCached()

	if (!banner) return null

	return <AddSectionSecondClient banner={banner} locale={locale} />
}

export default AddSectionSecondServer
