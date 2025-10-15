'use client'

import { Category, Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

interface CategoryControlProps {
	setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>
}

const CategoryControl = observer(({ setCategory }: CategoryControlProps) => {
	const locale = useLocale() as Locale
	const { categories } = categoryStore
	const setOfCategories = categories

	const content: Record<Locale, string> = {
		uk: 'Всі категорії',
		en: 'All Categories'
	}

	const thumbWidth = 100
	const [selected, setSelected] = useState<Category | undefined>(undefined)
	const [isDragging, setIsDragging] = useState(false)
	const [thumbLeft, setThumbLeft] = useState(0)
	const [startX, setStartX] = useState(0)
	const [startLeft, setStartLeft] = useState(0)

	const containerRef = useRef<HTMLDivElement | null>(null)
	const trackRef = useRef<HTMLDivElement | null>(null)
	const thumbRef = useRef<HTMLDivElement | null>(null)

	const handleSelect = (category?: Category) => {
		setSelected(category)
		setCategory(category) // тепер завжди Category або undefined
	}

	const handleScroll = () => {
		if (!containerRef.current || !trackRef.current) return
		const container = containerRef.current
		const track = trackRef.current

		const maxScroll = container.scrollWidth - container.clientWidth
		if (maxScroll <= 0) return

		const scrollRatio = container.scrollLeft / maxScroll
		const maxThumbTravel = track.clientWidth - thumbWidth
		setThumbLeft(scrollRatio * maxThumbTravel)
	}

	const handleThumbMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()
		setStartX(e.clientX)
		setStartLeft(thumbLeft)
		setIsDragging(true)
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging || !containerRef.current || !trackRef.current) return

		const container = containerRef.current
		const track = trackRef.current

		const deltaX = e.clientX - startX
		const maxThumbTravel = track.clientWidth - thumbWidth
		const newThumbLeft = Math.max(0, Math.min(startLeft + deltaX, maxThumbTravel))
		setThumbLeft(newThumbLeft)

		const scrollRatio = newThumbLeft / maxThumbTravel
		const maxScroll = container.scrollWidth - container.clientWidth
		container.scrollLeft = scrollRatio * maxScroll
	}

	const handleMouseUp = () => setIsDragging(false)

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('resize', handleScroll)
		handleScroll()

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('resize', handleScroll)
		}
	}, [isDragging, startX, startLeft])

	return (
		<div className='relative mb-7'>
			<div
				className='overflow-hidden mb-6'
				onScroll={handleScroll}
				ref={containerRef}
				role='region'
				aria-label='Categories navigation'
			>
				<div className='flex gap-2 whitespace-nowrap'>
					<button
						className={`p-0.5 rounded-md w-fit cursor-pointer ${
							selected === undefined ? 'bg-primary' : ''
						}`}
						onClick={() => handleSelect(undefined)}
					>
						<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
							<div
								className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
									selected === undefined ? 'text-transparent' : ''
								}`}
							>
								{content[locale]}
							</div>
						</div>
					</button>

					{setOfCategories.map(item => (
						<button
							key={item._id}
							className={`p-0.5 rounded-md w-fit cursor-pointer ${
								selected?._id === item._id ? 'bg-primary' : ''
							}`}
							onClick={() => handleSelect(item)}
						>
							<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
								<div
									className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
										selected?._id === item._id ? 'text-transparent' : ''
									}`}
								>
									{item.title[locale]}
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			<div
				ref={trackRef}
				className='relative w-full h-1 bg-sc-1 rounded-sm z-10'
				role='scrollbar'
				aria-controls='categoryContainer'
				aria-orientation='horizontal'
			>
				<div
					ref={thumbRef}
					className={`absolute h-[300%] -top-[100%] bg-bronze rounded-full ${
						isDragging ? 'cursor-grabbing' : 'cursor-grab'
					}`}
					style={{ width: `${thumbWidth}px`, left: `${thumbLeft}px` }}
					onMouseDown={handleThumbMouseDown}
					role='presentation'
				/>
			</div>
		</div>
	)
})

export default CategoryControl
