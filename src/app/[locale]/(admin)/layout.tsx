import ClientAdminLayout from '@/components/adminUI/ClientAdminLayout'

import { Locale } from '@/types/baseTypes'

export default async function RootAdminLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ locale: Locale }>
}) {
	return (
		<html lang='uk'>
			<body>
				<ClientAdminLayout>{children}</ClientAdminLayout>
			</body>
		</html>
	)
}
