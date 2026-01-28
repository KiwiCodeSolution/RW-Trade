'use client'

import { Locale, PromoBanner } from '@/types/baseTypes'

import { promoBannerStore } from '@/store/PromoBannerStore'

import AddSectionSecond from './AddSectionSecond'

import { useEffect } from 'react'

const AddSectionSecondClient = ({ banner, locale }: { banner: PromoBanner; locale: Locale }) => {
	useEffect(() => {
		promoBannerStore.setBanner(banner)
	}, [banner])

	return <AddSectionSecond locale={locale} />
}

export default AddSectionSecondClient
