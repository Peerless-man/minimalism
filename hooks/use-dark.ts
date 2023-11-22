import { create } from 'zustand'
import persistMiddleware from '../middleware/store-persist'

type darkStore = {
	isDark: boolean
	onSetDark: () => void
	onSetLight: () => void
}

export const useDark = create<darkStore>(
	// 持久化useDark
	persistMiddleware(
		(set: any) => ({
			isDark: false,
			onSetDark: () => set({ isDark: true }),
			onSetLight: () => set({ isDark: false }),
		}),
		'next-app-isDark',
	),
)
