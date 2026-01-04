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

	fetchPromoBanner = async (): Promise<PromoBanner | null> => {
		this.isLoading = true
		try {
			const res = await getPromoBanner()
			runInAction(() => {
				this.banner = res
			})
			return res
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	create = async (data: CreatePromoBannerDto & { imageFile: File }) => {
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
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	update = async (data: PromoBanner & { imageFile?: File | null }) => {
		this.isLoading = true
		try {
			const result = await updatePromoBanner(data)
			if (!result) return null

			runInAction(() => (this.banner = result))
			toast.success('Промо-банер оновлено')
			return result
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	remove = async () => {
		this.isLoading = true
		try {
			const ok = await deletePromoBanner()
			if (!ok) return false

			runInAction(() => (this.banner = null))
			toast.success('Промо-банер видалено')
			return true
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}
}

export const promoBannerStore = new PromoBannerStore()
