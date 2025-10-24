export const PathArrowIcon = ({ color }: { color: string }) => {
	return (
		<svg
			width='18'
			height='9'
			viewBox='0 0 18 9'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M-2.98023e-07 4.57143L16 4.57143M16 4.57143L11.4286 8M16 4.57143L11.4286 1.14286'
				stroke={color}
				strokeWidth='1.5'
			/>
		</svg>
	)
}

export const FavoriteHurt = () => {
	return (
		<svg
			width='32'
			height='32'
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M5.75738 8.42438C5.20023 8.98153 4.75826 9.64297 4.45673 10.3709C4.1552 11.0989 4 11.8791 4 12.667C4 13.455 4.1552 14.2352 4.45673 14.9632C4.75826 15.6911 5.20023 16.3526 5.75738 16.9097L16.0001 27.1524L26.2427 16.9097C27.3679 15.7845 28.0001 14.2584 28.0001 12.667C28.0001 11.0757 27.3679 9.5496 26.2427 8.42438C25.1175 7.29915 23.5914 6.66701 22.0001 6.66701C20.4087 6.66701 18.8826 7.29915 17.7574 8.42438L16.0001 10.1817L14.2427 8.42438C13.6856 7.86722 13.0241 7.42525 12.2962 7.12372C11.5682 6.82219 10.788 6.66699 10.0001 6.66699C9.21211 6.66699 8.43189 6.82219 7.70393 7.12372C6.97598 7.42525 6.31454 7.86722 5.75738 8.42438Z'
				stroke='url(#paint0_linear_429_8489)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_429_8489'
					x1='4'
					y1='16.9097'
					x2='28.0001'
					y2='16.9097'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#E1A755' />
					<stop offset='1' stopColor='#B76B00' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export const FavoriteHurtSolid = () => {
	return (
		<svg
			width='32'
			height='32'
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M5.75738 8.42438C5.20023 8.98153 4.75826 9.64297 4.45673 10.3709C4.1552 11.0989 4 11.8791 4 12.667C4 13.455 4.1552 14.2352 4.45673 14.9632C4.75826 15.6911 5.20023 16.3526 5.75738 16.9097L16.0001 27.1524L26.2427 16.9097C27.3679 15.7845 28.0001 14.2584 28.0001 12.667C28.0001 11.0757 27.3679 9.5496 26.2427 8.42438C25.1175 7.29915 23.5914 6.66701 22.0001 6.66701C20.4087 6.66701 18.8826 7.29915 17.7574 8.42438L16.0001 10.1817L14.2427 8.42438C13.6856 7.86722 13.0241 7.42525 12.2962 7.12372C11.5682 6.82219 10.788 6.66699 10.0001 6.66699C9.21211 6.66699 8.43189 6.82219 7.70393 7.12372C6.97598 7.42525 6.31454 7.86722 5.75738 8.42438Z'
				fill='url(#paint0_linear_429_8491)'
				stroke='url(#paint1_linear_429_8491)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_429_8491'
					x1='4'
					y1='16.9097'
					x2='28.0001'
					y2='16.9097'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#E1A755' />
					<stop offset='1' stopColor='#B76B00' />
				</linearGradient>
				<linearGradient
					id='paint1_linear_429_8491'
					x1='4'
					y1='16.9097'
					x2='28.0001'
					y2='16.9097'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#E1A755' />
					<stop offset='1' stopColor='#B76B00' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export const CartBronze = ({ className }: { className?: string }) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z'
				stroke='url(#paint0_linear_4031_19344)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_4031_19344'
					x1='3'
					y1='12'
					x2='21'
					y2='12'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#E1A755' />
					<stop offset='1' stopColor='#B76B00' />
				</linearGradient>
			</defs>
		</svg>
	)
}

type CartProps = {
	className?: string
	variant?: 'default' | 'white' | 'gradient'
	type?: 'cart' | 'notice'
}

export const Cart = ({ className, variant = 'default', type = 'cart' }: CartProps) => {
	const stroke =
		variant === 'white'
			? 'white'
			: variant === 'gradient'
				? 'url(#cartGradient)'
				: 'currentColor'

	const fill =
		variant === 'white'
			? 'white'
			: variant === 'gradient'
				? 'url(#cartGradient)'
				: 'currentColor'

	return (
		<svg
			width='35'
			height='28'
			viewBox='0 0 35 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M3.16797 5H5.16797L5.56797 7M5.56797 7H21.168L17.168 15H7.16797M5.56797 7L7.16797 15M7.16797 15L4.87497 17.293C4.24497 17.923 4.69097 19 5.58197 19H17.168M17.168 19C16.6375 19 16.1288 19.2107 15.7538 19.5858C15.3787 19.9609 15.168 20.4696 15.168 21C15.168 21.5304 15.3787 22.0391 15.7538 22.4142C16.1288 22.7893 16.6375 23 17.168 23C17.6984 23 18.2071 22.7893 18.5822 22.4142C18.9573 22.0391 19.168 21.5304 19.168 21C19.168 20.4696 18.9573 19.9609 18.5822 19.5858C18.2071 19.2107 17.6984 19 17.168 19ZM9.16797 21C9.16797 21.5304 8.95725 22.0391 8.58218 22.4142C8.20711 22.7893 7.6984 23 7.16797 23C6.63754 23 6.12883 22.7893 5.75376 22.4142C5.37868 22.0391 5.16797 21.5304 5.16797 21C5.16797 20.4696 5.37868 19.9609 5.75376 19.5858C6.12883 19.2107 6.63754 19 7.16797 19C7.6984 19 8.20711 19.2107 8.58218 19.5858C8.95725 19.9609 9.16797 20.4696 9.16797 21Z'
				stroke={stroke}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			{type !== 'notice' && (
				<path
					d='M31.6758 13.373V15.0723H21.9297V13.373H31.6758ZM27.7109 9.22266V19.5742H25.9043V9.22266H27.7109Z'
					fill={fill}
				/>
			)}

			{variant === 'gradient' && (
				<defs>
					<linearGradient
						id='cartGradient'
						x1='3'
						y1='14'
						x2='32'
						y2='14'
						gradientUnits='userSpaceOnUse'
					>
						<stop stopColor='#5DAFB1' />
						<stop offset='1' stopColor='#5E73C9' />
					</linearGradient>
				</defs>
			)}
		</svg>
	)
}

export const Timer = ({
	className,
	color = 'currentColor'
}: {
	className?: string
	color?: string
}) => {
	return (
		<svg
			width='30'
			height='30'
			viewBox='0 0 36 36'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M2 18C2 20.1012 2.41385 22.1817 3.21793 24.1229C4.022 26.0641 5.20055 27.828 6.68629 29.3137C8.17203 30.7994 9.93586 31.978 11.8771 32.7821C13.8183 33.5861 15.8989 34 18 34C20.1012 34 22.1817 33.5861 24.1229 32.7821C26.0641 31.978 27.828 30.7994 29.3137 29.3137C30.7994 27.828 31.978 26.0641 32.7821 24.1229C33.5861 22.1817 34 20.1012 34 18C34 13.7565 32.3143 9.68687 29.3137 6.68629C26.3131 3.68571 22.2435 2 18 2C13.7565 2 9.68687 3.68571 6.68629 6.68629C3.68571 9.68687 2 13.7565 2 18Z'
				stroke={color}
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M18 9.11133V18.0002L23.3333 23.3336'
				stroke={color}
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export const GradientBtn = ({
	className,
	width,
	height
}: {
	className?: string
	width?: number
	height?: number
}) => {
	return (
		<svg
			width={width || 32}
			height={height || 32}
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M8.5 15C7.94772 15 7.5 15.4477 7.5 16C7.5 16.5523 7.94772 17 8.5 17L8.5 15ZM25.2071 16.7071C25.5976 16.3166 25.5976 15.6834 25.2071 15.2929L18.8431 8.92893C18.4526 8.53841 17.8195 8.53841 17.4289 8.92893C17.0384 9.31946 17.0384 9.95262 17.4289 10.3431L23.0858 16L17.4289 21.6569C17.0384 22.0474 17.0384 22.6805 17.4289 23.0711C17.8195 23.4616 18.4526 23.4616 18.8431 23.0711L25.2071 16.7071ZM8.5 17L24.5 17L24.5 15L8.5 15L8.5 17Z'
				fill='url(#paint0_linear_4031_6551)'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_4031_6551'
					x1='8.5'
					y1='16.5'
					x2='24.5'
					y2='16.5'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export const Bell = () => {
	return (
		<svg
			width='16'
			height='20'
			viewBox='0 0 16 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M11.085 2.853C11.2039 2.40837 11.4431 2.00515 11.7764 1.68775C12.1097 1.37035 12.5241 1.15107 12.974 1.05405C13.4239 0.957039 13.8918 0.98605 14.3263 1.13789C14.7608 1.28974 15.1449 1.55852 15.4365 1.91466C15.728 2.2708 15.9156 2.70048 15.9786 3.15638C16.0416 3.61229 15.9776 4.07675 15.7937 4.49862C15.6097 4.92049 15.3128 5.28341 14.9359 5.54743C14.5589 5.81145 14.1163 5.96632 13.657 5.995C13.8846 6.63894 14.0006 7.31702 14 8V14H15C15.55 14 16 14.45 16 15C16 15.55 15.55 16 15 16H11V17C11 17.7956 10.6839 18.5587 10.1213 19.1213C9.55871 19.6839 8.79565 20 8 20C7.20435 20 6.44129 19.6839 5.87868 19.1213C5.31607 18.5587 5 17.7956 5 17V16H1C0.45 16 0 15.55 0 15C0 14.45 0.45 14 1 14H2V8C1.99978 6.58192 2.50184 5.20959 3.41713 4.12645C4.33241 3.0433 5.60175 2.31935 7 2.083V1C7 0.734784 7.10536 0.48043 7.29289 0.292893C7.48043 0.105357 7.73478 0 8 0C8.26522 0 8.51957 0.105357 8.70711 0.292893C8.89464 0.48043 9 0.734784 9 1V2.083C9.73689 2.20758 10.444 2.46872 11.085 2.853ZM8 18C8.26522 18 8.51957 17.8946 8.70711 17.7071C8.89464 17.5196 9 17.2652 9 17V16H7V17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18ZM4 14H12V8C12 6.93913 11.5786 5.92172 10.8284 5.17157C10.0783 4.42143 9.06087 4 8 4C6.93913 4 5.92172 4.42143 5.17157 5.17157C4.42143 5.92172 4 6.93913 4 8V14Z'
				fill='white'
			/>
		</svg>
	)
}

type EnvelopeProps = {
	variant?: 'white' | 'gradient'
}

export const Envelope = ({ variant = 'white' }: EnvelopeProps) => (
	<svg width='22' height='18' viewBox='0 0 22 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M1 9C1 5.229 1 3.343 2.172 2.172C3.344 1.001 5.229 1 9 1H13C16.771 1 18.657 1 19.828 2.172C20.999 3.344 21 5.229 21 9C21 12.771 21 14.657 19.828 15.828C18.656 16.999 16.771 17 13 17H9C5.229 17 3.343 17 2.172 15.828C1.001 14.656 1 12.771 1 9Z'
			stroke={variant === 'white' ? 'white' : 'url(#paint0_linear)'}
			strokeWidth='2'
		/>
		<path
			d='M5 5L7.159 6.8C8.996 8.33 9.914 9.095 11 9.095C12.086 9.095 13.005 8.33 14.841 6.799L17 5'
			stroke={variant === 'white' ? 'white' : 'url(#paint1_linear)'}
			strokeWidth='2'
			strokeLinecap='round'
		/>
		{variant === 'gradient' && (
			<defs>
				<linearGradient
					id='paint0_linear'
					x1='1'
					y1='9'
					x2='21'
					y2='9'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
				<linearGradient
					id='paint1_linear'
					x1='5'
					y1='7.0475'
					x2='17'
					y2='7.0475'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
			</defs>
		)}
	</svg>
)

export const Border = ({ className }: { className?: string }) => {
	return (
		<svg
			preserveAspectRatio='none'
			viewBox='0 0 343 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<rect
				x='1'
				y='1'
				width='341'
				height='38'
				rx='7'
				stroke='url(#paint0_linear_4135_18682)'
				strokeWidth='2'
			/>

			<path
				d='M319 17.1084C319.796 17.1084 320.559 17.4245 321.121 17.9871C321.684 18.5497 322 19.3127 322 20.1084C322 20.904 321.684 21.6671 321.121 22.2297C320.559 22.7923 319.796 23.1084 319 23.1084C318.204 23.1084 317.441 22.7923 316.879 22.2297C316.316 21.6671 316 20.904 316 20.1084C316 19.3127 316.316 18.5497 316.879 17.9871C317.441 17.4245 318.204 17.1084 319 17.1084ZM319 12.6084C324 12.6084 328.27 15.7184 330 20.1084C328.27 24.4984 324 27.6084 319 27.6084C314 27.6084 309.73 24.4984 308 20.1084C309.73 15.7184 314 12.6084 319 12.6084ZM310.18 20.1084C310.988 21.7587 312.243 23.1491 313.802 24.1217C315.362 25.0942 317.162 25.6097 319 25.6097C320.838 25.6097 322.638 25.0942 324.198 24.1217C325.757 23.1491 327.012 21.7587 327.82 20.1084C327.012 18.4581 325.757 17.0677 324.198 16.0951C322.638 15.1226 320.838 14.6071 319 14.6071C317.162 14.6071 315.362 15.1226 313.802 16.0951C312.243 17.0677 310.988 18.4581 310.18 20.1084Z'
				fill='url(#paint1_linear_4135_18682)'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_4135_18682'
					x1='0'
					y1='20'
					x2='343'
					y2='20'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export const Show = () => {
	return (
		<svg
			width='22'
			height='15'
			viewBox='0 0 22 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11 4.5C11.7956 4.5 12.5587 4.81607 13.1213 5.37868C13.6839 5.94129 14 6.70435 14 7.5C14 8.29565 13.6839 9.05871 13.1213 9.62132C12.5587 10.1839 11.7956 10.5 11 10.5C10.2044 10.5 9.44129 10.1839 8.87868 9.62132C8.31607 9.05871 8 8.29565 8 7.5C8 6.70435 8.31607 5.94129 8.87868 5.37868C9.44129 4.81607 10.2044 4.5 11 4.5ZM11 0C16 0 20.27 3.11 22 7.5C20.27 11.89 16 15 11 15C6 15 1.73 11.89 0 7.5C1.73 3.11 6 0 11 0ZM2.18 7.5C2.98825 9.15031 4.24331 10.5407 5.80248 11.5133C7.36165 12.4858 9.1624 13.0013 11 13.0013C12.8376 13.0013 14.6383 12.4858 16.1975 11.5133C17.7567 10.5407 19.0117 9.15031 19.82 7.5C19.0117 5.84969 17.7567 4.45925 16.1975 3.48675C14.6383 2.51424 12.8376 1.99868 11 1.99868C9.1624 1.99868 7.36165 2.51424 5.80248 3.48675C4.24331 4.45925 2.98825 5.84969 2.18 7.5Z'
				fill='url(#paint0_linear_4540_6908)'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_4540_6908'
					x1='0'
					y1='7.5'
					x2='22'
					y2='7.5'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export const Hide = () => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8.58555 8.58691C8.21054 8.96206 7.99991 9.47082 8 10.0013C8.00009 10.5317 8.2109 11.0404 8.58605 11.4154C8.9612 11.7904 9.46996 12.0011 10.0004 12.001C10.5309 12.0009 11.0395 11.7901 11.4146 11.4149'
				stroke='url(#paint0_linear_4540_6985)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M14.681 14.673C13.2786 15.5515 11.6548 16.0119 10 16C6.4 16 3.4 14 1 10C2.272 7.88 3.712 6.322 5.32 5.326M8.18 4.18C8.77898 4.05836 9.3888 3.99804 10 4C13.6 4 16.6 6 19 10C18.3333 11.11 17.6207 12.0667 16.862 12.87M1 1L19 19'
				stroke='url(#paint1_linear_4540_6985)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_4540_6985'
					x1='8'
					y1='10.2939'
					x2='11.4146'
					y2='10.2939'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
				<linearGradient
					id='paint1_linear_4540_6985'
					x1='1'
					y1='10'
					x2='19'
					y2='10'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#5DAFB1' />
					<stop offset='1' stopColor='#5E73C9' />
				</linearGradient>
			</defs>
		</svg>
	)
}
