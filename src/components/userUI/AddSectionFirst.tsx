'use client'

import { BASE_IMG_URL } from '@/utils/config'

import { bannersStore } from '@/store/BannersStore'

import Spinner from '../commonUI/loader/Spinner'

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
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	// Autoplay
	useEffect(() => {
		if (!isClient || left.length === 0 || stopLeft) return
		const interval = setInterval(
			() => setLeftIndex(prev => (prev + 1) % left.length),
			SLIDE_INTERVAL
		)
		return () => clearInterval(interval)
	}, [left.length, stopLeft, isClient])

	useEffect(() => {
		if (!isClient || right.length === 0 || stopRight) return
		const interval = setInterval(
			() => setRightIndex(prev => (prev + 1) % right.length),
			SLIDE_INTERVAL
		)
		return () => clearInterval(interval)
	}, [right.length, stopRight, isClient])

	if (!isClient) {
		// Поки компонент не змонтувався — показуємо спінер із фіксованою висотою
		return (
			<div style={{ minHeight: `${292}px`, paddingTop: '80px' }}>
				<Spinner />
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 sm:gap-12 gap-y-4 py-8 sm:py-14'>
			<div
				className='relative w-full overflow-hidden rounded-2xl'
				style={{ aspectRatio: ASPECT_RATIO }}
				onMouseEnter={() => setStopLeft(true)}
				onMouseLeave={() => setStopLeft(false)}
			>
				{left.length > 0 ? (
					<Link href={left[leftIndex].link}>
						<Image
							src={`${BASE_IMG_URL}${left[leftIndex].image}`}
							alt='left banner'
							fill
							className='object-cover rounded-2xl transition-opacity duration-500'
						/>
					</Link>
				) : (
					<Spinner />
				)}
			</div>

			<div
				className='relative w-full overflow-hidden rounded-2xl'
				style={{ aspectRatio: ASPECT_RATIO }}
				onMouseEnter={() => setStopRight(true)}
				onMouseLeave={() => setStopRight(false)}
			>
				{right.length > 0 ? (
					<Link href={right[rightIndex].link}>
						<Image
							src={`${BASE_IMG_URL}${right[rightIndex].image}`}
							alt='right banner'
							fill
							className='object-cover rounded-2xl transition-opacity duration-500'
						/>
					</Link>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	)
})

export default React.memo(AddSectionFirst)
