import AllItemsSection from '@/components/userUI/AllItemsSection'
import CategoriesSection from '@/components/userUI/CategoriesSection'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'

import { Locale } from '@/types/baseTypes'

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string; locale: Locale }>
}) {
	const { locale } = await params

	return {
		title: locale === 'uk' ? 'RW-Trade | Каталог' : 'RW-Trade | Catalog'
	}
}

const Catalog = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	const title = locale === 'uk' ? 'каталог' : 'catalog'
	const description = locale === 'uk' ? 'Категорії товарів' : 'Categories'

	return (
		<div className=''>
			<BaseSection>
				<Path secondName={title} locale={locale} />
			</BaseSection>
			<CategoriesSection section='client' locale={locale} title={description} />
			<AllItemsSection locale={locale} />
		</div>
	)
}

export default Catalog
