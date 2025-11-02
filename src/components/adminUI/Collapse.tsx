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
}

const Collapse = ({
	title,
	defaultOpen = true,
	hasError = false,
	children,
	classNameWrapper
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

	return (
		<div
			className={`border rounded-lg mb-4 overflow-hidden shadow-sm transition-colors
      ${hasError ? 'border-red-500 bg-red-50' : 'border-sc-1 bg-white'}`}
		>
			<button
				type='button'
				onClick={() => setIsOpen(v => !v)}
				className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold transition
        ${hasError ? 'text-red-600' : ''}`}
			>
				<span>{title}</span>
				<ArrowUp />
			</button>

			<div
				ref={contentRef}
				style={{ height, transition: 'height 0.3s ease', overflow: 'hidden' }}
			>
				<div className={`p-4 ${classNameWrapper}`}>{children}</div>
			</div>
		</div>
	)
}

export default Collapse
