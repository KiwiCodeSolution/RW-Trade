'use client'

import AddSectionFirst from '@/components/userUI/AddSectionFirst'

import { Banner } from '@/types/baseTypes'

import { bannersStore } from '@/store/BannersStore'

import { useEffect } from 'react'

export default function BannersPageComponent({ banners }: { banners: Banner[] }) {
	useEffect(() => {
		bannersStore.setBanners(banners)
	}, [banners])

	return <AddSectionFirst />
}
