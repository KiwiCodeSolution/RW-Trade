import FavoritesSection from '@/components/userUI/FavoritesSection'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'

import { Locale } from '@/types/baseTypes'

const Favorites = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	return (
		<main className='min-h-[20vh]'>
			<BaseSection>
				<Path secondName='Favorites' locale={locale} />
			</BaseSection>

			<FavoritesSection locale={locale} />
		</main>
	)
}

export default Favorites
