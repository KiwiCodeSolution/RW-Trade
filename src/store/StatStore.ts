import { OrderStats } from '@/types/baseTypes'

import { getAllData } from '@/api/stats'

import { makeAutoObservable, runInAction } from 'mobx'

class StatisticsStore {
	stats: OrderStats | null = null
	loading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	fetchStats = async () => {
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

			runInAction(() => (this.loading = false))
		}
	}
}

export const statisticsStore = new StatisticsStore()
