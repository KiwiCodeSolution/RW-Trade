'use client'

import Image from 'next/image'

const ProductCard = ({ product }) => {
	const products = [
		{
			title: '',
			imgUrl: '',
			description: '',
			price: '',
			liked: false,
			hit: true,
			new: true,
			rating: 4.3,
			state: '',
			productCode: ''
		}
	]

	return (
		<div className='h-[505px] w-full min-w-[278px] max-w-[360px] rounded-md border-2 border-sc-1 p-3'>
			<div className='flex justify-center items-center h-[236px]'>
				{!!product?.imgUrl ? (
					<img src={imgUrl} alt={product?.name} />
				) : (
					<Image src='/logos/LOGO 152 blue.png' width={156} height={58} alt='logo' />
				)}
			</div>
			<p className='text-link-blue'>{product?.name}</p>
			{/* <p>{product?.description}</p> */}
			<p className='italic font-bold'>Category: {product?.category}</p>
			<p className='italic font-bold'>Subcategory: {product?.subCategory}</p>
			<p className='font-bold'>Price: {product?.price} uah</p>
			<p>Product code: {product?.id}</p>
		</div>
	)
}

export default ProductCard
