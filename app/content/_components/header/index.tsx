'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import ToggleTheme from '../../../../components/toggle-theme'

const RenderMenuIconShow = dynamic(() => import('./render-menu-icon'), {
	ssr: false,
})

export default function Header() {
	return (
		<div className="fixed top-0 left-0 h-16 backdrop-blur-sm w-full px-5 py-1 duration-300 text-slate-900 dark:text-white border-b shadow-sm z-50 flex justify-between items-center text-lg">
			<div className="flex items-center">
				<RenderMenuIconShow />
			</div>
			<div className="flex items-center">
				<Link
					href="/"
					className="mr-6 hover:text-violet-500 dark:hover:text-violet-300 duration-300 "
				>
					<span className="text-3xl font-bold">M</span>
				</Link>
				<ToggleTheme />
			</div>
		</div>
	)
}
