import MessagesList from '@/components/adminUI/MessagesList'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Звернення | RW-Trade'
}

const Messages = () => {
	return (
		<div className='w-full'>
			<h1 className='text-center text-2xl font-bold'>Звернення</h1>
			<div className='h-0.5 w-full bg-primary' />
			<MessagesList />
		</div>
	)
}

export default Messages
