'use client'

import { feedbackStore } from '@/store/FeedbackStore'

import MessageComponent from './Message'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const MessagesList = observer(() => {
	const { data: session } = useSession()
	const { messages } = feedbackStore

	useEffect(() => {
		if (session?.user?.accessToken) {
			feedbackStore.fetchMessages(session.user.accessToken)
		}
	}, [session?.user?.accessToken])

	return (
		<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
			{messages.map(m => (
				<MessageComponent key={m._id} message={m} token={session?.user?.accessToken} />
			))}
		</div>
	)
})

export default MessagesList
