// lib/authGuard.ts
import { makeAutoObservable } from 'mobx'

class AuthGuard {
	isExpired = false

	constructor() {
		makeAutoObservable(this)
	}

	expireSession() {
		this.isExpired = true
	}

	reset() {
		this.isExpired = false
	}
}

export const authGuard = new AuthGuard()
