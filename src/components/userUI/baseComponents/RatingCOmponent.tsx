'use client'

import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import { useState } from 'react'

export default function GradientHoverRating({
	productId,
	productRating = 0,
	productName = ''
}: {
	productId: string
	productRating?: number
	productName?: string
}) {
	const [rating, setRating] = useState(productRating)
	const [hover, setHover] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)

	const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const fraction = (e.clientX - rect.left) / rect.width
		const next = Math.min(5, Math.round(fraction * 50 + 0.5) / 10)
		if (next !== hover) setHover(next)
	}

	const handleLeave = () => setHover(null)

	const handleClick = async () => {
		if (!hover || loading) return
		setRating(hover) // оптимістичний апдейт
		setLoading(true)
		try {
			const res = await fetch(`${BASE_URL}/products/${productId}/rate`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ stars: hover })
			})

			if (!res.ok) throw new Error()
			const updated = await res.json()
			const correctRating = updated.rating
				? updated.rating > 5
					? 5.0
					: Number(updated.rating.toFixed(1))
				: 0
			toast.success(`Рейтинг товару ${productName} оновлено: ${correctRating}`)
			setRating(correctRating)
		} catch {
			toast.error('Не вдалося оновити рейтинг')
			setRating(productRating) // відкат
		} finally {
			setLoading(false)
		}
	}

	const displayValue = hover ?? rating
	const percent = Math.min((displayValue / 5) * 100, 100)

	return (
		<div className='flex items-center gap-2 select-none'>
			{/* Контейнер зірок */}
			<div
				role='button'
				tabIndex={0}
				className={`relative w-[80px] xl:w-[125px] h-[15px] xl:h-[26px] ${
					loading ? 'opacity-70 pointer-events-none' : 'cursor-pointer'
				}`}
				onMouseMove={handleMove}
				onMouseLeave={handleLeave}
				onClick={handleClick}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') handleClick()
				}}
			>
				{/* сіра база */}
				<div className='absolute inset-0 text-gray-300 pointer-events-none text-lg xl:text-3xl leading-none'>
					{'★★★★★'}
				</div>

				{/* градієнтна заливка */}
				<div
					className='absolute inset-0 overflow-hidden text-transparent pointer-events-none text-lg xl:text-3xl leading-none will-change-[width]'
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
			<div className='h-full flex items-center justify-center pt-1.5 ml-1'>
				<p className='text-xs xl:text-sm font-medium text-right'>
					{displayValue.toFixed(1)} / 5
				</p>
			</div>
		</div>
	)
}
