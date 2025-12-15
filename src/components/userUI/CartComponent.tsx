'use client'

import { Locale } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import BtnSolid from '../commonUI/BtnSolid'

import CartStepTwo from './CartStepTwo'
import ProductCartComponent from './ProductCartComponent'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
	step: number
	onClose?: () => void
}

const CartComponent = observer(({ step = 1, onClose }: Props) => {
	const locale = useLocale() as Locale
	const { items, oneStepBuyItem, totalSum } = cartStore

	const [currentStep, setCurrentStep] = useState(step)
	const [orderSuccess, setOrderSuccess] = useState(false)

	if (items.length === 0 && !oneStepBuyItem && !orderSuccess)
		return (
			<div className='w-full min-h-[200px] flex flex-col gap-y-7 items-center justify-center mt-10'>
				<Image src='/icons/cart-bronze-24.svg' alt='cart' width={100} height={100} />
				<Title tag='h2' styles='text-center'>
					{locale === 'en' ? 'Cart is empty' : 'Кошик порожній'}
				</Title>
				<p className='text-center text-lx'>
					{locale === 'en' ? 'Add a product right now' : 'Додайте товар прямо зараз'}
				</p>
			</div>
		)

	if (orderSuccess)
		return (
			<div className='w-full min-h-[200px] flex items-center justify-center'>
				<Title tag='h2' styles='text-center'>
					{locale === 'en' ? 'Order sent successfully!' : 'Замовлення успішно надіслано!'}
				</Title>
			</div>
		)

	return (
		<div className='flex flex-col gap-y-4 overflow-y-auto my-5'>
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
				<CartStepTwo setOrderSuccess={setOrderSuccess} />
			)}
		</div>
	)
})
export default CartComponent
