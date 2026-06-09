import ChangePasswordForm from '@/components/adminUI/ChangePasswordForm'
import ContactsSettings from '@/components/adminUI/ContactsSettings'
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
			<div className='grid grid-cols-2 gap-x-10 justify-between mt-10'>
				<CurrencyDatePicker />
				<div className='flex flex-col gap-10 2xl:flex-row'>
					<TodayInfo />
					<Currency />
				</div>
			</div>
			<div className='h-0.5 w-full bg-primary my-5' />
			<p className='text-xl mb-4'>Управління логіном та паролем</p>

			<ChangePasswordForm />

			<div className='h-0.5 w-full bg-primary my-5' />
			<p className='text-xl mb-4'>Контакти та соціальні мережі</p>
			<ContactsSettings />
		</main>
	)
}

export default Profile
