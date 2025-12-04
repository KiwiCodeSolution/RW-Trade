'use client'

import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

const TestSortableBlock = () => {
	// Створюємо масив об’єктів із id та числом
	const [blocks, setBlocks] = useState(
		Array.from({ length: 10 }, (_, i) => ({ id: i + 1, num: i + 1 }))
	)

	return (
		<div className='p-6 bg-white rounded-xl shadow-md'>
			<h2 className='text-2xl font-semibold mb-4'>Drag & Drop Тестовий блок</h2>

			<ReactSortable list={blocks} setList={setBlocks} className='flex flex-wrap gap-3'>
				{blocks.map(item => (
					<div
						key={item.id}
						className='w-16 h-16 flex items-center justify-center text-lg font-bold bg-gradient-to-tr from-sky-500 to-blue-400 text-white rounded-lg shadow cursor-grab active:cursor-grabbing select-none'
					>
						{item.num}
					</div>
				))}
			</ReactSortable>

			<div className='mt-4 text-gray-700'>
				Поточний порядок: {blocks.map(b => b.num).join(', ')}
			</div>
		</div>
	)
}

export default TestSortableBlock
