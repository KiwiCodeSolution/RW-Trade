import AdminHeader from '@/components/adminUI/AdminHeader'

import { Locale } from '@/types/baseTypes'

import '@/styles/globals.css'

type RootAdminLayoutProps = {
	children: React.ReactNode
	params: Promise<{ locale: Locale }>
}

export default async function RootAdminLayout({ children }: RootAdminLayoutProps) {
	return (
		<html lang='uk'>
			<body className='text-txt-dark bg-bg-light'>
				<div className='flex'>
					<div className='w-[320px]'>
						<AdminHeader />
					</div>
					<div className='flex flex-col grow'>
						<main className='w-full grow p-8'>{children}</main>
						<footer>Admin Footer</footer>
					</div>
				</div>
			</body>
		</html>
	)
}
