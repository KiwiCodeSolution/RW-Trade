'use client'

import { Locale } from '@/types/baseTypes'

import WorldIcon from '../../../public/icons/world-16.svg'

import { useState } from 'react'

type LanguageSwitcherProps = { locale: Locale }

const LanguageSwitcher = ({ locale }: LanguageSwitcherProps) => {
	const [current, setCurrent] = useState(locale || 'uk')

	const languages = [
		{ code: 'en', name: 'eng' },
		{ code: 'uk', name: 'ukr' }
	]

	const handleClick = () => {
		// Get current language index
		const currentIndex = languages.findIndex(lang => lang.code === current)
		// Get next language (cycle through)
		const nextIndex = (currentIndex + 1) % languages.length
		const nextLang = languages[nextIndex].code

		setCurrent(nextLang as Locale)

		// Update URL
		const path = window.location.pathname
		const newPath = path.replace(/^\/[^/]+/, `/${nextLang}`)
		window.location.href = newPath
	}

	const currentLanguage = languages.find(lang => lang.code === current)

	return (
		<div
			className='flex gap-2 items-center cursor-pointer hover:text-gr-5 duration-200'
			onClick={handleClick}
		>
			<WorldIcon />
			<div className='min-w-8'>{currentLanguage?.name || current}</div>
		</div>
	)
}

export default LanguageSwitcher
