import BannersPageComponent from '@/components/adminUI/BannersPageComponent'
import HeaderPage from '@/components/adminUI/HeaderPage'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Банери | RW-Trade'
}

export default async function BannersAdminPage() {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Управління банерами' />

			<BannersPageComponent />
		</div>
	)
}
