import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'

import { Locale } from 'next-intl'

export default async function CategoryNamePage({
	params
}: {
	params: Promise<{ categoryName: string; locale: Locale }>
}) {
	const { categoryName, locale } = await params

	return (
		<main className='min-h-[80wh]'>
			<BaseSection>
				<Path secondName='catalog' thirdName={categoryName} locale={locale} />
			</BaseSection>

			{/* <BaseSection> </BaseSection> */}
		</main>
	)
}
