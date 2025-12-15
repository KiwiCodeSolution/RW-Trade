import { Locale, NewsLimit, ProductLimit } from '@/types/baseTypes'

type Limit = ProductLimit | NewsLimit
const QuantityProduct = ({
	locale,
	onChangeQuantityValue,
	value,
	limits = [16, 24, 32]
}: {
	locale: Locale
	onChangeQuantityValue: React.Dispatch<React.SetStateAction<number>>
	value: Limit
	limits?: number[]
}) => {
	return (
		<div className='hidden xl:flex items-center gap-x-2'>
			<p className='font-medium text-link-blue underline decoration-1'>
				{locale === 'uk' ? 'Кількість на сторінці' : 'Items per page:'}
			</p>

			{limits.map(quantity => (
				<button
					key={quantity}
					className={`w-8 h-8 flex items-center justify-center font-medium text-link-blue cursor-pointer text-sm border rounded-lg transform duration-150 ${
						value === quantity ? 'border-link-blue' : 'border-transparent'
					}`}
					onClick={() => onChangeQuantityValue(quantity as Limit)}
				>
					{quantity}
				</button>
			))}
		</div>
	)
}

export default QuantityProduct
