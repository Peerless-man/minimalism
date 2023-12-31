import { create } from 'zustand'
import persistMiddleware from '../middleware/store-persist'

interface commonStore {
	storageTheme: string
	onSetStorageTheme: (storageTheme: string) => void
	catalogShow: boolean
	onSetCatalogShow: () => void
	onSetCatalogHide: () => void
	menuShow: boolean
	onSetMenuShow: () => void
	onSetMenuHide: () => void
	activeId: string
	onSetActiveId: (activeId: string) => void
}

// 存放一些公共状态
export const useCommonStore = create<commonStore>(
	// 持久化useDark
	persistMiddleware(
		(set: any) => ({
			// 主题
			storageTheme: 'system',
			onSetStorageTheme: (storageTheme: string) => set({ storageTheme }),
			// 目录是否展示 默认展示
			catalogShow: true,
			onSetCatalogShow: () => set({ catalogShow: true }),
			onSetCatalogHide: () => set({ catalogShow: false }),
			// 菜单是否展示 默认展示
			menuShow: true,
			onSetMenuShow: () => set({ menuShow: true }),
			onSetMenuHide: () => set({ menuShow: false }),
			activeId: '',
			onSetActiveId: (activeId: string) => set({ activeId }),
		}),
		'next-app-commonStore',
	),
)
