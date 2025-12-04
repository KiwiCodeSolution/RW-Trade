'use client'

import { Locale } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import BtnSolid from '../commonUI/BtnSolid'

import CartStepTwo from './CartStepTwo'
import ProductCartComponent from './ProductCartComponent'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import { useState } from 'react'

type Props = {
	step: number
	onClose?: () => void
}

const CartComponent = observer(({ step = 1, onClose }: Props) => {
	const locale = useLocale() as Locale
	const { items, oneStepBuyItem, totalSum } = cartStore

	const [currentStep, setCurrentStep] = useState(step)

	if (items.length === 0 && !oneStepBuyItem)
		return <div>{locale === 'en' ? 'Cart is empty' : 'Кошик порожній'}</div>

	return (
		<div className='flex flex-col gap-y-4 overflow-y-auto mt-5'>
			{currentStep === 1 ? (
				<div className='flex flex-col gap-y-3 h-[460px] pb-5 justify-between'>
					{items.map(item => (
						<ProductCartComponent key={item.productId} item={item} locale={locale} />
					))}
					<div className='flex ml-auto pr-1'>
						<p className='text-xl font-bold mr-1'>
							{locale === 'en' ? 'Total amount:' : 'Всього на суму:'}
						</p>
						<p className='text-xl font-bold'>{totalSum} ₴</p>
					</div>
					<div className='flex flex-col gap-y-4 mx-auto'>
						<BtnSolid
							size='l'
							variant='bronze'
							as='button'
							action={() => setCurrentStep(2)}
						>
							{locale === 'en' ? 'Checkout order' : 'Оформити замовлення'}
						</BtnSolid>
						<BtnSolid
							size='l'
							variant='primary'
							as='button'
							action={() => onClose && onClose()}
						>
							{locale === 'en' ? 'Return to products' : 'Повернутися до товарів'}
						</BtnSolid>
					</div>
				</div>
			) : (
				<CartStepTwo />
			)}
		</div>
	)
})
export default CartComponent
