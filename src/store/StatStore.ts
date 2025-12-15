import { OrderStats } from '@/types/baseTypes'

import { getAllData } from '@/api/stats'

import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class StatisticsStore {
	stats: OrderStats | null = null
	loading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	fetchStats = async (router?: { push: (path: string) => void }) => {
		this.loading = true
		this.error = null

		try {
			const data = await getAllData()
			runInAction(() => {
				this.stats = data
				this.loading = false
			})
		} catch (err: unknown) {
			console.error(err)
			if (err instanceof Error && err.message.includes('401') && router) {
				toast.error('Ви не авторизовані. Будь ласка, увійдіть.')
				router.push('/login')
			}
			runInAction(() => (this.loading = false))
		}
	}
}

export const statisticsStore = new StatisticsStore()
