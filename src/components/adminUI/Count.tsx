const Count = ({ count }: { count: number }) => {
	return (
		<div className='absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-bg-green text-sm font-medium text-white flex justify-center items-center'>
			{count}
		</div>
	)
}

export default Count
