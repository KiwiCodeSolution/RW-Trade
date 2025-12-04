type BaseSectionProps = {
	className?: string
	children: React.ReactNode
}

const BaseSection = ({ className, children }: BaseSectionProps) => {
	const classNamProps = className || ''

	return (
		<section
			className={`${classNamProps} w-full mx-auto xl:max-w-[1980px] px-8 overflow-hidden`}
		>
			{children}
		</section>
	)
}
export default BaseSection
