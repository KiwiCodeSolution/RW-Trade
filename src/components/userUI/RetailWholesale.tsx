'use client'

import { productStore } from '@/store/ProductsStore'

import BagIcon from '../../../public/icons/bag-16.svg'
import BoxIcon from '../../../public/icons/box-16.svg'

import { observer } from 'mobx-react-lite'

const RetailWholesale = observer(() => {
	const { isWholesale, toggleWholesale } = productStore

	const current = isWholesale ? 'Опт' : 'Роздріб'

	return (
		<div
			className='flex gap-2 items-center cursor-pointer hover:text-gr-5 duration-200'
			onClick={toggleWholesale}
		>
			{isWholesale ? <BoxIcon /> : <BagIcon />}
			<div>{current}</div>
		</div>
	)
})

export default RetailWholesale
