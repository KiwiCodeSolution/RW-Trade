import { CreatePromoBannerDto, PromoBanner } from '@/types/baseTypes'

import {
	createPromoBanner,
	deletePromoBanner,
	getPromoBanner,
	updatePromoBanner
} from '@/api/promoBanner'

import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class PromoBannerStore {
	banner: PromoBanner | null = null
	isLoading = false

	constructor() {
		makeAutoObservable(this)
		this.fetchPromoBanner()
	}

	async fetchPromoBanner(): Promise<PromoBanner | null> {
		try {
			const res = await getPromoBanner()
			runInAction(() => {
				this.banner = res
			})

			return res
		} catch (e) {
			runInAction(() => {
				this.banner = null
			})
			return null
		}
	}
	async create(data: CreatePromoBannerDto & { imageFile: File }) {
		if (!data.imageFile) {
			toast.error('Зображення обов’язкове')
			return null
		}

		this.isLoading = true
		try {
			const result = await createPromoBanner(data)
			if (!result) return null

			runInAction(() => (this.banner = result))
			toast.success('Промо-банер створено')
			return result
		} finally {
			this.isLoading = false
		}
	}

	async update(data: PromoBanner & { imageFile?: File | null }) {
		this.isLoading = true
		try {
			const result = await updatePromoBanner(data)
			if (!result) return null

			runInAction(() => (this.banner = result))
			toast.success('Промо-банер оновлено')
			return result
		} finally {
			this.isLoading = false
		}
	}

	async remove() {
		this.isLoading = true
		try {
			const ok = await deletePromoBanner()
			if (!ok) return false

			runInAction(() => (this.banner = null))
			toast.success('Промо-банер видалено')
			return true
		} finally {
			this.isLoading = false
		}
	}
}

export const promoBannerStore = new PromoBannerStore()
