'use client'

import { Locale } from '@/types/baseTypes'

import { OrderItem } from '@/store/CartStore'

import ChangeCountBtn from './ChangeCountBtn'

import { observer } from 'mobx-react-lite'

type Props = {
	item: OrderItem
	locale: Locale
}

const ProductCartComponent = observer(({ item, locale }: Props) => {
	const price = item.finalPrice
	const sum = item.quantity * price

	return (
		<div className='list-none w-full rounded-lg border border-gr-5 grid grid-cols-2 items-center justify-between gap-4 py-3 px-4'>
			{/* ліва частина */}
			<div className=''>
				<p className='gradient-text font-bold mb-1 truncate'>{item.productName[locale]}</p>
				<p className='font-bold'>
					{locale === 'en' ? 'Price:' : 'Ціна:'} {item.finalPrice} ₴
				</p>
			</div>

			{/* права частина */}
			<div className='grid grid-cols-3 items-center gap-4'>
				<ChangeCountBtn product={item} />
				<p className='text-right text-2xl font-medium'>
					{locale === 'en' ? 'Sum:' : 'Сума:'}
				</p>
				<p className='text-2xl font-medium'>{sum} ₴</p>
			</div>
		</div>
	)
})
export default ProductCartComponent
