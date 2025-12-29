'use client'

import { Settings } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import AdminRatingComponent from '../adminUI/AdminRatingComponent'
import ProductInfoComponent from '../userUI/ProductInfoComponent'
import BaseImageItem from '../userUI/baseComponents/BaseImageItem'

import EditProductCard from './EditProductCard'
import { Link } from '@/i18n/navigation'

import Image from 'next/image'
import { useState } from 'react'

type ProductCardProps = {
	product: Product
	type?: 'our' | 'partners'
}
const AdminProductCard = ({ type, product }: ProductCardProps) => {
	const locale = 'uk'
	const bgColor = type === 'partners' ? 'bg-other-2' : 'bg-other-1'
	const [isShowSettings, setIsShowSettings] = useState(false)
	const correctRating = product.rating ? parseFloat(Math.min(product.rating, 5).toFixed(1)) : 0

	return (
		<article
			className={`h-[317px] w-full min-w-[162px] max-w-[162px] rounded-md border-2 border-sc-1 flex flex-col justify-between items-center relative product-card-shadow `}
		>
			{!product.isPublished && (
				<div className='flex justify-center absolute top-0 left-0 w-full h-full bg-black/60 z-[11]'>
					<Image
						src='/images/hide.png'
						alt=''
						width={72}
						height={72}
						className='object-contain'
					/>
				</div>
			)}
			<div className='w-full h-[55px] absolute top-0 left-0 flex items-center justify-between p-1'>
				<div className='h-full flex flex-col gap-y-1 items-center relative z-[10]'>
					{product.isHit && (
						<span className='w-[42px] h-6 rounded-tl-lg rounded-br-lg bg-sc-4 uppercase text-xs font-medium flex items-center justify-center'>
							Хіт
						</span>
					)}
					{product.newArrival && (
						<span className='w-[42px] h-6 rounded-tl-lg rounded-br-lg bg-link-blue uppercase text-xs font-medium flex text-white items-center justify-center'>
							New
						</span>
					)}
				</div>
				<button
					className='w-8 h-8 flex items-center justify-center relative z-[40]'
					onClick={() => setIsShowSettings(!isShowSettings)}
				>
					<Settings />
				</button>
			</div>
			{isShowSettings && <EditProductCard product={product} />}
			<div className={`h-[162px] w-full overflow-hidden`}>
				<BaseImageItem
					src={product.images && product.images[0]}
					alt={product.title[locale]}
					width={162}
					height={162}
					className={`w-full min-w-[162px] xl:min-w-[278px] max-w-[330px] object-cover min-h-[162px] xl:h-full`}
				/>
			</div>
			<div className={`w-full h-[147px] p-2 flex flex-col justify-center ${bgColor}`}>
				<Link
					href={`/product/${product.slugUk}`}
					className='cursor-pointer group h-[80px] xl:h-[72px]'
				>
					<h3
						className={`text-[15px] font-medium line-clamp-2 overflow-hidden text-ellipsis text-link-blue group-hover:underline group-hover:decoration-link-blue`}
					>
						{product.title[locale]}
					</h3>
				</Link>

				<AdminRatingComponent productRating={correctRating} />

				<div className='w-full h-[64px] flex items-center justify-between'>
					<ProductInfoComponent product={product} locale={locale} typePage={'admin'} />
				</div>

				<p className='text-[14px] '>Код товару: {product.sku}</p>
			</div>
		</article>
	)
}

export default AdminProductCard
