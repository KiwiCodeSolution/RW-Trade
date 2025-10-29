'use client'

import BagIcon from '@/assets/icons/bag-16.svg'
import BoxIcon from '@/assets/icons/box-16.svg'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'

const RetailWholesale = observer(() => {
	const { isWholesale, toggleWholesale } = productStore

	const current = isWholesale ? 'Опт' : 'Роздріб'

	return (
		<button
			type='button'
			onClick={toggleWholesale}
			className='flex gap-2 items-center hover:text-gr-5 duration-200 focus:outline-none'
		>
			{isWholesale ? <BoxIcon /> : <BagIcon />}
			<span>{current}</span>
		</button>
	)
})

export default RetailWholesale
