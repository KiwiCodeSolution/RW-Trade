import ArrowRightIcon from '@/assets/icons/arrow-right-primary-32.svg'

import BtnGost from '../commonUI/BtnGost'

import BaseSection from './baseComponents/BaseSection'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

const AddSectionSecond = () => {
	const t = useTranslations('HomePage.advertising')
	return (
		<BaseSection className='relative h-[332px] bg-primary text-white grid place-items-center grid-cols-2'>
			<Image src='/images/market_img.png' alt='baby' width={550} height={259} />
			<div className='flex flex-col'>
				<h3 className='text-[32px] font-bold text-white mb-1'>
					Радіостанція Baofeng BF-888S (BF-88E)
				</h3>
				<p className='text-xl font-bold text-sc-4 mb-6'>
					Надійний зв’язок — коли кожна секунда має значення!
				</p>
				<ul className='mb-4'>
					<li className='proposal-li'>
						Стабільний зв’язок до 3 км — ідеально підходить для міських умов та
						відкритої місцевості
					</li>
					<li className='proposal-li'>
						Потужна батарея 1500 мА·г — забезпечує до 8-10 годин активної роботи.
					</li>
					<li className='proposal-li'>Надійний корпус — витримує удари та падіння.</li>
				</ul>
				<BtnGost className='w-1/3 mx-auto' as='link' href='/catalog'>
					<span>{t('btn')}</span>
					<ArrowRightIcon />
				</BtnGost>
			</div>
		</BaseSection>
	)
}

export default AddSectionSecond
