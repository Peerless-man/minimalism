import { create } from 'zustand'
import persistMiddleware from '../middleware/store-persist'

type commonStore = {
	catalogIconShow: boolean
	onSetCatalogIconShow: () => void
	onSetCatalogIconHide: () => void
}

// 存放一些公共状态
export const useCommonStore = create<commonStore>(
	// 持久化useDark
	persistMiddleware(
		(set: any) => ({
			catalogIconShow: false,
			onSetCatalogIconShow: () => set({ catalogIconShow: true }),
			onSetCatalogIconHide: () => set({ catalogIconShow: false }),
		}),
		'next-app-commonStore',
	),
)
