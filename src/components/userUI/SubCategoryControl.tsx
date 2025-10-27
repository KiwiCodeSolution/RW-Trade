'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SubCategoryControl = ({
	category,
	setSubCategory
}: {
	category: string
	setSubCategory: React.Dispatch<React.SetStateAction<string>>
}) => {
	const lang = 'uk'

	const thumbWidth = 100

	const [selected, setSelected] = useState('')
	const [isDragging, setIsDragging] = useState(false)
	const containerRef = useRef(null)
	const thumbRef = useRef(null)
	const trackRef = useRef(null)
	const [thumbLeft, setThumbLeft] = useState(0)
	const [startX, setStartX] = useState(0)
	const [startLeft, setStartLeft] = useState(0)
	const [showScroll, setShowScroll] = useState(false)

	const handleChange = e => {
		setSelected(e.target.value)
		setSubCategory(e.target.value)
	}

	const handleScroll = () => {
		if (!containerRef.current || !trackRef.current) return

		const container = containerRef.current
		const track = trackRef.current

		const maxScroll = container.scrollWidth - container.clientWidth
		if (maxScroll <= 0) return

		const scrollRatio = container.scrollLeft / maxScroll
		const maxThumbTravel = track.clientWidth - thumbWidth

		const newThumbLeft = scrollRatio * maxThumbTravel
		setThumbLeft(newThumbLeft)
	}

	const handleThumbMouseDown = e => {
		e.preventDefault()
		setStartX(e.clientX)
		setStartLeft(thumbLeft)
		setIsDragging(true)
	}

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
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
		},
		[isDragging, startX, startLeft, thumbWidth]
	)

	const handleMouseUp = () => {
		setIsDragging(false)
	}

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
	}, [handleMouseMove, handleMouseUp])

	useEffect(() => {
		console.log('subcategory control 2 rendered')

		setTimeout(() => {
			setSelected('any')
		}, 0) // асинхронно, не блокує рендер

		const container = containerRef.current
		if (!container) return

		const maxScroll = container.scrollWidth - container.clientWidth
		setShowScroll(maxScroll > 0)
	}, [category, setSelected])

	return (
		<div className='relative'>
			<div
				className='overflow-hidden mb-6'
				onScroll={handleScroll}
				ref={containerRef}
				role='region'
				aria-label='Categories navigation'
			>
				<div className='flex gap-2 whitespace-nowrap'>
					{category[lang].map((item, index) => (
						<label
							key={index}
							htmlFor={`control_${item}`}
							aria-label={`${item.category} ${item}`}
							className={`p-0.5 rounded-md w-fit cursor-pointer ${
								selected === item && 'bg-primary'
							}`}
						>
							<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
								<div
									className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
										selected === item && 'text-transparent'
									}`}
								>
									{category.category} {item}
								</div>
							</div>
							<input
								type='radio'
								name='categoryControl'
								id={`control_${item}`}
								value={item}
								className='hidden'
								onChange={handleChange}
								checked={selected === item}
							/>
						</label>
					))}
				</div>
			</div>

			<div
				ref={trackRef}
				className='relative w-full h-1 bg-sc-1 rounded-sm z-10'
				// role='scrollbar'
				// aria-controls='categoryContainer'
				// aria-orientation='horizontal'
				// aria-valuemin={0}
				// aria-valuemax={100}
			>
				{showScroll && (
					<div
						ref={thumbRef}
						className={`absolute h-[300%] -top-[100%] bg-bronze rounded-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
						style={{
							width: `${thumbWidth}px`,
							left: `${thumbLeft}px`
						}}
						onMouseDown={handleThumbMouseDown}
						role='presentation'
					/>
				)}
			</div>
		</div>
	)
}

export default SubCategoryControl
