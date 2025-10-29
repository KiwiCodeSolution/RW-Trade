'use client'

import AdminHeader from '@/components/adminUI/AdminHeader'

import '@/styles/globals.css'

import { SessionProvider } from 'next-auth/react'

export default function ClientAdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<div className='flex'>
				<div className='w-[320px] shrink-0'>
					<AdminHeader />
				</div>
				<div className='flex flex-col grow overflow-hidden'>
					<main className='w-full grow p-8'>{children}</main>
				</div>
			</div>
		</SessionProvider>
	)
}
