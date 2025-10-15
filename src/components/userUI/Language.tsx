'use client'

import { Locale } from '@/types/baseTypes'

import WorldIcon from '../../../public/icons/world-16.svg'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type LanguageSwitcherProps = { locale: Locale }

const LanguageSwitcher = ({ locale }: LanguageSwitcherProps) => {
	const [current, setCurrent] = useState(locale || 'uk')
	const router = useRouter()
	const pathname = usePathname()

	const languages = [
		{ code: 'en', name: 'eng' },
		{ code: 'uk', name: 'ukr' }
	]

	const handleClick = () => {
		const currentIndex = languages.findIndex(lang => lang.code === current)
		const nextLang = languages[(currentIndex + 1) % languages.length].code

		setCurrent(nextLang as Locale)

		// Замінюємо першу частину шляху на нову мову
		const newPath = pathname.replace(/^\/[^/]+/, `/${nextLang}`)
		router.push(newPath)
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
