'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type QueryDefaults = Record<string, string>

export function useListQuery<T extends QueryDefaults>(defaults: T) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const query = {} as T
	for (const key in defaults) {
		query[key] = (searchParams.get(key) ?? defaults[key]) as T[Extract<keyof T, string>]
	}

	const setQuery = useCallback(
		(patch: Partial<T>) => {
			const params = new URLSearchParams(searchParams.toString())

			Object.entries(patch).forEach(([key, value]) => {
				if (value === undefined || value === null) {
					params.delete(key)
				} else {
					params.set(key, String(value))
				}
			})

			router.replace(`?${params.toString()}`, { scroll: false })
		},
		[router, searchParams]
	)

	return { query, setQuery }
}
