import { create } from 'zustand'
import persistMiddleware from '../middleware/store-persist'

type darkStore = {
	isInit: boolean
	isDark: boolean
	onSetDark: () => void
	onSetLight: () => void
	onSetInit: () => void
}

export const useDark = create<darkStore>(
	// 持久化useDark
	persistMiddleware(
		(set: any) => ({
			isInit: false,
			isDark: false,
			onSetDark: () => set({ isDark: true }),
			onSetLight: () => set({ isDark: false }),
			onSetInit: () => set({ isInit: true }),
		}),
		'next-app-isDark',
	),
)
