import BtnIcon from '@/assets/icons/btn-icon-02-prim.svg'

import BtnGost from '../commonUI/BtnGost'
import CategoryIcon from '../commonUI/CategoryIcon'

import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'
import { Link } from '@/i18n/navigation'

import { useTranslations } from 'next-intl'

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const PopularCategories = () => {
	const t = useTranslations('HomePage.popular_categories')
	const content: { category: string; name: string; text: string }[] = [
		{
			category: 'lighting',
			name: t('categories.0.name'),
			text: t('categories.0.text')
		},
		{
			category: 'tools',
			name: t('categories.1.name'),
			text: t('categories.1.text')
		},
		{
			category: 'control',
			name: t('categories.2.name'),
			text: t('categories.2.text')
		},
		{
			category: 'electric',
			name: t('categories.3.name'),
			text: t('categories.3.text')
		}
	]

	return (
		<BaseSection className='py-9'>
			<Title tag='h2' styles='mb-7 text-center'>
				{t('title')}
			</Title>

			<div className='grid grid-cols-4 gap-10 mb-10 pt-10'>
				{content.map((item, index) => (
					<Link key={index} href={`/catalog/${item.category}`}>
						<div className='flex flex-col items-center max-w-[260px] mx-auto'>
							<div className='mb-5'>
								<CategoryIcon category={capitalize(item.category)} size='m' />
							</div>
							<h3 className='text-xl font-semibold mb-2 text-center max-w-[200px]'>
								{item.name}
							</h3>
							<p className='text-center text-txt-dark opacity-50'>{item.text}</p>
						</div>
					</Link>
				))}
			</div>
			<div className='flex justify-center'>
				<BtnGost variant='outlined' as='link' href='/catalog'>
					<BtnIcon />
					<span>{t('btn')}</span>
				</BtnGost>
			</div>
		</BaseSection>
	)
}

export default PopularCategories
