import { create } from 'zustand'
import persistMiddleware from '../middleware/store-persist'

type commonStore = {
	catalogIconShow: boolean
	onSetCatalogIconShow: () => void
	onSetCatalogIconHide: () => void
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
			// 目录icon是否展示 默认不展示
			catalogIconShow: false,
			onSetCatalogIconShow: () => set({ catalogIconShow: true }),
			onSetCatalogIconHide: () => set({ catalogIconShow: false }),
			// 目录是否展示 默认不展示
			catalogShow: false,
			onSetCatalogShow: () => set({ catalogShow: true }),
			onSetCatalogHide: () => set({ catalogShow: false }),
			// 菜单是否展示 默认展示
			menuShow: false,
			onSetMenuShow: () => set({ menuShow: true }),
			onSetMenuHide: () => set({ menuShow: false }),
		}),
		'next-app-commonStore',
	),
)
