'use client'
import dynamic from 'next/dynamic'

import ToggleTheme from '../../../../components/toggle-theme'

const RenderCatalogIcon = dynamic(() => import('./render-catalog'), {
	ssr: false,
})

const RenderMenuIconShow = dynamic(() => import('./render-menu-icon'), {
	ssr: false,
})

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-10 w-full px-5 py-1 duration-300 text-slate-900 dark:text-white bg-slate-50  dark:bg-slate-900 border-b shadow-sm z-50 flex justify-between items-center text-lg ">
			<div className="flex items-center">
				<RenderMenuIconShow />
			</div>
			<div className="flex items-center">
				<RenderCatalogIcon />
				<ToggleTheme />
			</div>
		</div>
	)
}
