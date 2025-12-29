'use client'

import { OrderItem } from '@/store/CartStore'

import ChangeCountBtn from './ChangeCountBtn'

import { observer } from 'mobx-react-lite'

type Props = {
	item: OrderItem
	locale: string | { uk?: string; en?: string }
}

const ProductCartComponent = observer(({ item, locale }: Props) => {
	const price = item.finalPrice
	const sum = item.quantity * price
	const localeKey = typeof locale === 'string' ? locale : locale.en || locale.uk || 'en'
	const productNameValue =
		typeof item.productName === 'string'
			? item.productName
			: item.productName[localeKey as keyof typeof item.productName]

	return (
		<div className='w-full rounded-lg border border-gr-5 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-4 py-3 px-4'>
			{/* ліва частина */}
			<div className=''>
				<p className='gradient-text font-bold mb-1 truncate'>{productNameValue}</p>
				<p className='text-xl lg:text-base lg:font-bold w-full flex items-center justify-between lg:justify-normal'>
					{locale === 'en' ? 'Price: ' : 'Ціна: '} <span>{item.finalPrice} ₴</span>
				</p>
			</div>

			{/* права частина */}
			<div className=' grid grid-cols-2 justify-between lg:justify-normal gap-3'>
				<ChangeCountBtn product={item} />
				<div className='grid grid-cols-[1fr_3fr] items-center gap-1'>
					<p className='text-right text-xl lg:text-2xl lg:font-medium'>
						{locale === 'en' ? 'Sum:' : 'Сума:'}
					</p>
					<p className='text-xl lg:text-2xl lg:font-medium'>{sum} ₴</p>
				</div>
			</div>
		</div>
	)
})
export default ProductCartComponent
