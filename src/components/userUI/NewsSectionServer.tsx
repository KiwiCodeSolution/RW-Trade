import { Locale } from '@/types/baseTypes'

import { fetchNewsCached } from '@/api/api-fetch/news'

import NewsSectionClient from './NewsSectionClient'

const NewsSectionServer = async ({
	section,
	title,
	subtitle,
	locale,
	bntText
}: {
	section: string
	title: string[]
	subtitle: string
	locale: Locale
	bntText: string
}) => {
	const data = await fetchNewsCached({
		page: 1,
		limit: 6,
		sort: 'date_desc'
	})

	if (!data.items.length) return null

	return (
		<NewsSectionClient
			data={data}
			section={section}
			title={title}
			subtitle={subtitle}
			locale={locale}
			bntText={bntText}
		/>
	)
}

export default NewsSectionServer
