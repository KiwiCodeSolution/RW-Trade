// types/apiError.ts
import { AxiosError } from 'axios'

export type ApiError = AxiosError & {
	isAuthError?: true
}
