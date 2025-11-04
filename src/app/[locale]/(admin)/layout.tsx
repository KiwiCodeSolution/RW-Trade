import ClientAdminLayout from '@/components/adminUI/ClientAdminLayout'

import { NextIntlClientProvider } from 'next-intl'

export default async function RootAdminLayout({ children }: { children: React.ReactNode }) {
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
