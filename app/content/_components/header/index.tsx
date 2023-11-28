'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/20/solid'

import ToggleTheme from '../../../../components/toggle-theme'

const RenderCatalogIcon = dynamic(() => import('./render-catalog'), {
	ssr: false,
})

const RenderMenuIconShow = dynamic(() => import('./render-menu-icon'), {
	ssr: false,
})

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-16 w-full px-5 py-1 duration-300 text-slate-900 dark:text-white bg-slate-50  dark:bg-slate-900 border-b shadow-sm z-50 flex justify-between items-center text-lg ">
			<div className="flex items-center">
				<Link href="/" className="mr-2">
					<HomeIcon
						className="h-8 w-8 hover:text-violet-500 dark:hover:text-violet-300 duration-300"
						aria-hidden="true"
					/>
				</Link>
				<RenderMenuIconShow />
			</div>
			<div className="flex items-center">
				<RenderCatalogIcon />
				<ToggleTheme />
			</div>
		</div>
	)
}
