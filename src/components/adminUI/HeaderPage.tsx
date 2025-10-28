const HeaderPage = ({ pageName }: { pageName: string }) => {
	return (
		<>
			<h1 className='text-center text-2xl font-bold mb-3'>{pageName}</h1>
			<div className='h-0.5 w-full bg-primary' />
		</>
	)
}

export default HeaderPage
