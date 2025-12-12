'use client'

import DOMPurify from 'isomorphic-dompurify'

export default function HtmlContent({ html }: { html: string }) {
	const clean = DOMPurify.sanitize(html)
	return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
