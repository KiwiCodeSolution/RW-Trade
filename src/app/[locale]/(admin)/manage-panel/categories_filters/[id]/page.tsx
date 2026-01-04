import AdminCategoriesSection from '@/components/adminUI/AdminCategoriesSection'
import GoBackBtn from '@/components/adminUI/GoBackBtn'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Категорії та фільтри | RW-Trade'
}

export default async function Categories({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<div className='w-full h-full relative'>
			<AdminCategoriesSection id={id} />
			<GoBackBtn />
		</div>
	)
}
