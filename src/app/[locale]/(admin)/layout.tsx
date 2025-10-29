import ClientAdminLayout from '@/components/adminUI/ClientAdminLayout'

import { Locale } from '@/types/baseTypes'

import { NextIntlClientProvider } from 'next-intl'

export default async function RootAdminLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { locale: Locale }
}) {
	return (
		<html lang='uk'>
			<body className='bg-white w-full h-full'>
				<NextIntlClientProvider>
					<ClientAdminLayout>{children}</ClientAdminLayout>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
