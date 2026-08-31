import { Notification } from '@/types/baseTypes'

import { getAllNotifications, toggleStatusNotification } from '@/api/notification'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class NotificationsStore {
	notifications: Notification[] = []
	unreadTotal = 0
	unreadOrders = 0
	unreadFeedback = 0
	isLoaded = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	/** --- Отримати всі нотифікації --- */
	fetchNotifications = async () => {
		this.isLoaded = false
		this.isLoading = true

		try {
			const data = await getAllNotifications()

			runInAction(() => {
				this.notifications = data
				this._recalculateUnread()
				this.isLoaded = true
			})
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося завантажити нотифікації')
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

	/** --- Тогл статусу прочитання --- */
	toggleStatus = async (id: string) => {
		this.isLoaded = false
		this.isLoading = true

		try {
			const updated = await toggleStatusNotification(id)

			if (updated) {
				runInAction(() => {
					const target = this.notifications.find(n => n._id === id)

					if (target) {
						target.status = updated.status
						this._recalculateUnread()
					}

					this.isLoaded = true
				})
			}
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
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

	/** --- Локальний підрахунок непрочитаних --- */
	private _recalculateUnread() {
		const unread = this.notifications.filter(n => n.status === 'unread')
		this.unreadTotal = unread.length
		this.unreadOrders = unread.filter(n => n.type === 'order').length
		this.unreadFeedback = unread.filter(n => n.type === 'feedback').length
	}
}

export const notificationsStore = new NotificationsStore()
