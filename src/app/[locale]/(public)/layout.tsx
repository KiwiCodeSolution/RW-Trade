import UserFooter from '@/components/userUI/UserFooter'
import UserHeader from '@/components/userUI/UserHeader'

import { Locale } from '@/types/baseTypes'

import { roboto } from '@/app/fonts'
import '@/styles/globals.css'

import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'

export const metadata: Metadata = {
	title: 'RW-Trade | Auto parts store',
	description: 'Auto parts store'
}

type RootLayoutProps = {
	children: React.ReactNode
	params: Promise<{ locale: Locale }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const { locale } = await params

	return (
		<html lang={locale} suppressHydrationWarning className={roboto.className}>
			<body>
				<NextIntlClientProvider>
					<UserHeader locale={locale} />
					{children}
					<UserFooter />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
