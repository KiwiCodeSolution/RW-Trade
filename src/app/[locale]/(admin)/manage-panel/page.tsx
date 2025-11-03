import CurrencyDatePicker from '@/components/adminUI/CurrencyDatePicker'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'RW-Trade | Manage Panel',
	description: 'Manage Panel'
}

const Admin = () => {
	return (
		<main className='w-full h-full flex flex-col items-center justify-center'>
			<h1 className='text-[40px] font-extrabold gradient-text'>Вітаємо у Адмін панелі!</h1>
			<CurrencyDatePicker />
		</main>
	)
}

export default Admin
