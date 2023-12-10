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
				<Listbox>
					<div className="relative w-6 h-6 mr-3">
						<Listbox.Button className="focus:outline-none">
							<RocketLaunchIcon className="focus:outline-none w-6 h-6 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300" />
						</Listbox.Button>
						<Transition
							enter="transition duration-300 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Listbox.Options className="absolute left-1/2 -translate-x-1/2 top-full bg-slate-50 dark:bg-slate-700 rounded-lg shadow-lg">
								<div className="px-5 py-2">
									<Listbox.Option value={1}>
										<Link
											href="/"
											className="block mb-2 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 "
										>
											<HomeIcon className="focus:outline-none w-6 h-6" />
										</Link>
									</Listbox.Option>
									<Listbox.Option value={2}>
										<GitHub />
									</Listbox.Option>
								</div>
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
				<ToggleTheme />
			</div>
		</div>
	)
}
