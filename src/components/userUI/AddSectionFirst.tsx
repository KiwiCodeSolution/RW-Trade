'use client'

import React, { useEffect, useState } from 'react'

const slideStyle =
	'w-full h-[176px] sm:h-[290px] rounded-2xl bg-sc-2 flex justify-center items-center'

const slides = [
	<div key='slide-1' className={slideStyle}>
		Slide 1
	</div>,
	<div key='slide-2' className={slideStyle}>
		Slide 2
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
		<section>
			<div className='hidden sm:grid sm:grid-cols-2 sm:gap-12 sm:py-14'>
				{slides.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			</div>
			<div className='sm:hidden relative w-full flex justify-center items-center'>
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
			</div>
		</section>
	)
}

export default React.memo(AddSectionFirst)
