import { useDark } from './use-dark'

type theme = {
	setDarkTheme: () => void
	setLightTheme: () => void
}

export const useTheme = (): theme => {
	const { onSetDark, onSetLight } = useDark()

	const setDarkTheme = () => {
		document.documentElement.classList.add('dark')
		onSetDark()
	}

	const setLightTheme = () => {
		document.documentElement.classList.remove('dark')
		onSetLight()
	}

	return {
		setDarkTheme,
		setLightTheme,
	}
}
