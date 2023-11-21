import Link from 'next/link'

import {
	Bars3BottomLeftIcon,
	Bars3BottomRightIcon,
	DocumentIcon,
	DocumentTextIcon,
	HomeIcon,
} from '@heroicons/react/20/solid'

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
	return (
		<div className="fixed top-0 left-0 h-10 w-full px-5 py-1 bg-slate-900 border-b shadow-sm z-50 flex justify-between items-center text-lg text-white">
			{menuShow ? (
				<Bars3BottomRightIcon
					className="h-8 w-8 text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setMenuShow(false)}
				/>
			) : (
				<Bars3BottomLeftIcon
					className="h-8 w-8  text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setMenuShow(true)}
				/>
			)}
			<Link href="/">
				<HomeIcon
					className="h-8 w-8 text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
				/>
			</Link>
			{logShow ? (
				<DocumentIcon
					className="h-8 w-8 text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setLogShow(false)}
				/>
			) : (
				<DocumentTextIcon
					className="h-8 w-8  text-violet-100 hover:text-violet-300 duration-300 ui-open:rotate-180 ui-open:transform"
					aria-hidden="true"
					onClick={() => setLogShow(true)}
				/>
			)}
		</div>
	)
}
