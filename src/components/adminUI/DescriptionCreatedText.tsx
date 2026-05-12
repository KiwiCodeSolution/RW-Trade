const DescriptionCreatedText = ({ texts }: { texts: string[] }) => {
	return (
		<ul className='max-w-[40%] w-full mt-4'>
			{texts.map((text, index) => (
				<li key={index} className='text-xs text-gr-4 mb-3 last:mb-0'>
					{text}
				</li>
			))}
		</ul>
	)
}
export default DescriptionCreatedText
