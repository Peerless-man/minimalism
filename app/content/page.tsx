'use client'
import { useEffect } from 'react'
import { useCommonStore } from '../../hooks/use-common-store'

export default function ContentPage() {
	const { onSetCatalogIconHide } = useCommonStore()

	useEffect(() => {
		onSetCatalogIconHide()
	}, [])

	return (
		<div className="w-full h-full px-4">
			<span className="text-xl font-bold text-center">
				欢迎来到小张的技术专区
			</span>
		</div>
	)
}
