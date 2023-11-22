'use client'
import Link from 'next/link'

import {
	Bars3BottomLeftIcon,
	Bars3BottomRightIcon,
	XCircleIcon,
	DocumentTextIcon,
	HomeIcon,
} from '@heroicons/react/20/solid'
import { useCommonStore } from '../../../../hooks/use-common-store'

import ToggleTheme from '../../../../components/toggle-theme'

function renderCatalogIcon({
	logShow,
	setLogShow,
	catalogIconShow,
}: {
	logShow: boolean
	setLogShow: Function
	catalogIconShow: boolean
}) {
	if (!catalogIconShow) return

	return logShow ? (
		<XCircleIcon
			className="mr-1 h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
			aria-hidden="true"
			onClick={() => setLogShow(false)}
		/>
	) : (
		<DocumentTextIcon
			className="mr-1 h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
			aria-hidden="true"
			onClick={() => setLogShow(true)}
		/>
	)
}

export default function Header({
	menuShow,
	setMenuShow,
	logShow,
	setLogShow,
}: {
	menuShow: boolean
	setMenuShow: Function
	logShow: boolean
	setLogShow: Function
}) {
	const { catalogIconShow } = useCommonStore()

	return (
		<div className="fixed top-0 left-0 h-10 w-full px-5 py-1 text-slate-900 dark:text-white bg-slate-50  dark:bg-slate-900 border-b shadow-sm z-50 flex justify-between items-center text-lg ">
			{menuShow ? (
				<Bars3BottomRightIcon
					className="h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setMenuShow(false)}
				/>
			) : (
				<Bars3BottomLeftIcon
					className="h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setMenuShow(true)}
				/>
			)}
			<Link href="/">
				<HomeIcon
					className="h-6 w-6 text-violet-300 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
				/>
			</Link>
			<div className="flex items-center">
				{renderCatalogIcon({ logShow, setLogShow, catalogIconShow })}
				<ToggleTheme />
			</div>
		</div>
	)
}
