import { Product } from '@/types/baseTypes'

import ProductCard from '../userUI/ProductCard'

import CreateProductBtn from './CreateProductBtn'

const ProductWrapper = ({ products, categoryId }: { products?: Product[]; categoryId: string }) => {
	return (
		<section className='grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 '>
			{/* {products.map(product => (
				<div key={product._id}>
					<ProductCard locale='uk' />
				</div>
			))} */}
			<CreateProductBtn categoryId={categoryId} />
			{[...Array(10)].map((_, index) => (
				<div key={index}>
					<ProductCard locale='uk' typePage='admin' />
				</div>
			))}
		</section>
	)
}

export default ProductWrapper
