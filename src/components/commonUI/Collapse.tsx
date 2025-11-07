'use client'

import { ArrowUp } from '@/assets/icons'

// import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CollapseProps {
	title: string
	defaultOpen?: boolean
	hasError?: boolean
	children: React.ReactNode
	classNameWrapper?: string
	sectionType: 'video' | 'form' | 'base' | 'error'
}

const Collapse = ({
	title,
	defaultOpen = false,
	hasError = false,
	children,
	classNameWrapper,
	sectionType = 'form'
}: CollapseProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen)
	const [height, setHeight] = useState<string | number>(defaultOpen ? 'auto' : 0)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (hasError) setIsOpen(true)
	}, [hasError])

	useEffect(() => {
		const el = contentRef.current
		if (!el) return

		if (isOpen) {
			const h = el.scrollHeight
			setHeight(h)
			const t = setTimeout(() => setHeight('auto'), 300)
			return () => clearTimeout(t)
		} else {
			const h = el.scrollHeight
			setHeight(h)
			requestAnimationFrame(() => setHeight(0))
		}
	}, [isOpen])

	const baseStyles = {
		form: 'mb-4 border border-sc-1 bg-white rounded-lg shadow-sm',
		error: '',
		video: 'video rounded-2xl',
		base: 'description rounded-2xl'
	}

	return (
		<div
			className={`overflow-hidden transition-colors py-3 px-4 ${hasError ? 'border-red-500 bg-red-50' : baseStyles[sectionType]}`}
		>
			<button
				type='button'
				onClick={() => setIsOpen(v => !v)}
				className={`w-full flex items-center ${sectionType === 'form' ? 'justify-between' : 'gap-x-3'} text-left font-semibold transition
        ${hasError ? 'text-red-600' : ''}`}
			>
				<span
					className={`${sectionType !== 'form' ? 'text-xl font-bold order-2' : 'order-1'}`}
				>
					{title}
				</span>
				<div
					className={`w-6 h-6 rounded-full flex items-center justify-center bg-white rating-shadow transition-transform duration-300 ${sectionType !== 'form' ? 'text-xl font-bold order-1' : 'order-2'} ${isOpen ? 'rotate-180' : 'rotate-0'}`}
				>
					<ArrowUp />
				</div>
			</button>

			<div
				ref={contentRef}
				style={{ height, transition: 'height 0.3s ease', overflow: 'hidden' }}
			>
				<div className={`${classNameWrapper} mt-2`}>{children}</div>
			</div>
		</div>
	)
}

export default Collapse
