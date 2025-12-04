import ScrollToTopButton from '@/components/userUI/ScrollToTopButton'
import UserFooter from '@/components/userUI/UserFooter'
import UserHeader from '@/components/userUI/UserHeader'

import { Locale } from '@/types/baseTypes'

import { roboto } from './fonts'
import '@/styles/globals.css'

import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
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
	params: { locale: Locale }
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const { locale } = await params

	return (
		<html lang={locale} suppressHydrationWarning className={roboto.className}>
			<body className='bg-bg-light'>
				<NextIntlClientProvider>
					<UserHeader locale={locale} />
					<div className='min-h-[50vh] flex flex-col justify-between'>{children}</div>
					<UserFooter />
					<ScrollToTopButton />
					{/* <div id='modal-root' /> */}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
