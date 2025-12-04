import FavoritesSection from '@/components/userUI/FavoritesSection'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'

import { Locale } from '@/types/baseTypes'

const Favorites = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params
	const secondPathName = locale === 'uk' ? 'Улюблені товари' : 'Favorites products'

	return (
		<main className='min-h-[20vh]'>
			<BaseSection>
				<Path secondName={secondPathName} locale={locale} />
			</BaseSection>

			<FavoritesSection locale={locale} />
		</main>
	)
}

export default Favorites
