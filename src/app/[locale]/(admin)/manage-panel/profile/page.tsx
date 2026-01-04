import ChangePasswordForm from '@/components/adminUI/ChangePasswordForm'
import Currency from '@/components/adminUI/Currency'
import CurrencyDatePicker from '@/components/adminUI/CurrencyDatePicker'
import HeaderPage from '@/components/adminUI/HeaderPage'
import TodayInfo from '@/components/adminUI/TodayInfo'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Налаштування | RW-Trade'
}
const Profile = () => {
	return (
		<main className='w-full h-full flex flex-col '>
			<HeaderPage pageName='Налаштування' />
			<div className='grid grid-cols-3 gap-x-10 justify-between mt-10'>
				<CurrencyDatePicker />
				<TodayInfo />
				<Currency />
			</div>
			<div className='h-0.5 w-full bg-primary my-5' />
			<p className='text-xl mb-4'>Управління логіном та паролем</p>

			<ChangePasswordForm />
		</main>
	)
}

export default Profile
