'use client'

import BaseSection from './baseComponents/BaseSection'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const slideStyle = 'w-full h-auto sm:h-[290px] rounded-2xl flex justify-center items-center'

const slides = [
	<div key='slide-1' className={slideStyle}>
		<Image src='/images/caroucel_1.png' alt='baby' width={568} height={292} />
	</div>,
	<div key='slide-2' className={slideStyle}>
		<Image src='/images/caroucel_2.png' alt='baby' width={568} height={292} />
	</div>,
	<div key='slide-3' className={slideStyle}>
		<Image src='/images/caroucel_1.png' alt='baby' width={568} height={292} />
	</div>
]

const AddSectionFirst = () => {
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		console.log('add section first rendered')
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % slides.length)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	return (
		<BaseSection>
			<div className='hidden sm:grid sm:grid-cols-3 sm:gap-12 sm:py-14'>
				{slides.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			</div>
			{/* <div className='sm:hidden relative w-full flex justify-center items-center'>
				{slides[currentSlide]}
				<div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2'>
					{slides.map((_, index) => (
						<div
							key={index}
							className={`h-2 rounded-full duration-200 ${
								index === currentSlide ? 'bg-bronze w-5' : 'bg-primary w-2'
							}`}
						></div>
					))}
				</div>
			</div> */}
		</BaseSection>
	)
}

export default React.memo(AddSectionFirst)
