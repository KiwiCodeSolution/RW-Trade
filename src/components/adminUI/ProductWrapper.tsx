import { Product } from '@/types/baseTypes'

import ProductCard from '../userUI/ProductCard'

import CreateProductBtn from './CreateProductBtn'

const ProductWrapper = ({ products, categoryId }: { products: Product[]; categoryId: string }) => {
	return (
		<section className='grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 '>
			<CreateProductBtn categoryId={categoryId} />
			{products.map(p => (
				<ProductCard locale='uk' typePage='admin' product={p} key={p._id} />
			))}
		</section>
	)
}

export default ProductWrapper
