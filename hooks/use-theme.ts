import { useDark } from './use-dark'
import { useTheme as nextUseTheme } from 'next-themes'

type theme = {
	setDarkTheme: () => void
	setLightTheme: () => void
}

export const useTheme = (): theme => {
	const { setTheme } = nextUseTheme()
	const { onSetDark, onSetLight } = useDark()

	const setDarkTheme = () => {
		setTheme('dark')
		onSetDark()
	}

	const setLightTheme = () => {
		setTheme('light')
		onSetLight()
	}

	return {
		setDarkTheme,
		setLightTheme,
	}
}
