import HeaderPage from '@/components/adminUI/HeaderPage'
import MessagesList from '@/components/adminUI/MessagesList'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Звернення | RW-Trade'
}

const Messages = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Звернення' />
			<MessagesList />
		</div>
	)
}

export default Messages
