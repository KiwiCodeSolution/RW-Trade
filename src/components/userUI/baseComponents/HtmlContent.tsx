'use client'

import DOMPurify from 'isomorphic-dompurify'

export default function HtmlContent({ html, className }: { html: string; className?: string }) {
	const clean = DOMPurify.sanitize(html)
	return <div dangerouslySetInnerHTML={{ __html: clean }} className={className} />
}
