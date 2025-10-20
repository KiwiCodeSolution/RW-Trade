'use client'

import LeftIcon from '../../../public/icons/chevron-left-32.svg'
import RightIcon from '../../../public/icons/chevron-right-32.svg'

import { useState } from 'react'

type PaginationProps = {
	numberOfItems: number
	itemsPerPage: number
	currentPage?: number
	onPageChange?: (page: number) => void
}

const Pagination = ({
	numberOfItems,
	itemsPerPage,
	currentPage: initialPage = 1,
	onPageChange
}: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage)

	interface HandlePageChange {
		(page: number): void
	}

	const handlePageChange: HandlePageChange = page => {
		setCurrentPage(page)
		if (onPageChange) {
			onPageChange(page)
		}
	}

	const totalPages = Math.ceil(numberOfItems / itemsPerPage)

	const getPageNumbers = () => {
		const pageNumbers = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i)
			}
		} else {
			pageNumbers.push(1)
			if (currentPage > 3) {
				pageNumbers.push('ellipsis-start')
			}
			const start = Math.max(2, currentPage - 1)
			const end = Math.min(totalPages - 1, currentPage + 1)
			for (let i = start; i <= end; i++) {
				if (i !== 1) {
					pageNumbers.push(i)
				}
			}
			if (currentPage < totalPages - 2) {
				pageNumbers.push('ellipsis-end')
			}
			if (totalPages > 1) {
				pageNumbers.push(totalPages)
			}
		}

		const uniquePages = []
		const seen = new Set()

		for (const page of pageNumbers) {
			if (!seen.has(page)) {
				uniquePages.push(page)
				seen.add(page)
			}
		}

		return uniquePages
	}

	if (totalPages <= 1) {
		return null
	}

	return (
		<div className='flex gap-2 justify-center items-center'>
			<button
				onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label='Previous page'
				className={`w-8 h-8 flex justify-center items-center`}
				style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
			>
				<LeftIcon />
			</button>

			{getPageNumbers().map((pageNumber, index) =>
				typeof pageNumber === 'string' && pageNumber.startsWith('ellipsis') ? (
					<span
						key={pageNumber}
						aria-hidden='true'
						className='w-8 h-8 flex justify-center items-end'
					>
						...
					</span>
				) : (
					<button
						key={pageNumber}
						onClick={() => handlePageChange(pageNumber as number)}
						aria-label={`Go to page ${pageNumber}`}
						aria-current={currentPage === pageNumber ? 'page' : undefined}
						className={`w-8 h-8 flex justify-center items-center cursor-pointer border-2 rounded-lg ${currentPage === pageNumber ? 'font-bold text-link-blue border-link-blue' : 'border-transparent'}`}
					>
						{pageNumber}
					</button>
				)
			)}

			<button
				onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label='Next page'
				style={{
					cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
				}}
			>
				<RightIcon />
			</button>
		</div>
	)
}

export default Pagination
