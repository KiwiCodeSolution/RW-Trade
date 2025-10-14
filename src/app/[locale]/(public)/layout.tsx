import UserFooter from '@/components/userUI/UserFooter'
import UserHeader from '@/components/userUI/UserHeader'

import { Locale } from '@/types/baseTypes'

import '@/styles/globals.css'

import { Metadata } from 'next'

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
		<html lang={locale} suppressHydrationWarning>
			<body>
				<UserHeader locale={locale} />
				{children}
				<UserFooter />
			</body>
		</html>
	)
}
