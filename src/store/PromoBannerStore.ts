import { CreatePromoBannerDto, PromoBanner } from '@/types/baseTypes'

import {
	createPromoBanner,
	deletePromoBanner,
	getPromoBanner,
	updatePromoBanner
} from '@/api/promoBanner'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class PromoBannerStore {
	banner: PromoBanner | null = null
	isLoading = false

	constructor() {
		makeAutoObservable(this)
		// this.fetchPromoBanner({ pageType: 'client' })
	}

	setBanner(banner: PromoBanner | null) {
		this.banner = banner
	}

	fetchPromoBanner = async ({
		pageType
	}: {
		pageType: 'client' | 'admin'
	}): Promise<PromoBanner | null> => {
		this.isLoading = true
		try {
			const res = await getPromoBanner()
			runInAction(() => {
				this.banner = res
			})
			return res
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

	create = async (data: CreatePromoBannerDto & { imageFile: File }) => {
		if (!data.imageFile) {
			toast.error('Зображення обов’язкове')
			return null
		}

		this.isLoading = true
		try {
			const result = await createPromoBanner(data)

			runInAction(() => (this.banner = result))
			toast.success('Промо-банер створено')
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

	update = async (data: PromoBanner & { imageFile?: File | null }) => {
		this.isLoading = true
		try {
			const result = await updatePromoBanner(data)
			if (!result) return null

			runInAction(() => (this.banner = result))
			toast.success('Промо-банер оновлено')
			return result
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося оновити промо-банер')
			}

			return null
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
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося видалити промо-банер')
			}

			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}
}

export const promoBannerStore = new PromoBannerStore()
