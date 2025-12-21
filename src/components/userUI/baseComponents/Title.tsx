import React from 'react'

interface TitleProps {
	tag?: 'h1' | 'h2' | 'h3'
	isPageTitle?: boolean
	styles?: string
	children: React.ReactNode
}

const Title = ({ tag = 'h3', isPageTitle = false, styles = '', children }: TitleProps) => {
	const baseTag = isPageTitle ? 'h1' : tag
	const baseStyles = 'text-2xl leading-normal font-bold xl:leading-[48px] ' + styles

	switch (baseTag) {
		case 'h1':
			return <h1 className={`xl:text-[40px] ${baseStyles}`}>{children}</h1>
		case 'h2':
			return <h2 className={`xl:text-[40px] xl:font-semibold ${baseStyles}`}>{children}</h2>
		case 'h3':
		default:
			return <h3 className={`xl:text-[22px] ${baseStyles}`}>{children}</h3>
	}
}

export default Title
