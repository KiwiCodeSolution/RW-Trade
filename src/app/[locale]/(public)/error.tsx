'use client'

import Title from '@/components/userUI/baseComponents/Title'

import CarTrash from '@/assets/icons/car-crash.svg'

import { useEffect } from 'react'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='flex items-center justify-center min-h-[60vh]'>
			<CarTrash />
			<div className='min-w-[400px] flex flex-col items-center gap-y-12'>
				<Title tag='h2' styles=''>
					Something went wrong!
				</Title>
				<button onClick={() => reset()}>Try again</button>
			</div>
		</div>
	)
}
