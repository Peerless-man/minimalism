'use client'

import { useEffect } from 'react'
import { useDark } from '../hooks/use-dark'
import { useTheme } from '../hooks/use-theme'

export default function LoadingPage() {
	const { isDark } = useDark()
	const { setDarkTheme } = useTheme()

	useEffect(() => {
		isDark && setDarkTheme()
	}, [])

	return (
		<main className="flex h-full w-full justify-center items-center text-slate-900 dark:text-white">
			<h1 className="text-lg font-bold">Loading...</h1>
		</main>
	)
}
