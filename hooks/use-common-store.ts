import { create } from 'zustand'
import persistMiddleware from '../middleware/store-persist'

type commonStore = {
	catalogShow: boolean
	onSetCatalogShow: () => void
	onSetCatalogHide: () => void
	menuShow: boolean
	onSetMenuShow: () => void
	onSetMenuHide: () => void
}

// 存放一些公共状态
export const useCommonStore = create<commonStore>(
	// 持久化useDark
	persistMiddleware(
		(set: any) => ({
			// 目录是否展示 默认展示
			catalogShow: true,
			onSetCatalogShow: () => set({ catalogShow: true }),
			onSetCatalogHide: () => set({ catalogShow: false }),
			// 菜单是否展示 默认展示
			menuShow: true,
			onSetMenuShow: () => set({ menuShow: true }),
			onSetMenuHide: () => set({ menuShow: false }),
		}),
		'next-app-commonStore',
	),
)
