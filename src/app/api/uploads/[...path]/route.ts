import { BASE_IMG_URL } from '@/utils/config'

import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
	const { path } = await params
	const filePath = path.join('/')

	const res = await fetch(`${BASE_IMG_URL}/uploads/${filePath}`)

	if (!res.ok) {
		return new NextResponse('Image not found', { status: 404 })
	}

	const buffer = await res.arrayBuffer()

	return new NextResponse(buffer, {
		headers: {
			'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
			'Cache-Control': 'public, max-age=86400'
		}
	})
}
