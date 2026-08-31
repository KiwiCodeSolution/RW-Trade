import ScrollToTopButton from '@/components/userUI/ScrollToTopButton'
import UserFooter from '@/components/userUI/UserFooter'
import UserHeader from '@/components/userUI/UserHeader'

import { Locale } from '@/types/baseTypes'

import { roboto } from './fonts'
import '@/styles/globals.css'

import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const metadata: Metadata = {
	title: 'RW-Trade | Auto parts store',
	description: 'Auto parts store'
}

type RootLayoutProps = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const { locale } = await params

	const safeLocale: Locale = locale === 'uk' ? 'uk' : 'en'

	// ВАЖЛИВО: ініціалізація локалі для серверних запитів
	setRequestLocale(safeLocale)

	// Ваш поточний спосіб завантаження повідомлень
	const messagesMap = {
		en: () => import('../../../../messages/en.json'),
		uk: () => import('../../../../messages/uk.json')
	}
	const messages = (await messagesMap[safeLocale]()).default

	return (
		<html lang={safeLocale} suppressHydrationWarning className={roboto.className}>
			<body className='bg-bg-light relative'>
				<NextIntlClientProvider locale={safeLocale} messages={messages}>
					<UserHeader locale={safeLocale} />
					<div className='min-h-[50vh] flex flex-col justify-between'>{children}</div>
					<UserFooter locale={safeLocale} />
					<ScrollToTopButton />
					{/* <div id='modal-root' /> */}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
