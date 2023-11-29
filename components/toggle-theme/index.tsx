import { useState, useEffect } from 'react'
import { SunIcon } from '@heroicons/react/20/solid'
import { MoonIcon } from '@heroicons/react/24/outline'

import { useDark } from '../../hooks/use-dark'
import { useTheme } from '../../hooks/use-theme'

export default function ToggleTheme() {
	const { isDark, isInit, onSetInit } = useDark()
	const { setLightTheme, setDarkTheme } = useTheme()
	const [dark, setDark] = useState<boolean>(false)

	useEffect(() => {
		setDark(isDark)
	}, [isDark])

	useEffect(() => {
		// 第一次就按照媒体来 后面就按照自己存储的主题来
		if (!isInit) {
			onSetInit()
			if (
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				setDarkTheme()
			}
		} else {
			if (isDark) {
				setDarkTheme()
			}
		}
	}, [])

	return (
		<>
			{dark ? (
				<SunIcon
					onClick={setLightTheme}
					className="w-5 h-5 text-white dark:hover:text-violet-400 duration-500 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
				/>
			) : (
				<MoonIcon
					onClick={setDarkTheme}
					className="w-5 h-5 hover:text-violet-500  duration-500 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
				/>
			)}
		</>
	)
}
