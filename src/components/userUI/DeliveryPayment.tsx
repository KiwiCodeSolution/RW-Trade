import { useTranslations } from 'next-intl'
import Image from 'next/image'

const DeliveryPayment = () => {
	const t = useTranslations('DeliveryPayment')

	const deliveryMethods = [
		{
			name: t(`delivery.0`),
			img: '/images/delivery/np.png'
		},
		{
			name: t(`delivery.1`),
			img: '/images/delivery/up.png'
		},
		{
			name: t(`delivery.2`),
			img: '/images/delivery/meest.png'
		}
	]
	return (
		<div className='flex flex-col justify-between gap-y-4 w-[362px] h-[423px] shrink-0 px-2.5'>
			<p className='text-xl font-bold'>{t('title')}</p>

			<div>
				<p className='font-medium leading-[1.1]'>{t('methods_title')}</p>
				<ul>
					{[...Array(4)].map((_, i) => (
						<li key={i} className='leading-[1.15]'>
							{t(`methods.${i}`)}
						</li>
					))}
				</ul>
			</div>

			<div>
				<p className='font-medium leading-[1.1]'>{t('guarantee_title')}</p>
				<ul>
					{[...Array(1)].map((_, i) => (
						<li key={i} className='leading-[1.1]'>
							{t(`guarantee.${i}`)}
						</li>
					))}
				</ul>
			</div>

			<div className='flex flex-col gap-y-3'>
				<p className='font-medium leading-[1.1]'>{t('delivery_title')}</p>
				<div className='flex flex-col gap-y-4'>
					{deliveryMethods.map((d, i) => (
						<div className='flex items-center gap-x-2' key={d.name}>
							<Image src={d.img} alt={d.name} width={24} height={24} />
							<p key={i} className=''>
								{t(`delivery.${i}`)}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
export default DeliveryPayment
