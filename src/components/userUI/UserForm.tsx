'use client'

import BtnSolid from '../commonUI/BtnSolid'

import { useState } from 'react'

const UserForm = () => {
	const lang = 'uk'

	const content = {
		uk: {
			title: 'Заповніть дані',
			item_0: 'Прізвище',
			placeholder_0: 'Введіть своє прізвище',
			item_1: "Ім'я",
			placeholder_1: "Введіть своє ім'я",
			item_2: 'Ел. пошта',
			placeholder_2: 'Введіть свою пошту',
			item_3: 'Повідомлення',
			placeholder_3: 'Напишіть повідомлення тут',
			btnText: 'Надіслати'
		},
		en: {
			title: 'Fill in the details',
			item_0: 'Surname',
			placeholder_0: 'Enter your surname',
			item_1: 'Name',
			placeholder_1: 'Enter your name',
			item_2: 'Email',
			placeholder_2: 'Enter your email',
			item_3: 'Message',
			placeholder_3: 'Type your message here',
			btnText: 'Send'
		}
	}

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!!surname) return
		const userMessage = {
			name,
			email,
			message
		}
		console.log(userMessage)
		setName('')
		setEmail('')
		setMessage('')
	}

	return (
		<div>
			<h3 className='text-2xl text-center font-bold'>{content[lang].title}</h3>
			<form onSubmit={handleSubmit} className='py-7 flex flex-col'>
				<label htmlFor='name'>{content[lang].item_1}</label>
				<input
					id='name'
					className='h-9 bg-white rounded-md mb-7 outline-0 text-txt-dark px-2'
					value={name}
					placeholder={content[lang].placeholder_1}
					onChange={e => setName(e.target.value)}
				/>
				<label htmlFor='surname' className='hidden'>
					{content[lang].item_0}
				</label>
				<input
					id='surname'
					className='hidden'
					value={surname}
					placeholder={content[lang].placeholder_0}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSurname(e.target.value)
					}
				/>
				<label htmlFor='email'>{content[lang].item_2}</label>
				<input
					id='email'
					className='h-9 bg-white rounded-md mb-7 outline-0 text-txt-dark px-2'
					value={email}
					placeholder={content[lang].placeholder_2}
					type='email'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				/>
				<label htmlFor='message'>{content[lang].item_3}</label>
				<input
					id='message'
					className='h-9 bg-white rounded-md mb-7 outline-0 text-txt-dark px-2'
					value={message}
					placeholder={content[lang].placeholder_3}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setMessage(e.target.value)
					}
				/>
				<div className='flex justify-center'>
					<BtnSolid variant='bronze' btnType='submit'>
						{content[lang].btnText}
					</BtnSolid>
				</div>
			</form>
		</div>
	)
}

export default UserForm
