import { Cart, Timer } from '@/assets/icons'

import { Locale, Product, ProductStatus } from '@/types/baseTypes'

type Props = {
	locale: Locale
	status: Product['status']
	typePage?: 'client' | 'admin'
}

const OtherStatusesProductBtnComponents = ({ locale, status, typePage }: Props) => {
	const texts = {
		en: {
			expected: 'Expected',
			on_order: 'On order',
			in_stock: 'In stock'
		},
		uk: {
			expected: 'Очікується',
			on_order: 'Під замовлення',
			in_stock: 'В наявності'
		}
	}

	const text = texts[locale]?.[status] ?? ''

	if (status === ProductStatus.IN_STOCK) return null

	const currentBgStyle = status === ProductStatus.EXPECTED ? 'bg-sc-3' : 'bg-sc-2'

	return (
		<>
			<p className={`${typePage === 'admin' ? 'text-sm' : 'text-xl'} font-medium`}>{text}</p>
			<div
				className={`${typePage === 'admin' ? 'w-11 h-11' : 'w-[64px] h-[64px]'} rounded-lg p-2 flex items-center justify-center ${currentBgStyle}`}
			>
				{status === ProductStatus.EXPECTED ? (
					<Timer color='#606975' />
				) : (
					<Cart variant='white' />
				)}
			</div>
		</>
	)
}

export default OtherStatusesProductBtnComponents
