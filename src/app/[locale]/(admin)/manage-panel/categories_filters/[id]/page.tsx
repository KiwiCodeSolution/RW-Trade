import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderPage from '@/components/adminUI/HeaderPage'
import SubCategoriesAndFilters from '@/components/adminUI/SubCategoriesAndFilters'

import { Category } from '@/types/baseTypes'

import { getCategoriesByID } from '@/api/categories'

import { authOptions } from '@/lib/authOptions'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
	title: 'Категорії та фільтри | RW-Trade'
}

export default async function Categories({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const session = await getServerSession(authOptions)
	const token = { token: session?.user?.accessToken }

	if (!token) return null
	if (!session?.user?.accessToken) return null

	const category: Category = await getCategoriesByID({
		id,
		token: session?.user?.accessToken
	})

	return (
		<div className='w-full h-full relative'>
			<HeaderPage pageName={category?.title['uk']} />
			<p className='text-xl font-medium mt-2'>
				Виберіть або створіть підкатегорію, для якої потрібно налаштовувати фільтри:
			</p>
			<SubCategoriesAndFilters sub={category.subcategories} categoryId={id} />
			<GoBackBtn />
		</div>
	)
}
