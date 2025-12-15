'use client'

export default function AdminRatingComponent({ productRating = 0 }: { productRating?: number }) {
	const displayValue = productRating ?? 0
	const percent = Math.min((displayValue / 5) * 100, 100)

	return (
		<div className='flex items-center gap-2 select-none'>
			{/* Контейнер зірок */}
			<div className={`relative w-[80px] h-[15px]`}>
				{/* сіра база */}
				<div className='absolute inset-0 text-gray-300 pointer-events-none text-lg leading-none'>
					{'★★★★★'}
				</div>

				{/* градієнтна заливка */}
				<div
					className='absolute inset-0 overflow-hidden text-transparent pointer-events-none text-lg leading-none will-change-[width]'
					style={{
						width: `${percent}%`,
						background: 'linear-gradient(90deg, #E1A755 0%, #B76B00 100%)',
						WebkitBackgroundClip: 'text'
					}}
				>
					{'★★★★★'}
				</div>
			</div>

			{/* Значення рейтингу */}
			<div className='h-full flex items-center justify-center pt-1.5'>
				<p className='text-xs font-medium text-right'>{displayValue.toFixed(1)} / 5</p>
			</div>
		</div>
	)
}
