import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'

import { useDark } from '../../hooks/use-dark'
import { useTheme } from '../../hooks/use-theme'

export default function ToggleTheme() {
	const { isDark } = useDark()
	const { setLightTheme, setDarkTheme } = useTheme()
	const [dark, setDark] = useState<boolean>(false)

	useEffect(() => {
		setDark(isDark)
	}, [isDark])

	useEffect(() => {
		if (isDark) {
			setDarkTheme()
		}
	}, [])

	return (
		<>
			{dark ? (
				<SunIcon
					onClick={setLightTheme}
					className="h-6 w-6  text-white dark:hover:text-violet-400 duration-500 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
				/>
			) : (
				<MoonIcon
					onClick={setDarkTheme}
					className="h-6 w-6 text-violet-300 hover:text-violet-500  duration-500 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
				/>
			)}
		</>
	)
}
