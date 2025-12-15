import { Product } from '@/types/baseTypes'

import AdminProductCard from './AdminProductCard'
import CreateProductBtn from './CreateProductBtn'

const ProductWrapper = ({ products, categoryId }: { products: Product[]; categoryId: string }) => {
	return (
		<section className='grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 mb-5'>
			<CreateProductBtn categoryId={categoryId} />
			{products.map(p => (
				<AdminProductCard product={p} key={p._id} />
			))}
		</section>
	)
}

export default ProductWrapper
