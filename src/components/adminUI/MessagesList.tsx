'use client'

import { feedbackStore } from '@/store/FeedbackStore'

import Loader from '../commonUI/loader/Loader'

import MessageComponent from './Message'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const MessagesList = observer(() => {
	const { messages, isLoaded } = feedbackStore

	useEffect(() => {
		feedbackStore.fetchMessages()
	}, [])

	if (!isLoaded) return <Loader />

	if (!messages.length) return <div>Повідомлень немає</div>

	return (
		<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
			{messages.map(m => (
				<MessageComponent key={m._id} message={m} />
			))}
		</div>
	)
})

export default MessagesList
