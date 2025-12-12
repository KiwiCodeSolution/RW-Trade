import { Banner, CreateBannerDto } from '@/types/baseTypes'

import { createBanner, deleteBanner, getAllBanners, updateBanner } from '@/api/banners'

import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class BannersStore {
	banners: Banner[] = []
	isLoading = false

	constructor() {
		makeAutoObservable(this)
		this.fetchBanners()
	}

	async fetchBanners() {
		this.isLoading = true
		try {
			const data = await getAllBanners()
			runInAction(() => (this.banners = data))
		} finally {
			this.isLoading = false
		}
	}

	async create(data: CreateBannerDto & { imageFile?: File | null }, token: string) {
		this.isLoading = true
		try {
			const result = await createBanner({ data, token })
			if (!result) return null

			runInAction(() => this.banners.unshift(result))
			toast.success('Банер створено')
			return result
		} finally {
			this.isLoading = false
		}
	}

	async update(id: string, data: Banner & { imageFile?: File | null }, token: string) {
		this.isLoading = true
		try {
			const result = await updateBanner({ id, data, token })
			if (!result) return null

			runInAction(() => {
				const i = this.banners.findIndex(b => b._id === id)
				if (i !== -1) this.banners[i] = result
			})

			toast.success('Банер оновлено')
			return result
		} finally {
			this.isLoading = false
		}
	}

	remove = async (id: string, token: string) => {
		this.isLoading = true
		try {
			const ok = await deleteBanner(id, token)
			if (!ok) return false

			runInAction(() => {
				this.banners = this.banners.filter(b => b._id !== id)
			})

			toast.success('Банер видалено')
			return true
		} finally {
			this.isLoading = false
		}
	}

	toggleVisibility = async (id: string, token: string) => {
		this.isLoading = true
		try {
			const banner = this.banners.find(b => b._id === id)
			if (!banner) return null

			const updatedData = { ...banner, isPublished: !banner.isPublished }

			const result = await updateBanner({ id, data: updatedData, token })

			if (!result) return null

			runInAction(() => {
				const i = this.banners.findIndex(b => b._id === id)
				if (i !== -1) this.banners[i] = result
			})

			toast.success(result.isPublished ? 'Банер показано' : 'Банер сховано')
			return result
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}
}

export const bannersStore = new BannersStore()
