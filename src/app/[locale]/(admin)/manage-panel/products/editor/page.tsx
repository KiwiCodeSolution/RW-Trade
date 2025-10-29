import HeaderOfCreateProductPage from '@/components/adminUI/HeaderOfCreateProductPage'
import ProductForm from '@/components/adminUI/ProductForm'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Створення продукту | RW-Trade'
}
export default function page() {
	return (
		<div className='w-full'>
			<HeaderOfCreateProductPage />
			<ProductForm />
		</div>
	)
}
