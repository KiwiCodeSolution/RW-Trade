'use client'

import { ContactsData, getContacts, updateContacts } from '@/api/contacts'

import { useEffect, useState } from 'react'

const fields: { key: keyof ContactsData; label: string; placeholder: string }[] = [
	{ key: 'phone1', label: 'Телефон 1', placeholder: '+380951103580' },
	{ key: 'phone2', label: 'Телефон 2', placeholder: '+380685090549' },
	{ key: 'phone3', label: "Телефон 3 (необов'язково)", placeholder: '+380971234567' },
	{ key: 'facebook', label: 'Facebook (посилання)', placeholder: 'https://facebook.com/...' },
	{ key: 'messenger', label: 'Messenger (посилання)', placeholder: 'https://m.me/...' },
	{ key: 'youtube', label: 'YouTube (посилання)', placeholder: 'https://youtube.com/...' },
	{
		key: 'viber',
		label: 'Viber (посилання або номер)',
		placeholder: 'viber://chat?number=+380...'
	},
	{ key: 'telegram', label: 'Telegram (посилання)', placeholder: 'https://t.me/...' }
]

export default function ContactsSettings() {
	const [form, setForm] = useState<ContactsData>({})
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [saved, setSaved] = useState(false)

	useEffect(() => {
		getContacts()
			.then(setForm)
			.finally(() => setLoading(false))
	}, [])

	const handleChange = (key: keyof ContactsData, value: string) => {
		setForm(prev => ({ ...prev, [key]: value }))
		setSaved(false)
	}

	const handleAddressChange = (lang: 'uk' | 'en', value: string) => {
		setForm(prev => ({
			...prev,
			address: { uk: prev.address?.uk ?? '', en: prev.address?.en ?? '', [lang]: value }
		}))
		setSaved(false)
	}

	const handleSave = async () => {
		setSaving(true)
		try {
			await updateContacts(form)
			setSaved(true)
		} finally {
			setSaving(false)
		}
	}

	if (loading) return <p className='text-sm opacity-60'>Завантаження...</p>

	return (
		<div className='flex flex-col gap-4 max-w-xl'>
			{/* Адреса */}
			<div className='flex flex-col gap-1'>
				<label className='font-semibold text-sm' htmlFor='address-uk'>
					Адреса (УКР)
				</label>
				<input
					type='text'
					id='address-uk'
					className='h-9 border border-gr-2 rounded-lg px-3 outline-none text-sm'
					value={form.address?.uk ?? ''}
					placeholder='вул. Державінська, 38, офіс 215, Харків'
					onChange={e => handleAddressChange('uk', e.target.value)}
				/>
			</div>
			<div className='flex flex-col gap-1'>
				<label className='font-semibold text-sm' htmlFor='address-en'>
					Адреса (ENG)
				</label>
				<input
					type='text'
					id='address-en'
					className='h-9 border border-gr-2 rounded-lg px-3 outline-none text-sm'
					value={form.address?.en ?? ''}
					placeholder='Derzhavinska St., 38, office 215, Kharkiv'
					onChange={e => handleAddressChange('en', e.target.value)}
				/>
			</div>

			{/* Решта полів */}
			{fields.map(({ key, label, placeholder }) => (
				<div key={key} className='flex flex-col gap-1'>
					<label className='font-semibold text-sm' htmlFor={`contact-${key}`}>
						{label}
					</label>
					<input
						type='text'
						id={`contact-${key}`}
						className='h-9 border border-gr-2 rounded-lg px-3 outline-none text-sm'
						value={(form[key] as string) ?? ''}
						placeholder={placeholder}
						onChange={e => handleChange(key, e.target.value)}
					/>
				</div>
			))}

			<button
				onClick={handleSave}
				disabled={saving}
				className='mt-2 px-6 py-2 bg-primary text-white rounded-lg w-fit disabled:opacity-60'
			>
				{saving ? 'Збереження...' : saved ? '✓ Збережено' : 'Зберегти'}
			</button>
		</div>
	)
}
