import BtnSolid from '../BtnSolid'

const ConfirmAdminComponent = ({
	text,
	fncEscape,
	fncDelete
}: {
	text: string
	fncEscape: () => void
	fncDelete: () => void
}) => {
	return (
		<section className='flex flex-col gap-y-5 items-center justify-center px-4 py-5'>
			<p className='text-2xl font-semibold text-center'>
				Ви впевнені, що хочете видалити {text}?
			</p>
			<p className='text-xl text-center'>
				Елемент та всі дані, що він зберігає, будуть видалені. <br /> Це незворотна дія.
			</p>
			<div className='flex flex-col gap-y-6'>
				<button
					className='bg-sc-5 w-[280px] min-h-[48px] text-xl text-white cursor-pointer flex justify-center items-center p-[2px] rounded-full transition-all duration-300 hover:shadow-lg hover:scale-103 overflow-hidden font-bold disabled:opacity-50 disabled:cursor-not-allowed'
					onClick={fncDelete}
				>
					Видалити
				</button>
				<BtnSolid variant='primary' size='l' action={fncEscape}>
					Відмінити
				</BtnSolid>
			</div>
		</section>
	)
}
export default ConfirmAdminComponent
