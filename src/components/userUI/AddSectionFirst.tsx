'use client'

import { BASE_IMG_URL } from '@/utils/config'

import { bannersStore } from '@/store/BannersStore'

import BaseSection from './baseComponents/BaseSection'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SLIDE_INTERVAL = 3000
const ASPECT_RATIO = 568 / 292

const AddSectionFirst = observer(() => {
	const { banners } = bannersStore

	const left = banners.filter(b => b.type === 'left' && b.isPublished)
	const right = banners.filter(b => b.type === 'right' && b.isPublished)

	const [leftIndex, setLeftIndex] = useState(0)
	const [rightIndex, setRightIndex] = useState(0)

	const [stopLeft, setStopLeft] = useState(false)
	const [stopRight, setStopRight] = useState(false)

	// Лівий autoplay
	useEffect(() => {
		if (left.length === 0 || stopLeft) return

		const interval = setInterval(() => {
			setLeftIndex(prev => (prev + 1) % left.length)
		}, SLIDE_INTERVAL)

		return () => clearInterval(interval)
	}, [left.length, stopLeft])

	// Правий autoplay
	useEffect(() => {
		if (right.length === 0 || stopRight) return

		const interval = setInterval(() => {
			setRightIndex(prev => (prev + 1) % right.length)
		}, SLIDE_INTERVAL)

		return () => clearInterval(interval)
	}, [right.length, stopRight])

	return (
		<BaseSection>
			<div className='hidden sm:grid sm:grid-cols-2 sm:gap-12 sm:py-14'>
				{/* LEFT SLIDER */}
				<div
					className='relative w-full overflow-hidden rounded-2xl'
					style={{ aspectRatio: ASPECT_RATIO }}
					onMouseEnter={() => setStopLeft(true)}
					onMouseLeave={() => setStopLeft(false)}
				>
					{left.length > 0 && (
						<Link href={left[leftIndex].link}>
							<Image
								src={`${BASE_IMG_URL}${left[leftIndex].image}`}
								alt='left banner'
								fill
								className='object-cover rounded-2xl transition-opacity duration-500'
							/>
						</Link>
					)}
				</div>

				{/* RIGHT SLIDER */}
				<div
					className='relative w-full overflow-hidden rounded-2xl'
					style={{ aspectRatio: ASPECT_RATIO }}
					onMouseEnter={() => setStopRight(true)}
					onMouseLeave={() => setStopRight(false)}
				>
					{right.length > 0 && (
						<Link href={right[rightIndex].link}>
							<Image
								src={`${BASE_IMG_URL}${right[rightIndex].image}`}
								alt='right banner'
								fill
								className='object-cover rounded-2xl transition-opacity duration-500'
							/>
						</Link>
					)}
				</div>
			</div>
		</BaseSection>
	)
})

export default React.memo(AddSectionFirst)
