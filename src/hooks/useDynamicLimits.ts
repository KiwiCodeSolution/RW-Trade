'use client'

import { useEffect, useState } from 'react'

type Config = {
	breakpoints: { min: number; cols: number }[]
	rows: number[]
}

export function useDynamicLimits(config: Config) {
	const [limits, setLimits] = useState<number[]>([])
	const [limit, setLimit] = useState<number>(0)

	useEffect(() => {
		const calculate = () => {
			const width = window.innerWidth
			const cols = [...config.breakpoints].reverse().find(bp => width >= bp.min)?.cols ?? 1

			const newLimits = config.rows.map(r => r * cols)
			setLimits(newLimits)
			setLimit(prev => (newLimits.includes(prev) ? prev : newLimits[0]))
		}

		calculate()
		window.addEventListener('resize', calculate)
		return () => window.removeEventListener('resize', calculate)
	}, [])

	return { limits, limit, setLimit }
}
