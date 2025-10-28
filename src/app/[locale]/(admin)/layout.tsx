import ClientAdminLayout from '@/components/adminUI/ClientAdminLayout'

export default async function RootAdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='uk'>
			<body className='bg-white w-full h-full'>
				<ClientAdminLayout>{children}</ClientAdminLayout>
			</body>
		</html>
	)
}
