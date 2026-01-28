import CategoryPageHeader from '@/components/userUI/CategoryPageHeader'

import { Locale } from '@/types/baseTypes'

export default async function CategoryNamePage({
	params
}: {
	params: Promise<{ slug: string; locale: Locale }>
}) {
	const { slug, locale } = await params

	return (
		<main className='min-h-[80wh]'>
			<CategoryPageHeader slug={slug} locale={locale} />
		</main>
	)
}
