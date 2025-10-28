'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'

function ensureModalRoot() {
	let el = document.getElementById('modal-root') as HTMLElement | null
	if (!el) {
		el = document.createElement('div')
		el.id = 'modal-root'
		document.body.appendChild(el)
	}
	return el
}

export default function ModalPortal({ children }: { children: React.ReactNode }) {
	const [root] = useState<HTMLElement | null>(() => {
		if (typeof window === 'undefined') return null
		return ensureModalRoot()
	})

	if (!root) return null
	return createPortal(children, root)
}
