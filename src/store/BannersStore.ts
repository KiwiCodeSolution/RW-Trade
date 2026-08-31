import { Banner, CreateBannerDto } from '@/types/baseTypes'

import { createBanner, deleteBanner, getAllBanners, updateBanner } from '@/api/banners'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class BannersStore {
	banners: Banner[] = []
	isLoading = false

	constructor() {
		makeAutoObservable(this)
		this.fetchBanners({ pageType: 'client' })
	}

	async fetchBanners({ pageType }: { pageType: 'client' | 'admin' }) {
		this.isLoading = true
		try {
			const data = await getAllBanners()
			runInAction(() => (this.banners = data))
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (pageType === 'admin') {
				if (error?.isAuthError) {
					authGuard.expireSession()
				} else {
					toast.error('Не вдалося отримати промо-банер')
				}
			}

			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	toggleVisibility = async (id: string) => {
		this.isLoading = true
		try {
			const banner = this.banners.find(b => b._id === id)
			if (!banner) return null

			const updatedData = { ...banner, isPublished: !banner.isPublished }
			const result = await updateBanner(updatedData)
			if (!result) return null

			runInAction(() => {
				const i = this.banners.findIndex(b => b._id === id)
				if (i !== -1) this.banners[i] = result
			})

			toast.success(result.isPublished ? 'Банер показано' : 'Банер сховано')
			return result
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося створити промо-банер')
			}

			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async create(data: CreateBannerDto & { imageFile?: File | null }) {
		this.isLoading = true
		try {
			const result = await createBanner(data)
			if (!result) return null

			runInAction(() => this.banners.unshift(result))
			toast.success('Банер створено')
			return result
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося створити промо-банер')
			}

			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async update(data: Banner & { imageFile?: File | null }) {
		this.isLoading = true
		try {
			const result = await updateBanner(data)
			if (!result) return null

			runInAction(() => {
				const i = this.banners.findIndex(b => b._id === data._id)
				if (i !== -1) this.banners[i] = result
			})

			toast.success('Банер оновлено')
			return result
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося створити промо-банер')
			}

			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	remove = async (id: string, callback?: () => void) => {
		this.isLoading = true
		try {
			const ok = await deleteBanner(id)
			if (!ok) return false

			callback?.()
			runInAction(() => {
				this.banners = this.banners.filter(b => b._id !== id)
			})

			toast.success('Банер видалено')
			return true
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося створити промо-банер')
			}

			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	setBanners(banners: Banner[]) {
		this.banners = banners
	}
}

export const bannersStore = new BannersStore()
