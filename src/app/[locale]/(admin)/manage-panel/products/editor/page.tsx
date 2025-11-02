import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderOfCreateProductPage from '@/components/adminUI/HeaderOfCreateProductPage'
import ProductForm from '@/components/adminUI/ProductForm'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Створення продукту | RW-Trade'
}
export default function page() {
	return (
		<div className='w-full h-full relative'>
			<HeaderOfCreateProductPage />
			<ProductForm />
			<GoBackBtn />
		</div>
	)
}
