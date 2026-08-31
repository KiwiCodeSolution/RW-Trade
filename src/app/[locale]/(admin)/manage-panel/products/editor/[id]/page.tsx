import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderOfEditProductPage from '@/components/adminUI/HeaderOfEditProductPage'
import ProductByID from '@/components/adminUI/ProductByID'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редагування продукту | RW-Trade'
}

export default async function ProductByIDPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<div className='w-full h-full relative'>
			<HeaderOfEditProductPage />
			{id && <ProductByID id={id} />}

			<GoBackBtn />
		</div>
	)
}
