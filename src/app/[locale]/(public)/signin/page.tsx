import SignInForm from '@/components/userUI/SingInSingUpForm'

export default function SigninPage() {
	return (
		<main className='min-h-[80vh] flex items-center justify-center'>
			<SignInForm pageType='admin' />
		</main>
	)
}
