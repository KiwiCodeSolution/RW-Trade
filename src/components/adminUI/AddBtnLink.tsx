import { Add } from '@/assets/icons'

import { Link } from '@/i18n/navigation'

type Props = {
	type: 'button' | 'link'
	href?: string
	fnc?: () => void
	className?: string
	page: 'products' | 'news' | 'promo' | 'slider'
	title: string
}

const AddBtnLink = ({ type, href, fnc, className, page, title }: Props) => {
	const styles = {
		products: 'h-[317px] w-full min-w-[162px] max-w-[162px] rounded-md',
		news: 'h-[132px] w-full rounded-2xl',
		promo: '',
		slider: 'h-[176px] w-[342px] rounded-2xl'
	}
	return (
		<article
			className={`border-2 border-sc-1 flex flex-col gap-y-2 justify-center items-center relative product-card-shadow ${styles[page]} ${className}`}
		>
			{type === 'button' ? (
				<button className='add-btn-link bg-primary' onClick={fnc}>
					<Add />
				</button>
			) : (
				<Link href={href ?? '/manage-panel'} className='add-btn-link bg-primary'>
					<Add />
				</Link>
			)}

			<p className='font-medium text-center'>{title}</p>
		</article>
	)
}
export default AddBtnLink
