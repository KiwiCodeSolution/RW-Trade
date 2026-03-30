'use client'

import { Locale, Product } from '@/types/baseTypes'

import Collapse from '../commonUI/Collapse'

import DeliveryPayment, { DeliveryTextByComponent } from './DeliveryPayment'
import PartnersProductsList from './PartnersProductsList'
import PopularProductsList from './PopularProductsList'
import VideoBlock from './VideoBlock'
import BaseSection from './baseComponents/BaseSection'
import HtmlContent from './baseComponents/HtmlContent'

const OtherInformation = ({
	product,
	locale,
	partnersProducts,
	popularProducts,
	baseDeliveryTexts,
	deliveryTextByComponent
}: {
	product: Product
	locale: Locale
	partnersProducts?: Product[]
	popularProducts?: Product[]
	baseDeliveryTexts: { title: string; description: string }[]
	deliveryTextByComponent: DeliveryTextByComponent
}) => {
	console.log(product.deliveryTerms)
	console.log(product)
	console.log(locale)
	return (
		<BaseSection className='flex flex-col gap-y-8 pt-9 xl:max-w-[1280px]!'>
			<div className='flex flex-col lg:flex-row gap-x-14 items-start justify-between'>
				<div className='w-full mx-auto'>
					<div className='flex flex-col w-full gap-4 lg:gap-5'>
						{/* опис */}
						<div className='flex flex-col gap-x-4 px-2 py-4 rounded-2xl bg-other-5 description'>
							<p className='text-xl font-medium'>
								{locale === 'en' ? 'Description' : 'Опис товару'}
							</p>

							<HtmlContent
								html={product.description[locale] ?? product.description.uk}
							/>
						</div>

						{/* відео блок */}
						{product.videoUrl && (
							<Collapse
								title={locale === 'uk' ? 'Відеоогляд' : 'Videos'}
								sectionType='video'
								defaultOpen
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
									html={
										product.characteristics[locale] ??
										product.characteristics.uk
									}
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

						<Collapse
							title={locale === 'uk' ? 'Умови доставки' : 'Delivery terms'}
							sectionType='base'
						>
							{product.deliveryTerms &&
							Array.isArray(product.deliveryTerms) &&
							product.deliveryTerms[locale] !== '' ? (
								<HtmlContent
									html={product.deliveryTerms[locale] ?? product.deliveryTerms.uk}
								/>
							) : (
								<>
									<ul className='list-disc lg:ml-5 mb-10 space-y-7'>
										{baseDeliveryTexts.map((d, idx) => (
											<li key={idx}>
												<span className='font-semibold'>{d.title}</span>
												<p>{d.description}</p>
											</li>
										))}
									</ul>
								</>
							)}
						</Collapse>
					</div>
					<div className='flex flex-col w-3/12'></div>
					<div className='lg:hidden my-4'>
						<DeliveryPayment deliveryTextByComponent={deliveryTextByComponent} />
					</div>
				</div>
				{partnersProducts && partnersProducts.length > 0 && (
					<PartnersProductsList locale={locale} products={partnersProducts} />
				)}
			</div>
			{popularProducts && popularProducts.length > 0 && (
				<PopularProductsList locale={locale} products={popularProducts} />
			)}
		</BaseSection>
	)
}
export default OtherInformation
