import AllItemsSection from '@/components/userUI/AllItemsSection'
import CategoriesSection from '@/components/userUI/CategoriesSection'

import { Locale } from '@/types/baseTypes'

const Catalog = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params
	return (
		<div className=''>
			<div className='user-container'>
				{/* <Breadcrumbs /> */}
				<CategoriesSection section='client' locale={locale} title='Категорії товарів' />
				<AllItemsSection locale={locale} />
			</div>
		</div>
	)
}

export default Catalog
