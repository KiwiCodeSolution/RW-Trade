import BabyAndLogo from '@/components/userUI/BabyAndLogo'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Title from '@/components/userUI/baseComponents/Title'

import { getTranslations } from 'next-intl/server'

export default async function PaymentAndDelivery() {
	const t = await getTranslations('PaymentAndDeliveryPage')

	const deliveryMethods = [
		{
			title: t('delivery.novaPoshta.title'),
			description: t('delivery.novaPoshta.desc')
		},
		{
			title: t('delivery.ukrPoshta.title'),
			description: t('delivery.ukrPoshta.desc')
		},
		{
			title: t('delivery.pickup.title'),
			description: t('delivery.pickup.desc')
		},
		{
			title: t('delivery.meest.title'),
			description: t('delivery.meest.desc')
		}
	]

	const paymentMethods = [
		{
			title: t('payment.cashOnDelivery.title'),
			description: t('payment.cashOnDelivery.desc')
		},
		{
			title: t('payment.privatBank.title'),
			description: t('payment.privatBank.desc')
		},
		{
			title: t('payment.cash.title'),
			description: t('payment.cash.desc')
		},
		{
			title: t('payment.nonCash.title'),
			description: t('payment.nonCash.desc')
		},
		{
			title: t('payment.card.title'),
			description: t('payment.card.desc')
		}
	]

	return (
		<main className='min-h-[80vh]'>
			<div className='header-shadow' />
			<BaseSection>
				<Title tag='h1' isPageTitle styles='text-center my-5'>
					{t('title')}
				</Title>

				<div className='grid grid-cols-2 py-4 gap-10 sm:gap-24'>
					<div>
						<h2 className='text-2xl font-semibold mb-6'>{t('delivery.title')}</h2>
						<ul className='list-disc ml-5 mb-10 space-y-7'>
							{deliveryMethods.map((d, idx) => (
								<li key={idx}>
									<span className='font-semibold'>{d.title}</span>
									<p>{d.description}</p>
								</li>
							))}
						</ul>

						<h2 className='text-2xl font-semibold mb-6'>{t('payment.title')}</h2>
						<ul className='list-disc ml-5 space-y-7'>
							{paymentMethods.map((p, idx) => (
								<li key={idx}>
									<span className='font-semibold'>{p.title}</span>
									<p>{p.description}</p>
								</li>
							))}
						</ul>
					</div>

					<BabyAndLogo styles='mt-[45px]' />
				</div>
			</BaseSection>
		</main>
	)
}
