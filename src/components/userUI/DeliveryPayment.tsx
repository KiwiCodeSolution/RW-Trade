import Image from 'next/image'

export type DeliveryTextByComponent = {
	title: string
	methods_title: string
	methods: string[]
	guarantee_title: string
	guarantee: string[]
	delivery_title: string
	delivery: string[]
}
const DeliveryPayment = ({
	deliveryTextByComponent
}: {
	deliveryTextByComponent: DeliveryTextByComponent
}) => {
	const deliveryMethods = [
		{
			name: deliveryTextByComponent.delivery[0],
			img: '/images/delivery/np.png'
		},
		{
			name: deliveryTextByComponent.delivery[1],
			img: '/images/delivery/up.png'
		},
		{
			name: deliveryTextByComponent.delivery[2],
			img: '/images/delivery/meest.png'
		}
	]
	return (
		<div className='flex flex-col justify-between gap-y-4 w-[362px] h-[423px] shrink-0 px-2.5'>
			<p className='text-xl font-bold'>{deliveryTextByComponent.title}</p>

			<div>
				<p className='font-medium leading-[1.1]'>{deliveryTextByComponent.methods_title}</p>
				<ul>
					{[...Array(4)].map((_, i) => (
						<li key={i} className='leading-[1.15]'>
							{deliveryTextByComponent.methods[i]}
						</li>
					))}
				</ul>
			</div>

			<div>
				<p className='font-medium leading-[1.1]'>
					{deliveryTextByComponent.guarantee_title}
				</p>
				<ul>
					{[...Array(1)].map((_, i) => (
						<li key={i} className='leading-[1.1]'>
							{deliveryTextByComponent.guarantee[i]}
						</li>
					))}
				</ul>
			</div>

			<div className='flex flex-col gap-y-3'>
				<p className='font-medium leading-[1.1]'>
					{deliveryTextByComponent.delivery_title}
				</p>
				<div className='flex flex-col gap-y-4'>
					{deliveryMethods.map((d, i) => (
						<div className='flex items-center gap-x-2' key={d.name}>
							<Image src={d.img} alt={d.name} width={24} height={24} />
							<p key={i} className=''>
								{deliveryTextByComponent.delivery[i]}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
export default DeliveryPayment
