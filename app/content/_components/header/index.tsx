'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Listbox, Transition } from '@headlessui/react'

import GitHub from 'components/gthub'
import ToggleTheme from '../../../../components/toggle-theme'
import { HomeIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const RenderMenuIconShow = dynamic(() => import('./render-menu-icon'), {
	ssr: false,
})

export default function Header() {
	return (
		<div className="fixed bg-white dark:bg-slate-900 md:bg-transparent md:dark:bg-transparent top-0 left-0 h-14 backdrop-blur-[1px] w-full px-2 md:px-5 py-1 duration-300 text-black dark:text-slate-400 border-b shadow-sm z-50 flex justify-between items-center text-lg">
			<div className="flex items-center">
				<RenderMenuIconShow />
			</div>
			<div className="flex items-center">
				<Link
					href="/"
					className="text-sm mr-6 pr-6 border-r border-slate-200 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 "
				>
					HOME
				</Link>
				<div className="mr-4">
					<ToggleTheme />
				</div>
				<GitHub />
			</div>
		</div>
	)
}
