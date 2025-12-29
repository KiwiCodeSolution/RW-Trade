'use client'

import { LangField, OrderStats } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import { observer } from 'mobx-react-lite'

interface Props {
	statistic: OrderStats
}

interface SubcategoryStat {
	subcategoryId: string
	subcategoryTitle: LangField
	count: number
}

interface CategoryWithSubStats {
	categoryId: string
	categoryTitle: LangField
	totalCount: number
	subcategories: SubcategoryStat[]
}

const StatsPopularCategories = observer(({ statistic }: Props) => {
	const { categories } = categoryStore

	const categoriesWithStats: CategoryWithSubStats[] = []
	const unknownCategories: { categoryId: string; count: number }[] = []

	Object.entries(statistic.categoryStats).forEach(([catId, catStats]) => {
		const category = categories.find(c => c._id === catId)
		if (!category) {
			unknownCategories.push({ categoryId: catId, count: catStats.count })
			return
		}

		const subcategories: SubcategoryStat[] = catStats.subcategories
			? Object.entries(catStats.subcategories).map(([subId, count]) => {
					const sub = category.subcategories?.find(s => s._id === subId)
					return {
						subcategoryId: subId,
						subcategoryTitle: sub?.title ?? { uk: '–', en: '–' },
						count
					}
				})
			: []

		const totalCount = subcategories.length
			? subcategories.reduce((sum, s) => sum + s.count, 0)
			: catStats.count

		subcategories.sort((a, b) => b.count - a.count)

		categoriesWithStats.push({
			categoryId: catId,
			categoryTitle: category.title,
			totalCount,
			subcategories
		})
	})

	// сортуємо категорії за totalCount
	categoriesWithStats.sort((a, b) => b.totalCount - a.totalCount)

	return (
		<div className='flex flex-col gap-y-2'>
			<h2 className='text-xl font-medium'>Найпопулярніші категорії:</h2>
			<div className='grid grid-cols-2 gap-4'>
				{categoriesWithStats.map((cat, idx) => (
					<div
						key={cat.categoryId}
						className='flex flex-col gap-y-2 rounded-2xl border-[2px] border-gr-2 overflow-hidden'
					>
						<div className='w-full h-[] flex items-center justify-between border-b border-gr-2 rounded-t-2xl px-4 py-2'>
							<h3 className='text-gr-2 font-medium'>
								{idx + 1}. {cat.categoryTitle.uk}
							</h3>
							<p className='font-medium'>Замовлень: {cat.totalCount}</p>
						</div>
						<div className='flex flex-col gap-y-2 px-4 py-2'>
							{cat.subcategories.map((sub, idx) => (
								<div
									className='w-full flex items-center justify-between'
									key={sub.subcategoryId}
								>
									<h4 className='text-gr-2'>
										{idx + 1}. {sub.subcategoryTitle.uk}
									</h4>
									<p className=''>Замовлень: {sub.count}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{unknownCategories.length > 0 && (
				<div className='mt-8'>
					<h2 className='italic'>Невідомі категорії (на час розробки)</h2>
					{unknownCategories.map(unk => (
						<div key={unk.categoryId}>
							ID: {unk.categoryId}, замовлень: {unk.count}
						</div>
					))}
				</div>
			)}
		</div>
	)
})

export default StatsPopularCategories
