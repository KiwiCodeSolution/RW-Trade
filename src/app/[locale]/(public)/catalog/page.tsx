import AllItemsSection from '@/components/userUI/AllItemsSection'
import CategoriesSection from '@/components/userUI/CategoriesSection'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'

import { Locale } from '@/types/baseTypes'

const Catalog = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	const title = locale === 'uk' ? 'каталог' : 'catalog'
	return (
		<div className=''>
			<div className='user-container'>
				<BaseSection>
					<Path secondName={title} locale={locale} />
				</BaseSection>
				<CategoriesSection section='client' locale={locale} title='Категорії товарів' />
				<AllItemsSection locale={locale} />
			</div>
		</div>
	)
}

export default Catalog
