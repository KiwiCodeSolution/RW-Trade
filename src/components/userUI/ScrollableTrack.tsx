'use client'

import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface ScrollableTrackProps {
	children: ReactNode
	thumbWidth?: number
	className?: string
	sectionType?: string
}

export default function ScrollableTrack({
	children,
	thumbWidth = 100,
	className,
	sectionType
}: ScrollableTrackProps) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const trackRef = useRef<HTMLDivElement | null>(null)
	const [thumbLeft, setThumbLeft] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [startLeft, setStartLeft] = useState(0)
	const [hasOverflow, setHasOverflow] = useState(false) // ✅ перейменування для ясності

	const handleScroll = useCallback(() => {
		const container = containerRef.current
		const track = trackRef.current
		if (!container || !track) return

		const maxScroll = container.scrollWidth - container.clientWidth
		const overflow = maxScroll > 0
		setHasOverflow(overflow)

		if (!overflow) return // ❗не приховуємо трек, просто не рухаємо таб

		const scrollRatio = container.scrollLeft / maxScroll
		const maxThumbTravel = track.clientWidth - thumbWidth
		setThumbLeft(scrollRatio * maxThumbTravel)
	}, [thumbWidth])

	useLayoutEffect(() => {
		const id = requestAnimationFrame(handleScroll)
		return () => cancelAnimationFrame(id)
	}, [children, handleScroll])

	const handleThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
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

	const handleMouseUp = () => setIsDragging(false)

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('resize', handleScroll)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('resize', handleScroll)
		}
	}, [handleMouseMove, handleScroll])

	return (
		<div className={`relative ${className ?? ''}`}>
			{/* Контейнер зі скролом */}
			<div
				ref={containerRef}
				className={`overflow-x-auto overflow-y-hidden touch-pan-x scrollbar-none ${sectionType === 'admin' ? 'mb-1' : 'my-2'}
  `}
				onScroll={handleScroll}
			>
				<div className='flex gap-2 whitespace-nowrap justify-between'>{children}</div>
			</div>

			{/* 🟩 трек — завжди видимий */}
			<div ref={trackRef} className='relative w-full h-1 bg-sc-1 rounded-sm z-10'>
				{/* 🟨 таб — тільки якщо є переповнення */}
				{hasOverflow && (
					<div
						className={`absolute h-[300%] -top-[100%] bg-bronze rounded-full ${
							isDragging ? 'cursor-grabbing' : 'cursor-grab'
						}`}
						style={{ width: `${thumbWidth}px`, left: `${thumbLeft}px` }}
						onMouseDown={handleThumbMouseDown}
						role='button'
						tabIndex={0}
					/>
				)}
			</div>
		</div>
	)
}
