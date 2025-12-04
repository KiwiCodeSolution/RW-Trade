// src/app/[locale]/(public)/product/page.tsx
import { redirect } from 'next/navigation'

export default function ProductRootPage({ params }: { params: { locale: string } }) {
	redirect(`/${params.locale}/catalog`)
}
// сторінка у даний момент не потрібна. робимо автоматичний редирект на каталог
