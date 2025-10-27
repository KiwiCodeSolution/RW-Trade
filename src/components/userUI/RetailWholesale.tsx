'use client'

import { productStore } from '@/store/ProductsStore'

import BagIcon from '../../../public/icons/bag-16.svg'
import BoxIcon from '../../../public/icons/box-16.svg'

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
