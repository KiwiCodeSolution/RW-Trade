'use client'

import { ProductPrint } from '@/types/baseTypes'

import Collapse from '../commonUI/Collapse'

import VideoBlock from './VideoBlock'
import BaseSection from './baseComponents/BaseSection'
import HtmlContent from './baseComponents/HtmlContent'

const OtherInformation = ({ product, locale }: ProductPrint) => {
	return (
		<BaseSection className='flex gap-x-14 items-start justify-between pt-9'>
			<div className='w-full xl:w-[1280px] mx-auto'>
				<div className='flex flex-col w-9/12 gap-5'>
					{/* опис */}
					<div className='flex flex-col gap-x-4 px-2 py-4 rounded-2xl bg-other-5 description'>
						<p className='text-xl font-medium'>
							{locale === 'en' ? 'Description' : 'Опис товару'}
						</p>

						<HtmlContent html={product.description[locale] ?? product.description.uk} />
					</div>

					{/* відео блок */}
					{product.videoUrl && (
						<Collapse
							title={locale === 'uk' ? 'Відеоогляд' : 'Videos'}
							sectionType='video'
						>
							<VideoBlock videoUrl={product.videoUrl} />
						</Collapse>
					)}
					{product.characteristics && product.characteristics[locale] !== '' && (
						<Collapse
							title={locale === 'uk' ? 'Характеристики' : 'Characteristics'}
							sectionType='base'
						>
							<HtmlContent
								html={product.characteristics[locale] ?? product.characteristics.uk}
							/>
						</Collapse>
					)}

					{product.compatibility && product.compatibility[locale] !== '' && (
						<Collapse
							title={locale === 'uk' ? 'Сумісність' : 'Compatibility'}
							sectionType='base'
						>
							<HtmlContent
								html={product.compatibility[locale] ?? product.compatibility.uk}
							/>
						</Collapse>
					)}

					{product.kit && product.kit[locale] !== '' && (
						<Collapse
							title={locale === 'uk' ? 'Комплектація' : 'Equipment'}
							sectionType='base'
						>
							<HtmlContent html={product.kit[locale] ?? product.kit.uk} />
						</Collapse>
					)}

					{product.deliveryTerms && product.deliveryTerms[locale] !== '' && (
						<Collapse
							title={locale === 'uk' ? 'Умови доставки' : 'Delivery terms'}
							sectionType='base'
						>
							<HtmlContent
								html={product.deliveryTerms[locale] ?? product.deliveryTerms.uk}
							/>
						</Collapse>
					)}
				</div>
				<div className='flex flex-col w-3/12'></div>
			</div>
		</BaseSection>
	)
}
export default OtherInformation
