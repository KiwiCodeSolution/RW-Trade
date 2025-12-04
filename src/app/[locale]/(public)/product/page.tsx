// src/app/[locale]/(public)/product/page.tsx
import { Locale } from '@/types/baseTypes'

import { redirect } from 'next/navigation'

export default async function ProductRootPage({
	params
}: {
	params: Promise<{ slug: string; locale: Locale }>
}) {
	const { locale } = await params

	redirect(`/${locale}/catalog`)
}
// сторінка у даний момент не потрібна. робимо автоматичний редирект на каталог
