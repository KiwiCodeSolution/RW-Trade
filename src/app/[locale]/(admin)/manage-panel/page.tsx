import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'RW-Trade | Manage Panel',
	description: 'Manage Panel'
}

const Admin = () => {
	redirect(`/uk/manage-panel/notifications`)
	// return (
	// 	<main className='w-full h-full flex flex-col items-center justify-center'>
	// 		<h1 className='text-[40px] font-extrabold gradient-text'>Вітаємо у Адмін панелі!</h1>
	// 		<CurrencyDatePicker />
	// 	</main>
	// )
}

export default Admin
