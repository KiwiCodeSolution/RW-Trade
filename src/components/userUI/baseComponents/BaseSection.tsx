type BaseSectionProps = {
	className?: string
	children: React.ReactNode
}

const BaseSection = ({ className, children }: BaseSectionProps) => {
	const classNamProps = className || ''

	return (
		<section
			className={`${classNamProps} w-full mx-auto xl:max-w-[1980px] px-4 xl:px-8 2xl:overflow-hidden`}
		>
			{children}
		</section>
	)
}
export default BaseSection
