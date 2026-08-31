'use client'

import { GradientBtn } from '@/assets/icons'

import { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300) // показуємо після 300px прокрутки
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (!visible) return null

	return (
		<button
			onClick={scrollToTop}
			className='fixed bottom-6 right-6 w-[50] h-[50] p-2 rounded-full shadow-lg bg-bg-light transition z-[50] flex items-center justify-center cursor-pointer hover:shadow-2xl'
			aria-label='Scroll to top'
		>
			<GradientBtn className='-rotate-90' width={180} height={120} />
		</button>
	)
}

export default ScrollToTopButton
