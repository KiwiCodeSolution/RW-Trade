import { FeedbackStatus, Message } from '@/types/baseTypes'

import { deleteMessage, getAllMessages, toggleStatusFeedback } from '@/api/feedback'

import { notificationsStore } from './NotificationsStore'
import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

export class FeedbackStore {
	messages: Message[] = []
	newMessagesCount = 0
	contactedCount = 0
	importantCount = 0
	isLoaded = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	// --- Отримати всі повідомлення ---
	fetchMessages = async () => {
		this.isLoaded = false
		this.isLoading = true

		try {
			const res = await getAllMessages()
			runInAction(() => {
				this.messages = res
				this.recalculateCounts()
				this.isLoaded = true
			})
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean; message?: string }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Помилка при завантаженні звернень')
			}

			runInAction(() => {
				this.isLoaded = true
			})
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	private recalculateCounts() {
		this.newMessagesCount = this.messages.filter(m => m.status === 'new').length
		this.contactedCount = this.messages.filter(m => m.status === 'contacted').length
		this.importantCount = this.messages.filter(m => m.status === 'important').length
	}

	// --- Змінити статус повідомлення ---
	updateStatus = async (id: string, status: FeedbackStatus) => {
		this.isLoading = true

		try {
			await toggleStatusFeedback(id, status)

			runInAction(() => {
				const msg = this.messages.find(m => m._id === id)
				if (msg) msg.status = status
				this.recalculateCounts()
			})

			await notificationsStore.fetchNotifications()
			toast.success('Статус успішно оновлено')
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Помилка при зміні статусу')
			}
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	// --- Видалити повідомлення ---
	removeMessage = async (id: string) => {
		this.isLoading = true

		try {
			await deleteMessage(id)

			runInAction(() => {
				this.messages = this.messages.filter(m => m._id !== id)
				this.recalculateCounts()
			})

			toast.success('Повідомлення видалено')
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося видалити звернення')
			}
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}
}

export const feedbackStore = new FeedbackStore()
